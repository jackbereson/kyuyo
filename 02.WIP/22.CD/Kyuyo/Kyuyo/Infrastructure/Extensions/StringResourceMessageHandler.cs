using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Resources;
using System.Threading.Tasks;
using System.Web;

namespace Kyuyo.Infrastructure.Extensions
{
    
    public class StringResourceMessageHandler : HttpMessageHandler
    {
        private StringResourceInfo[] resources;

        public Func<string, CultureInfo, string, string> JavaScriptFormatter { get; set; }

        public StringResourceMessageHandler(params StringResourceInfo[] resources)
        {
            this.resources = resources;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            var result = new Task<HttpResponseMessage>(() => this.CreateResponse(request));
            result.Start();
            return result;
        }

        internal HttpResponseMessage CreateResponse(HttpRequestMessage request)
        {
            var resourceName = request.GetRouteData().Values[ResourceMassageConstants.UriParameterResourcePartName] as string;
            var paramCulture = request.GetQueryNameValuePairs().Where(kv => kv.Key == ResourceMassageConstants.CultureParameterName).Select(kv => kv.Value).FirstOrDefault();


            foreach (var info in this.resources)
            {

                if (!string.IsNullOrEmpty(paramCulture))
                {
                    var targetCulture = new CultureInfo(paramCulture);
                    var rs = info.GetResourceSet(resourceName, targetCulture, true);
                    if (rs != null)
                    {
                        return this.CreateResponseFromResourceSet(request, rs, resourceName, targetCulture);
                    }
                }

                foreach (var cultureString in request.Headers.AcceptLanguage)
                {
                    var targetCulture = new CultureInfo(cultureString.Value);
                    var rs = info.GetResourceSet(resourceName, targetCulture, false);
                    if (rs != null)
                    {
                        return this.CreateResponseFromResourceSet(request, rs, resourceName, targetCulture);
                    }
                }
            }
            foreach (var info in this.resources)
            {
                var rs = info.GetResourceSet(resourceName, CultureInfo.InvariantCulture, true);
                if (rs != null)
                {
                    return this.CreateResponseFromResourceSet(request, rs, resourceName, CultureInfo.InvariantCulture);
                }
            }

            return request.CreateErrorResponse(HttpStatusCode.NotFound, "Not found."); 
        }

        private HttpResponseMessage CreateResponseFromResourceSet(HttpRequestMessage request, ResourceSet rs, string resourceName, CultureInfo culture)
        {

            var mediaTypes = request.Headers.Accept.Select(v => v.MediaType);
            var builder = StringResourceMimeMap.Map(mediaTypes);
            if (builder != null)
            {
                var response = request.CreateResponse(HttpStatusCode.OK);
                var stream = builder.Build(rs, request.GetQueryNameValuePairs(), resourceName, culture, this);
                response.Content = new StreamContent(stream);
                response.Content.Headers.ContentType = new MediaTypeHeaderValue(builder.Mime);
                return response;

            }
            return request.CreateErrorResponse(HttpStatusCode.NotFound, "Not found."); 
        }
    }

    internal static class ResourceMassageConstants
    {
        public const string UriParameterResourcePartName = "resourceName";

        public const string AssemblyResourceExtension = ".resources";

        public const string CultureParameterName = "c";

    }
}