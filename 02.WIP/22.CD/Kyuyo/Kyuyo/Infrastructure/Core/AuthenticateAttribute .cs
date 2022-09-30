using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Kyuyo.Infrastructure.Core
{
    public class AuthenticateAttribute : AuthorizeAttribute
    {
        public AuthenticateAttribute() : base() { }

        public AuthenticateAttribute(string ScreenId, bool updateOnly = false) : base()
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

    }
}