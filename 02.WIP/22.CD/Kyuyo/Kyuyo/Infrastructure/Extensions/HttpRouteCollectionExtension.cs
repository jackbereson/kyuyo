using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Web;
using System.Web.Http;
using System.Web.Http.Routing;

namespace Kyuyo.Infrastructure.Extensions
{

    public static class HttpRouteCollectionExtension
    {
        public static IHttpRoute MapStringResource(this HttpRouteCollection self, string name, string rootName, Func<string, CultureInfo, string, string> javaScriptFormatter, params StringResourceInfo[] resources)
        {
            return self.MapHttpRoute(name,
                string.Format("{0}/{{{1}}}", rootName, ResourceMassageConstants.UriParameterResourcePartName),
                null,
                null,
                new StringResourceMessageHandler(resources)
                {
                    JavaScriptFormatter = javaScriptFormatter
                });
        }

        public static IEnumerable<DictionaryEntry> AsEnumerable(this ResourceSet self)
        {
            var dic = self.GetEnumerator();
            while (dic.MoveNext())
            {
                yield return dic.Entry;
            }
            yield break;
        }
    }
}