using Kyuyo.BL;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Login
{

    [RoutePrefix("api/Login")]
    public class LoginController : ApiControllerBase
    {
        private AuthorityBL authorityBL = new AuthorityBL();
        private CommonBL commonBL = new CommonBL();

        [HttpPost]
        public HttpResponseMessage Login(HttpRequestMessage request, LoginRequest user)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest,
                        ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                              .Select(m => m.ErrorMessage).ToArray());
                }
                else
                {

                    //Authenticate
                    Helper.ClearSessionUserInfo();
                    var userInfo = authorityBL.CheckAuthority(user.UserCode, user.Password);

                    // Login success
                    if (userInfo != null)
                    {
                        Helper.SaveCurrentUserInfo(userInfo);
                        Helper.SaveMenus(commonBL.getMSystemList(Constant.SCREEN_ID));

                        response = request.CreateResponse(HttpStatusCode.OK, userInfo);
                    }
                    else
                    {
                        response = request.CreateResponse(HttpStatusCode.BadRequest, Messages.LoginError);
                    }

                }

                return response;
            });
        }

        [HttpGet]
        [Route("logout")]
        public HttpResponseMessage Logout(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;

                //Clear session
                Helper.ClearSessionUserInfo();

                response = request.CreateResponse(HttpStatusCode.OK);
                return response;
            });
        }

    }
}