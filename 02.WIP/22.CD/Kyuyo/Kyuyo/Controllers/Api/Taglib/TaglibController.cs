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
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Taglib
{
    /// <summary>
    /// TaglibController
    /// </summary>
    /// <seealso cref="Kyuyo.Infrastructure.Core.ApiControllerBase" />
    [RoutePrefix("api/Taglib")]
    [Authenticate]
    public class TaglibController : ApiControllerBase
    {
        /// <summary>
        /// Initializes the specified request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("init")]
        public HttpResponseMessage Init(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                // TODO
                var commonBL = new CommonBL();
                var companys = commonBL.GetAllCompany();
                var response = new
                {
                    ListCompany = companys,
                    ListDept = commonBL.GetAllDeptByCompanyIds(companys.Select(a => a.Id).ToArray()),
                    Validator = ValidatorService.GetValidator(new TaglibValidator())
                };

                return request.CreateResponse(HttpStatusCode.OK, response);

            });
        }

        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request, [FromUri]TaglibRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                        ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                var employeeBL = new EmployeeBL();
                var result = employeeBL.GetEmployeeTaglib(search.CompanyId, search.DeptCd, search.EmployeeNo, search.EmployeeName);

                if (result.Count() == 0)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.DataNotFound });
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.OK, result);
                }

            });
        }

        /// <summary>
        /// Get Employee without Department 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="search"></param>
        /// <returns>HttpResponseMessage</returns>
        [HttpGet]
        [Route("getEmployeeWithOutDepartment")]
        public HttpResponseMessage GetEmployeeWithOutDepartment(HttpRequestMessage request, [FromUri]TaglibRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                var employeeBL = new EmployeeBL();
                var result = employeeBL.GetEmployeeWithOutDepartment(search.CompanyId, search.EmployeeNo, search.EmployeeName);
                if (result.Count() == 0)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.DataNotFound });
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.OK, result);
                }
            });
        }
    }
}
