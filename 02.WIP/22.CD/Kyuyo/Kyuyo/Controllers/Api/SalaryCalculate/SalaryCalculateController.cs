using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.SalaryCalculate;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.Infrastructure.Utils.MapTemplate;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Kyuyo.Controllers.Api.SalaryCalculate
{
    [RoutePrefix("api/SalaryCalculate")]
    public class SalaryCalculateController : ApiControllerBase
    {
        [HttpGet]
        [Route("exchangeRate")]
        public HttpResponseMessage GetRate(HttpRequestMessage request, [FromUri] SalaryCalculateSearchRequest search, string unit)
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
                    var commonBL = new CommonBL();
                    var companyBL = new CompanyBL();
                    var salaryCalulateBL = new SalaryCalulateBL();

                    var companyCd = companyBL.GetCompanyCd(search.CompanyId);
                    var dateRangeSalary = commonBL.GetDateRangeSalary(companyCd, DateTimeFormat.ToDateTime(search.YearMonth).Value);

                    var rate = salaryCalulateBL.GetExchangeRate(search.CompanyId, dateRangeSalary[1], unit);

                    if (rate == null)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.DataNotFound });

                    }
                    return request.CreateResponse(HttpStatusCode.OK, rate);
                }

            });
        }

        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request, [FromUri] SalaryCalculateSearchRequest search)
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
                    var commonBL = new CommonBL();
                    var companyBL = new CompanyBL();
                    var salaryCalulateBL = new SalaryCalulateBL();

                    var companyCd = companyBL.GetCompanyCd(search.CompanyId);
                    var dateRangeSalary = commonBL.GetDateRangeSalary(companyCd, DateTimeFormat.ToDateTime(search.YearMonth).Value);

                    // accessRole
                    var roles = Helper.GetRoleAccessCompanys(Constant.SCREEN_M017);
                    var listRole = new string[] { };
                    roles.TryGetValue(search.CompanyId, out listRole);

                    // payRoll
                    var payroll = commonBL.CheckPayrollStatus(search.CompanyId);

                    var closingTxt = StringsM017.ClosingTxt;

                    if (listRole.Where(a => a == Constant.ROLE_CALC).FirstOrDefault() != null)
                    {
                        closingTxt = payroll ? StringsM017.Open : StringsM017.Closing;
                    }

                    var response = new SalaryCalulateResponse()
                    {
                        ClosingTxt = closingTxt,
                        StartDt = DateTimeFormat.ToStringDate(dateRangeSalary[0]),
                        ListFormula = salaryCalulateBL.GetSalaryFormula(search.CompanyId, dateRangeSalary[0], dateRangeSalary[1]),
                        ListSalary = salaryCalulateBL.GetAllSalary(search.CompanyId, dateRangeSalary[0], dateRangeSalary[1], DateTimeFormat.ToYearMonth(search.YearMonth)),
                        AppFlag = null,
                        Disable2 = !listRole.ToList().Exists(a => a == Constant.ROLE_CALC) || !payroll,
                        Disable3 = !listRole.ToList().Exists(a => a == Constant.ROLE_CONF),
                        Disable4 = !listRole.ToList().Exists(a => a == Constant.ROLE_CLOS),
                        Disable5 = !listRole.ToList().Exists(a => a == Constant.ROLE_CALC)
                    };

                    if (response.ListSalary.Any(a => a.Id == 0))
                    {
                        response.AppFlag = null;
                    }
                    else if (response.ListSalary.Any(a => a.AppFlag == Constant.APP_FLAG_CALC || string.IsNullOrEmpty(a.AppFlag)))
                    {
                        response.AppFlag = Constant.APP_FLAG_CALC;
                    }
                    else if (response.ListSalary.Any(a => a.AppFlag == Constant.APP_FLAG_REQU))
                    {
                        response.AppFlag = Constant.APP_FLAG_REQU;
                    }
                    else if (response.ListSalary.Any(a => a.AppFlag == Constant.APP_FLAG_APPR))
                    {
                        response.AppFlag = Constant.APP_FLAG_APPR;
                    }
                    else
                    {
                        response.AppFlag = Constant.APP_FLAG_CLOS;
                    }
                    return request.CreateResponse(HttpStatusCode.OK, response);
                }

            });
        }



        /// <summary>
        /// ⑪ [Khi click button "Bắt đầu/Kết thúc tính lương"]
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("closing/{companyId}")]
        public HttpResponseMessage Post(HttpRequestMessage request, int companyId)
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
                    var commonBL = new CommonBL();
                    var companyBL = new CompanyBL();

                    if (commonBL.CheckPayrollStatus(companyId))
                    {
                        companyBL.UpdatePayroll(companyId, Constant.FLAG_NO, Helper.EmployeeNo());
                        return request.CreateResponse(HttpStatusCode.OK, StringsM017.Closing);

                    }
                    else
                    {
                        companyBL.UpdatePayroll(companyId, Constant.FLAG_YES, Helper.EmployeeNo());
                        return request.CreateResponse(HttpStatusCode.OK, StringsM017.Open);

                    }
                }

            });
        }

        /// <summary>
        /// Calculate for a Person Salary
        /// </summary>
        /// <param name="request"></param>
        /// <param name="salaryCalculate"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("calculatePersonSalary")]
        public HttpResponseMessage Post(HttpRequestMessage request, SalaryCalculateInputRequest salaryCalculate)
        {
            return CreateHttpResponse(request, () =>
            {
                var commonBL = new CommonBL();
                var workingTimeBL = new WorkingTimeBL();
                var quantityProductBL = new QuantityProductBL();
                var salaryFormulaBL = new SalaryFormulaBL();

                // Check to close Book
                var isClosing = commonBL.IsClosing(salaryCalculate.CompanyId, salaryCalculate.YearMonth);
                if (isClosing)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.CloseBook } });
                }

                // Check data is locked
                var payRollStatus = commonBL.CheckPayrollStatus(salaryCalculate.CompanyId);
                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.DataIsLocked } });
                }

                // Check Validator Input of SalaryCalculate
                var listCurrencies = commonBL.GetCurrency(Constant.FOREIGN_CUR);
                var validator = new SalaryCalculateInputValidator(listCurrencies);
                DateTime dTimeYearMonth = DateTimeFormat.ToDateTime(salaryCalculate.YearMonth + "01").Value;
                List<DateTime> listDateRangeSalary = commonBL.GetDateRangeSalary(salaryCalculate.CompanyCode, dTimeYearMonth);
                var valid = validator.Validate(salaryCalculate);
                if (!valid.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = valid.Errors.Select(e => e.ErrorMessage).ToList() });
                }

                // Check to import WorkingTime is or not
                var listWorkingTimes = workingTimeBL.GetWorkingTime(salaryCalculate.CompanyCode, listDateRangeSalary[0], listDateRangeSalary[1]);
                if (listWorkingTimes.Count == 0)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { MessagesM017.ErrorImportWorkingTime } });
                }

                // Get DateEnd of Probation

                // Pepare data for Salary Calculate
                // Get common information of Company
                // a. Get information of Output
                QuantityProductDto quantityProductDto = quantityProductBL.GetQuantityProduct(salaryCalculate.CompanyCode, salaryCalculate.YearMonth);
                // b. Get salary formula list of Company
                KYSalaryFormulaDto salaryFormulaDto = salaryFormulaBL.GetSalaryFormula(salaryCalculate.CompanyId, listDateRangeSalary[0], listDateRangeSalary[1]);
                // c. Get code allowances/subsidies list of Policy

                // Get a employee information
                // d. Seting StartDate and EndDate working of Employee in a month
                // e. Get information Deparment dependent
                // f. Get information of Master Salary
                // g. Get salary formula list of Employee
                // h. Anlysis Salary Formula
                // i. Get amount allowances/subsidies of Policy




                return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataCreated } });
            });
        }

        /// <summary>
        /// ⑦ [Khi click button "Yêu cầu xác nhận"]
        /// ⑧ [Khi click button "Xác nhận"]
        /// ⑨ [Khi click button "Hủy xác nhận"]
        /// ⑩ [Khi click button "Kết sổ"]
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        [HttpPost]
        [Route("confirm")]
        public HttpResponseMessage Confirm(HttpRequestMessage request, SalaryCalculateConfirmRequest data)
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
                    var commonBL = new CommonBL();
                    var companyBL = new CompanyBL();
                    var salaryCalulateBL = new SalaryCalulateBL();

                    if (!salaryCalulateBL.CheckExclusive(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), data.UpdatedDts))
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorExclusive });
                    }

                    switch (data.AppFlag)
                    {
                        case Constant.APP_FLAG_CALC:
                            // b. Cập nhật dữ liệu.
                            salaryCalulateBL.UpdateAppFlag(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), Constant.APP_FLAG_CALC, Helper.EmployeeNo());

                            return request.CreateResponse(HttpStatusCode.OK, new
                            {
                                ClosingTxt = StringsM017.ClosingTxt,
                                Message = MessagesM017.Canceled
                            });
                        case Constant.APP_FLAG_REQU:
                            // b. Cập nhật dữ liệu.
                            salaryCalulateBL.UpdateAppFlag(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), Constant.APP_FLAG_REQU, Helper.EmployeeNo());

                            // ウ. Khóa dữ liệu
                            companyBL.UpdatePayroll(data.CompanyId, Constant.FLAG_YES, Helper.EmployeeNo());

                            return request.CreateResponse(HttpStatusCode.OK, new
                            {
                                ClosingTxt = StringsM017.Open,
                                Message = MessagesM017.Requested
                            });

                        case Constant.APP_FLAG_APPR:

                            // b. Cập nhật dữ liệu.
                            salaryCalulateBL.UpdateAppFlag(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), Constant.APP_FLAG_APPR, Helper.EmployeeNo());

                            // ウ.Mở dữ liệu
                            companyBL.UpdatePayroll(data.CompanyId, Constant.FLAG_NO, Helper.EmployeeNo());

                            return request.CreateResponse(HttpStatusCode.OK, new
                            {
                                ClosingTxt = StringsM017.Closing,
                                Message = MessagesM017.Confirmed
                            });

                        case Constant.APP_FLAG_CLOS:

                            // b. Cập nhật dữ liệu.
                            salaryCalulateBL.UpdateAppFlag(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), Constant.APP_FLAG_CLOS, Helper.EmployeeNo());

                            // ウ.Mở dữ liệu
                            companyBL.UpdatePayroll(data.CompanyId, Constant.FLAG_NO, Helper.EmployeeNo());

                            // ウ. Đăng ký ngày kết sổ
                            var companyCd = companyBL.GetCompanyCd(data.CompanyId);
                            var dateRangeSalary = commonBL.GetDateRangeSalary(companyCd, DateTimeFormat.ToDateTime(data.YearMonth).Value);
                            salaryCalulateBL.RegistClosingDate(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), dateRangeSalary[1], Helper.EmployeeNo());

                            // TODO senai maill PE

                            return request.CreateResponse(HttpStatusCode.OK, new
                            {
                                ClosingTxt = StringsM017.Closing,
                                Message = MessagesM017.Closed
                            });

                        default:

                            return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { });
                    }
                }
            });
        }

        /// <summary>
        /// (15) Sự kiện nhấn nút "Cập nhật"
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Update(HttpRequestMessage request, SalaryCalculateRequest data)
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
                    var commonBL = new CommonBL();
                    var companyBL = new CompanyBL();
                    var salaryCalulateBL = new SalaryCalulateBL();

                    if (!salaryCalulateBL.CheckExclusive(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), data.UpdatedDts))
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { Messages.ErrorExclusive });
                    }

                    var companyCd = companyBL.GetCompanyCd(data.CompanyId);
                    var dateRangeSalary = commonBL.GetDateRangeSalary(companyCd, DateTimeFormat.ToDateTime(data.YearMonth).Value);

                    var salaryResult = salaryCalulateBL.GetByEmployeeNo(data.CompanyId, dateRangeSalary[0], dateRangeSalary[1], DateTimeFormat.ToYearMonth(data.YearMonth), data.EmployeeNo);

                    if (salaryResult.Count == 0)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new string[] { MessagesM017.EmployeeNotExist });
                    }
                    else
                    {
                        int index = 0;
                        foreach (var result in salaryResult)
                        {
                            result.EmployeeNo = data.EmployeeNo;

                            if (index == 0)
                            {
                                result.Status = data.Status;
                                result.Other = data.Other;
                                result.OtherUnit = data.OtherUnit;
                                result.OtherRemark = data.OtherRemark;
                                result.Sabbtical100 = data.Sabbtical100;
                                result.Sabbtical300 = data.Sabbtical300;
                            }
                            index++;
                        }

                        salaryCalulateBL.InsertOrUpdate(salaryResult, data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth), Helper.EmployeeNo());

                        return request.CreateResponse(HttpStatusCode.OK, Messages.DataUpdated);
                    }
                }
            });
        }
    }
}