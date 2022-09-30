using AutoMapper;
using Kyuyo.BL;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Authority;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Authority;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Authority
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Kyuyo.Infrastructure.Core.ApiControllerBase" />
    [RoutePrefix("api/Authority")]
    [Authenticate(Constant.SCREEN_M004, true)]
    public class AuthorityController : ApiControllerBase
    {
        /// <summary>
        /// Insert or Update Access role
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="auth">The authentication.</param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request, AuthorityRequest auth)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                        ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                else
                {
                    var authorityBL = new AuthorityBL();
                    var employee = authorityBL.GetEmployee(auth.Id, auth.EmployeeNo);

                    // check unique
                    if (auth.Id == null && employee != null)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM004.ErrorUnique });
                    }
                    else if (auth.Id != null && employee == null)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM004.ErrorDataDeleted });
                    }
                    else if (auth.Id != null && employee.UpdatedDt != auth.UpdatedDt)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM004.ErrorExclusive });
                    }
                    else
                    {
                        // validate success -> update data
                        authorityBL.InsertOrUpdate(auth.Id, auth.EmployeeNo, auth.ScreenAccess, Helper.EmployeeNo());

                        // response update model in client
                        var response = authorityBL.GetEmployee(auth.Id, auth.EmployeeNo);
                        return request.CreateResponse(HttpStatusCode.Created, response);
                    }
                }

            });
        }

        /// <summary>
        /// Deletes the specified request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="Id">The identifier.</param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{employeeNo}")]
        public HttpResponseMessage Delete(HttpRequestMessage request, string employeeNo)
        {
            return CreateHttpResponse(request, () =>
            {
                var authorityBL = new AuthorityBL();
                authorityBL.Delete(employeeNo);
                return request.CreateResponse(HttpStatusCode.OK);
            });
        }
    }
}
