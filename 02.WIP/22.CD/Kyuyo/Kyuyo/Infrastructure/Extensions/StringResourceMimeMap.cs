using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Resources;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Kyuyo.Infrastructure.Extensions
{
    internal static class StringResourceMimeMap
    {

        private static Dictionary<string, IMediaTypeStringResourceBuilder> map;
        private static IMediaTypeStringResourceBuilder defaultBuilder;

        static StringResourceMimeMap()
        {
            var json = new JsonStringResourceBuilder();
            var js = new JsStringResourceBuilder();

            map = new Dictionary<string, IMediaTypeStringResourceBuilder>();
            map.Add("application/json", json);
            map.Add("text/javascript", js);
            map.Add("application/javascript", js);
            map.Add("text/x-javascript", js);
            map.Add("application/x-javascript", js);
            
            defaultBuilder = js;
        }

        public static IMediaTypeStringResourceBuilder Map(IEnumerable<string> mediaTypes)
        {
            foreach (var mediaType in mediaTypes)
            {
                if (map.ContainsKey(mediaType.ToLowerInvariant()))
                {
                    return map[mediaType.ToLowerInvariant()];
                }
            }
            return defaultBuilder;
        }
    }

    internal interface IMediaTypeStringResourceBuilder
    {

        Stream Build(ResourceSet rs, IEnumerable<KeyValuePair<string, string>> parameters, string resourceName, CultureInfo culture, StringResourceMessageHandler handler);

        string Mime { get; }

    }

    internal abstract class MediaTypeStringResourceBuilder : IMediaTypeStringResourceBuilder
    {
        public Stream Build(ResourceSet rs, IEnumerable<KeyValuePair<string, string>> parameters, string resourceName, CultureInfo culture, StringResourceMessageHandler handler)
        {
            var strings = rs.AsEnumerable()
                .Where(e => e.Key is string && e.Value is string)
                .Select(d => new KeyValuePair<string, string>(d.Key.ToString(), d.Value.ToString()));

            return this.CreateStream(strings, parameters, resourceName, culture, handler);
        }

        protected virtual Stream CreateStream(IEnumerable<KeyValuePair<string, string>> strings,
                                              IEnumerable<KeyValuePair<string, string>> parameters, string resourceName,
                                              CultureInfo culture, StringResourceMessageHandler handler)
        {
            return new MemoryStream(Encoding.UTF8.GetBytes(this.CreateResultString(strings, parameters, resourceName, culture, handler)));
        }

        protected abstract string CreateResultString(IEnumerable<KeyValuePair<string, string>> strings,
                                                     IEnumerable<KeyValuePair<string, string>> parameters, string resourceName,
                                                     CultureInfo culture, StringResourceMessageHandler handler);

        public abstract string Mime
        {
            get;
        }
    }


    internal class JsonStringResourceBuilder : MediaTypeStringResourceBuilder
    {

        protected override string CreateResultString(IEnumerable<KeyValuePair<string, string>> strings,
                                                     IEnumerable<KeyValuePair<string, string>> parameters, string resourceName,
                                                     CultureInfo culture, StringResourceMessageHandler handler)
        {
            return CreateJsonString(strings, parameters, resourceName, culture, handler);
        }

        protected string CreateJsonString(IEnumerable<KeyValuePair<string, string>> strings,
                                          IEnumerable<KeyValuePair<string, string>> parameters,
                                          string resourceName,
                                          CultureInfo culture, StringResourceMessageHandler handler)
        {
            var keyValues = new List<string>();
            foreach (var keyValue in strings)
            {
                keyValues.Add(string.Format("\"{0}\":\"{1}\"", NormalizeToJsString(keyValue.Key), NormalizeToJsString(keyValue.Value)));
            }
            return "{" + String.Join(",", keyValues) + "}";
        }

        private string NormalizeToJsString(string value)
        {
            return Regex.Replace(value, "[\\\\\"']", match =>
            {
                return "\\" + match.Value;
            }).Replace("\r", "\\r").Replace("\n", "\\n");
        }


        public override string Mime
        {
            get { return "application/json"; }
        }
    }

    internal sealed class JsStringResourceBuilder : JsonStringResourceBuilder
    {

        protected override string CreateResultString(IEnumerable<KeyValuePair<string, string>> strings,
                                                     IEnumerable<KeyValuePair<string, string>> parameters, string resourceName,
                                                     CultureInfo culture, StringResourceMessageHandler handler)
        {
            var json = CreateJsonString(strings, parameters, resourceName, culture, handler);
            if (handler.JavaScriptFormatter != null)
            {
                return handler.JavaScriptFormatter(json, culture, resourceName);
            }
            var variableName = "__resource_" + resourceName + "__";
            if (parameters.Any(kv => kv.Key == "vname" && !string.IsNullOrWhiteSpace(kv.Value)))
            {
                variableName = parameters.First(kv => kv.Key == "vname").Value;
            }
            return string.Format(";(function(global){{ global.{0}={1};}})(this);", variableName, json);
        }

        public override string Mime
        {
            get { return "application/javascript"; }
        }
    }
}