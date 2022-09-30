using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.SSO
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Kyuyo.Infrastructure.Core.ApiControllerBase" />
    [RoutePrefix("api/SSO")]
    public class SSOController : ApiControllerBase
    {

        /// <summary>
        /// The logger
        /// </summary>
        private static readonly ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        /// <summary>
        /// The authority bl
        /// </summary>
        private AuthorityBL authorityBL = new AuthorityBL();

        /// <summary>
        /// Changes the passwd.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="sso">The sso.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("ChangePasswd")]
        public HttpResponseMessage ChangePasswd(HttpRequestMessage request,SSORequest sso)
        {
            return CreateHttpResponse(request, () =>
            {


                logger.Debug(sso.Param);

                HttpResponseMessage response = null;

                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest,
                        ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                              .Select(m => m.ErrorMessage).ToArray());
                }
                else
                {
                    var password = Helper.GetSSOSecurity();
                    var decrypt = EncryptionUtils.decrypt(sso.Param, password);

                    logger.Debug(decrypt);

                    string[] split = decrypt.Split('\t');

                    if (split.Length != 6)
                    {
                        throw new ArgumentException("single sign on key is invalid");
                    }
                    string userId = null;
                    string oldPasswd = null;
                    string newPasswd = null;

                    for (var i = 0; i < 6; i++)
                    {
                        if (split[i].ToLower().Equals("userid"))
                        {
                            userId = split[++i];
                        }

                        if (split[i].ToLower().Equals("oldpasswd"))
                        {
                            oldPasswd = split[++i];
                        }

                        if (split[i].ToLower().Equals("newpasswd"))
                        {
                            newPasswd = split[++i];
                        }
                    }

                    //Authenticate
                    if (authorityBL.SSOChangePassword(userId, oldPasswd, newPasswd))
                    {
                        response = request.CreateResponse(HttpStatusCode.OK);
                    }
                    else
                    {
                        response = request.CreateResponse(HttpStatusCode.BadRequest, "Password invalid.");
                    }
                }

                return response;
            });
        }



        /// <summary>
        /// Registers the specified request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="sso">The sso.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("Register")]
        public HttpResponseMessage Register(HttpRequestMessage request, SSORegistRequest sso)
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
                    var password = Helper.GetSSOSecurity();
                    var decrypt1 = EncryptionUtils.decrypt(sso.Param1, password);
                    var decrypt2 = EncryptionUtils.decrypt(sso.Param2, password);

                    logger.Debug("Param1: " + decrypt1);
                    logger.Debug("Param2: " + decrypt2);

                    string[] split1 = decrypt1.Split('\t');
                    string[] split2 = decrypt2.Split('\t');

                    if (split1.Length != 4 || split2.Length != 4)
                    {
                        throw new ArgumentException("single sign on key is invalid");
                    }
                    string auserId = null;
                    string aPasswd = null;

                    string tuserId = null;
                    string tPasswd = null;

                    for (var i = 0; i < 4; i++)
                    {
                        if (split1[i].ToLower().Equals("userid"))
                        {
                            auserId = split1[++i];
                        }

                        if (split1[i].ToLower().Equals("passwd"))
                        {
                            aPasswd = split1[++i];
                        }
                    }

                    for (var i = 0; i < 4; i++)
                    {
                        if (split2[i].ToLower().Equals("userid"))
                        {
                            tuserId = split2[++i];
                        }
                        if (split1[i].ToLower().Equals("passwd"))
                        {
                            tPasswd = split2[++i];
                        }
                    }

                    // TODO

                    ////Authenticate
                    //if (authorityBL.SSOChangePassword(userId, MD5Hash.Get(oldPasswd), MD5Hash.Get(newPasswd)))
                    //{
                    //    response = request.CreateResponse(HttpStatusCode.OK);
                    //}
                    //else
                    //{
                    //    response = request.CreateResponse(HttpStatusCode.BadRequest, "Password invalid.");
                    //}
                }

                return response;
            });
        }

    }
}
