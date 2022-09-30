using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Kyuyo.Infrastructure.Core
{
    public class AuthenticateMvcAttribute : AuthorizeAttribute
    {
        public AuthenticateMvcAttribute(string ScreenId, bool updateOnly = false) : base()
        {
            if (updateOnly)
            {
                Roles = string.Format("{0}_EDIT", ScreenId);
            }
            else
            {
                Roles = string.Format("{0}_EDIT, {0}_VIEW", ScreenId);
            }
        }

        public AuthenticateMvcAttribute()
            : base()
        {
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            // Returns HTTP 401 by default - see HttpUnauthorizedResult.cs.
            filterContext.Result = new RedirectToRouteResult(
            new RouteValueDictionary
            {
                { "action", "Index" },
                { "controller", "Error" },
                { "id", "2" }
            });
        }
    }
}