using Kyuyo.Infrastructure.Utils;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Kyuyo.Infrastructure.Core
{
    public class BaseController : Controller
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public BaseController()
            : base()
        {
        }

        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(BaseController));

        /// <summary>
        /// Called when an unhandled exception occurs in the action.
        /// </summary>
        /// <param name="filterContext">Information about the current request and action.</param>
        protected override void OnException(ExceptionContext filterContext)
        {

            logger.Error(filterContext.Exception);

            if (filterContext.Exception is UnauthorizedAccessException)
            {
                // Manage the Unauthorized Access exceptions
                // by redirecting the user to Home page.
                filterContext.ExceptionHandled = true;
                filterContext.Result = RedirectToAction("Index", "Error", new { id = 3 });
            }

            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                // it was an AJAX request
                Response.StatusCode = 500;
                Response.ContentType = "application/json";
                Response.Write(new JavaScriptSerializer().Serialize(new
                {
                    errorMessage = filterContext.Exception.Message
                }));
                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
            }

            base.OnException(filterContext);
        }

    }
}