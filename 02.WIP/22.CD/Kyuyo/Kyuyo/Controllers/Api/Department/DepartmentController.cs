using Kyuyo.BL;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Deparment;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.Department
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="Kyuyo.Infrastructure.Core.ApiControllerBase" />
    [RoutePrefix("api/Department")]
    public class DepartmentController : ApiControllerBase
    {
        /// <summary>
        /// The departmentBL
        /// </summary>
        private DepartmentBL departmentBL = new DepartmentBL();
        private CommonBL commonBL = new CommonBL();

        /// <summary>
        /// Gets all department.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{companyCd}")]
        [Authenticate(Constant.SCREEN_M020)]
        public HttpResponseMessage GetAll(HttpRequestMessage request, string companyCd)
        {
            return CreateHttpResponse(request, () =>
            {
                var depts = departmentBL.GetAll(companyCd);
                // Check payroll
                var payRollStatus = commonBL.CheckPayrollStatus(companyCd);
                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { listDept = depts, Messages = new string[] { Messages.Payroll } });
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.OK, depts);
                }

            });
        }

        /// <summary>
        /// Update Depatment
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="dept">The dept.</param>
        /// <returns></returns>
        [HttpPost]
        [Authenticate(Constant.SCREEN_M020, true)]
        public HttpResponseMessage Post(HttpRequestMessage request, DepartmentRequest dept)
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
                    // iv. Check data
                    if(!dept.ActiveFlag || !dept.OldDeptCd.Equals(dept.DeptCd))
                    {
                        if (departmentBL.CheckDeptCdUsed(dept.OldDeptCd))
                        {
                            if (!dept.ActiveFlag)
                            {
                                return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM020.ErrorDeptUsed });
                            }
                            else
                            {
                                return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM020.ErrorDeptChage });
                            }
                        }
                    }

                    // Check unique
                    if(departmentBL.CheckUnique(dept.Id, dept.DeptCd, dept.CompanyCd))
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM020.ErrorUnique });
                    }

                    // Check Exclusive
                    var deptDto = departmentBL.GetById(dept.Id);
                    if(deptDto == null)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorDeleted });
                    }
                    else if(deptDto.UpdatedDt != dept.UpdatedDt)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorExclusive });
                    }
                    else
                    {
                        // Update data
                        departmentBL.Update(dept.Id, dept.DeptCd, dept.CompanyCd, dept.DeptName, dept.ActiveFlag, Helper.EmployeeNo());
                        return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataUpdated });
                    }

                }
                
            });
        }


        /// <summary>
        /// Insert Depatment
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="dept">The dept.</param>
        /// <returns></returns>
        [HttpPut]
        [Authenticate(Constant.SCREEN_M020, true)]
        public HttpResponseMessage Put(HttpRequestMessage request, DepartmentRequest dept)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest,
                                    ModelState.Keys.SelectMany(k => ModelState[k].Errors
                                           .Select(e => e.ErrorMessage).ToArray()));
                }
                else
                {
                    // Check duplicate DepartmentCode.
                    if (departmentBL.CheckUnique(null, dept.DeptCd, dept.CompanyCd))
                    {
                        response = request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM020.ErrorUnique });
                    }
                    else
                    {
                        // Insert data
                        departmentBL.Insert(dept.DeptCd, dept.CompanyCd, dept.DeptName, dept.ActiveFlag, Helper.EmployeeNo());
                        response = request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataCreated });
                    }
                }

                return response;
            });
        }

    }
}
