using System.Web.Http;
using Kyuyo.Properties;
using Kyuyo.Infrastructure.Extensions;
using Newtonsoft.Json;
using Kyuyo.BL.Resources;
using Kyuyo.Infrastructure.Core;

namespace Kyuyo
{
    public static class WebApiConfig
    {
        public static string UrlPrefix { get { return "api"; } }
        public static string UrlPrefixRelative { get { return "~/api"; } }

        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            log4net.Config.XmlConfigurator.Configure();

            // Web API configuration and services
            //config.MessageHandlers.Add(new KyuyoAuthHandler());

            config.Routes.MapStringResource(
                name: "ResourceJSON",
                rootName: "resource",
                resources: new StringResourceInfo[]{
                    new StringResourceInfo(Strings.ResourceManager, Settings.Default.DefaultResourceAssembly),
                    new StringResourceInfo(Messages.ResourceManager, Settings.Default.DefaultResourceAssembly),
                },
                javaScriptFormatter: (text, culture, resourceName) =>
                {
                    return string.Format("angular.module('{0}').value('{1}', {2});", Settings.Default.AppName, "$" + resourceName.ToLower(), text);
                }
            );

            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore };
            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new EmptyToNullConverter());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: WebApiConfig.UrlPrefix + "/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }

}
