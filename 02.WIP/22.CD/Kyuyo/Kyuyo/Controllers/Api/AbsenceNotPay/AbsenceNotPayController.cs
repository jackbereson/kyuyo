using Kyuyo.BL;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.AbsenceNotPay;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.AbsenceNotPay
{
    /// <summary>
    /// Class process API for AbsenceNotPay
    /// </summary>
    [RoutePrefix("api/AbsenceNotPay")]
    public class AbsenceNotPayController : ApiControllerBase
    {
        // CommonBL
        private CommonBL commonBL = new CommonBL();
        // LongtermAbsenceBL
        private LongtermAbsenceBL longtermAbsenceBL = new LongtermAbsenceBL();

        /// <summary>
        /// Get AbsenceNotPay
        /// </summary>
        /// <param name="request"></param>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpGet]
        [Authenticate(Constant.SCREEN_M013)]
        public HttpResponseMessage GetAbsenceNotPay(HttpRequestMessage request, [FromUri] AbsenceNotPaySearchRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var lstLongtermAbsences = longtermAbsenceBL.GetLongtermAbsence(search.CompanyCd, search.CompanyId, search.DeptCd, search.EmployeeNo, search.EmployeeName);

                // Check payroll
                var payRollStatus = commonBL.CheckPayrollStatus(search.CompanyId);
                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { ListLongtermAbsences = lstLongtermAbsences, Messages = new string[] { Messages.Payroll } });
                }

                var messages = new List<string>();
                if (lstLongtermAbsences.Count() == 0)
                {
                    messages.Add(Messages.DataNotFound);
                }
                var result = new
                {
                    ListLongtermAbsences = lstLongtermAbsences,
                    Messages = messages.ToArray(),
                    ShowMessage = messages.Count() > 0
                };

                return request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Insert AbsenceNotPay to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="absenceNotPay"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request, AbsenceNotPayRequest absenceNotPay)
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
                    // Check payroll
                    var payRollStatus = commonBL.CheckPayrollStatus(absenceNotPay.CompanyId);
                    if (payRollStatus)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.Payroll } });
                    }

                    // Check the holiday already exists
                    if (longtermAbsenceBL.CheckHolidayExists(DateTimeFormat.ToDateTime(absenceNotPay.FromDt),
                        DateTimeFormat.ToDateTime(absenceNotPay.ToDt)))
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { MessagesM013.ErrorExist } });
                    }
                    longtermAbsenceBL.Insert(absenceNotPay.EmployeeNo, absenceNotPay.AbsenceNo, DateTimeFormat.ToDateTime(absenceNotPay.FromDt),
                        DateTimeFormat.ToDateTime(absenceNotPay.ToDt), DateTimeFormat.ToDateTime(absenceNotPay.StartWorkDt), Helper.EmployeeNo()
                        , null, null);

                    return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataCreated } });
                }
            });
        }

        /// <summary>
        /// Update AbsenceNotPay to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="absenceNotPay"></param>
        /// <returns></returns>
        [HttpPut]
        public HttpResponseMessage Put(HttpRequestMessage request, AbsenceNotPayRequest absenceNotPay)
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
                    // Check payroll
                    var payRollStatus = commonBL.CheckPayrollStatus(absenceNotPay.CompanyId);
                    if (payRollStatus)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.Payroll } });
                    }

                    // Check the holiday already exists
                    if (longtermAbsenceBL.CheckHolidayExists(absenceNotPay.Id, DateTimeFormat.ToDateTime(absenceNotPay.FromDt),
                        DateTimeFormat.ToDateTime(absenceNotPay.ToDt)))
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { MessagesM013.ErrorExist } });
                    }

                    var longtermAbsenceDto = longtermAbsenceBL.GetLongtermAbsenceById(absenceNotPay.Id ?? 0);
                    if (longtermAbsenceDto == null)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorDeleted } });
                    }
                    else if (longtermAbsenceDto.UpdatedDt != absenceNotPay.UpdatedDt)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorExclusive } });
                    }

                    // Check to Register History Data
                    if (commonBL.IsBeforeClosing(absenceNotPay.CompanyId, DateTimeFormat.ToDateTime(absenceNotPay.FromDt).Value))
                    {
                        longtermAbsenceBL.Insert(longtermAbsenceDto.EmployeeNo, longtermAbsenceDto.AbsenceNo, DateTimeFormat.ToDateTime(longtermAbsenceDto.FromDt),
                        DateTimeFormat.ToDateTime(longtermAbsenceDto.ToDt), DateTimeFormat.ToDateTime(longtermAbsenceDto.StartWorkDt), Helper.EmployeeNo()
                        , longtermAbsenceDto.Id, longtermAbsenceBL.GetNumberHistoryNo(longtermAbsenceDto.Id) + 1);
                    }
                    else
                    {
                        if (commonBL.IsBeforeClosing(absenceNotPay.Id ?? 0, DateTimeFormat.ToDateTime(absenceNotPay.StartWorkDt).Value))
                        {
                            longtermAbsenceBL.Insert(longtermAbsenceDto.EmployeeNo, longtermAbsenceDto.AbsenceNo, DateTimeFormat.ToDateTime(longtermAbsenceDto.FromDt),
                        DateTimeFormat.ToDateTime(longtermAbsenceDto.ToDt), DateTimeFormat.ToDateTime(longtermAbsenceDto.StartWorkDt), Helper.EmployeeNo()
                        , longtermAbsenceDto.Id, longtermAbsenceBL.GetNumberHistoryNo(longtermAbsenceDto.Id) + 1);
                        }
                    }

                    longtermAbsenceBL.Update(absenceNotPay.Id ?? 0, absenceNotPay.EmployeeNo, absenceNotPay.AbsenceNo,
                        DateTimeFormat.ToDateTime(absenceNotPay.FromDt), DateTimeFormat.ToDateTime(absenceNotPay.ToDt),
                        DateTimeFormat.ToDateTime(absenceNotPay.StartWorkDt), Helper.EmployeeNo());

                    return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataUpdated } });
                }
            });
        }

        /// <summary>
        /// Delete AbsenceNotPay to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="id"></param>
        /// <param name="updatedDt"></param>
        /// <returns></returns>
        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, [FromUri] int? companyId, [FromUri] int? id, [FromUri] string updatedDt = null)
        {
            // Check payroll
            var payRollStatus = commonBL.CheckPayrollStatus(companyId);
            if (payRollStatus)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.Payroll } });
            }

            var longtermAbsenceDto = longtermAbsenceBL.GetLongtermAbsenceById(id.Value);
            if (longtermAbsenceDto == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorDeleted } });
            }
            else if (longtermAbsenceDto.UpdatedDt != updatedDt)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorExclusive } });
            }

            // Check to Register History Data
            longtermAbsenceBL.Insert(longtermAbsenceDto.EmployeeNo, longtermAbsenceDto.AbsenceNo, DateTimeFormat.ToDateTime(longtermAbsenceDto.FromDt),
                DateTimeFormat.ToDateTime(longtermAbsenceDto.ToDt), DateTimeFormat.ToDateTime(longtermAbsenceDto.StartWorkDt), Helper.EmployeeNo()
                , longtermAbsenceDto.Id, longtermAbsenceBL.GetNumberHistoryNo(longtermAbsenceDto.Id) + 1);

            longtermAbsenceBL.Delete(id.Value, Helper.EmployeeNo());

            return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataDeleted } });
        }
    }
}