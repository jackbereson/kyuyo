using Kyuyo.BL;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.SpecialInsurance;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.SpecialInsurance;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kyuyo.Controllers.SpecialInsurance
{
    /// <summary>
    /// Class process API for SpecialInsurance
    /// </summary>
    [RoutePrefix("api/SpecialInsurance")]
    [Authenticate(Constant.SCREEN_M006)]
    public class SpecialInsuranceController : ApiControllerBase
    {
        // SpecialInsuranceBL
        private SpecialInsuranceBL specialInsuranceBL = new SpecialInsuranceBL();
        // CommonBL
        private CommonBL commonBL = new CommonBL();

        /// <summary>
        /// Update Depatment
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="specialInsurance">The dept.</param>
        /// <returns></returns>
        [HttpPut]
        [Authenticate(Constant.SCREEN_M006, true)]
        public HttpResponseMessage Put(HttpRequestMessage request, SpecialInsuranceRequest specialInsurance)
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
                    // check exclusive
                        // Update data
                        specialInsuranceBL.Update(specialInsurance.Id ?? 0, specialInsurance.AbsenceNo, specialInsurance.AbsenceDescription, "a002",
                            DateTimeFormat.ToDateTime(specialInsurance.EffectiveDt), specialInsurance.DeleteFlag, Helper.EmployeeNo());
                        return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataUpdated });
                }
            });
        }
        /// <summary>
        /// Get list of SpecialInsurance
        /// </summary>
        /// <param name="request"></param>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpGet]
        public HttpResponseMessage GetSpecialInsurance(HttpRequestMessage request, [FromUri] SpecialInsuranceRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                var lstSpecialInsurancies = specialInsuranceBL.GetSpecialInsurance(search.AbsenceDescription, DateTimeFormat.ToDateTime(search.EffectiveDtFrom), DateTimeFormat.ToDateTime(search.EffectiveDtTo));
                // Check payroll
                //var payRollStatus = commonBL.CheckPayrollStatus(companyCd);
                var messages = new List<string>();
                if (lstSpecialInsurancies.Count == 0)
                {
                    messages.Add(Messages.DataNotFound);
                }
                var result = new
                {
                    ListSpeIn = lstSpecialInsurancies,
                    Messages = messages.ToArray(),
                    ShowMessage = messages.Count() > 0
                };
                return request.CreateResponse(HttpStatusCode.OK, result);
            });
        }
        /// <summary>
        /// Delete SpecialInsurance to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="id"></param>
        /// <param name="updatedDt"></param>
        /// <returns></returns>
        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, [FromUri] int? id, [FromUri] string updatedDt = null)
        {
            var specialInsuranceBL = new SpecialInsuranceBL();
            specialInsuranceBL.Delete(id.Value, Helper.EmployeeNo());
            return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataDeleted });
        }


        /// <summary>
        /// Insert SpecialInsurance
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="insert">The specialInsurance.</param>
        /// <returns></returns>
        [HttpPost]
        [Authenticate(Constant.SCREEN_M006, true)]

        public HttpResponseMessage Post(HttpRequestMessage request, SpecialInsuranceRequest specialInsurance)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var specialInsuranceBL = new SpecialInsuranceBL();
                if (!ModelState.IsValid)
                {
                    response = request.CreateResponse(HttpStatusCode.BadRequest,
                                    ModelState.Keys.SelectMany(k => ModelState[k].Errors
                                           .Select(e => e.ErrorMessage).ToArray()));
                }
                else
                {
                    specialInsuranceBL.Insert(specialInsurance.AbsenceNo, specialInsurance.AbsenceDescription,
                                        "79879", DateTimeFormat.ToDateTime(specialInsurance.EffectiveDt), Helper.EmployeeNo());
                    response = request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataCreated });
                }
                return response;
            });
        }
    }

}