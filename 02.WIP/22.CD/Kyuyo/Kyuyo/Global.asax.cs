using Kyuyo.BL;
using Kyuyo.BL.Mappings;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Utils;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.SessionState;

[assembly: log4net.Config.XmlConfigurator(Watch = true)]
namespace Kyuyo
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var config = GlobalConfiguration.Configuration;
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(config);
            AutoMapperConfiguration.Configure();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configuration.EnsureInitialized();
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        /// <summary>
        /// Error when start
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            logger.Error(exception);

            // check 404 Page not found
            if (exception.GetType() == typeof(HttpException))
            {
                HttpException httpEx = (HttpException)exception;
                if (httpEx.GetHttpCode() == 404)
                {
                    return;
                }
            }

            Server.ClearError();
            Response.Redirect("~/Error/Index/3");
        }

        protected void Application_EndRequest()
        {
            if (Context.Response.StatusCode == 404)
            {
                if ((!Request.RawUrl.Contains("style")) && (!Request.RawUrl.Contains("images")))
                {
                    Response.Clear();
                    if (Response.StatusCode == 404)
                    {
                        Response.Redirect("~/Error/Index/1");
                    }
                }
            }
        }

        protected void Application_AcquireRequestState()
        {
            var userInfo = Helper.GetCurrentUserInfo();
            if (userInfo.IsAuthenticate)
            {
                var identity = new GenericIdentity(userInfo.UserId);
                IPrincipal principal = new GenericPrincipal(
                        identity, Helper.GetAccessRoles().ToArray());
                Thread.CurrentPrincipal = principal;
                HttpContext.Current.User = principal;
            }
        }

        protected void Application_PostAuthorizeRequest()
        {
            HttpContext.Current.SetSessionStateBehavior(SessionStateBehavior.Required);
        }
    }
}
