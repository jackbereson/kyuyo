using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Kyuyo.Infrastructure.Core;
using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.BL.Resources;
using System.Threading.Tasks;
using System.Web;
using Kyuyo.Controllers.Api.Employee;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.Infrastructure.Utils.MapTemplate;
using System.Data;
using Kyuyo.BL.DTO;
using System.IO;
using Kyuyo.BL.Resources.Bonus;

namespace Kyuyo.Controllers.Api.Bonus
{
    /// <summary>
    /// Class process API for Bonus
    /// </summary>
    [RoutePrefix("api/Bonus")]
    public class BonusController : ApiControllerBase
    {
        // CommonBL
        private CommonBL commonBL = new CommonBL();
        // OtherPayBL
        private OtherPayBL otherPayBL = new OtherPayBL();
        // EmployeeBL
        private EmployeeBL employeeBL = new EmployeeBL();

        /// <summary>
        /// Get GetBonus
        /// </summary>
        /// <param name="request"></param>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpGet]
        [Authenticate(Constant.SCREEN_M014)]
        public HttpResponseMessage GetBonus(HttpRequestMessage request, [FromUri] BonusSearchRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }
                var lstOtherPays = otherPayBL.GetBonus(search.YearMonth, search.CompanyId, search.PayDesc);
                var messages = new List<string>();

                if (lstOtherPays.Count() == 0)
                {
                    messages.Add(Messages.DataNotFound);
                }
                var result = new
                {
                    ListOtherPays = lstOtherPays,
                    Messages = messages.ToArray(),
                    ShowMessage = messages.Count() > 0
                };

                return request.CreateResponse(HttpStatusCode.OK, result);
            });
        }

        /// <summary>
        /// Import File
        /// </summary>
        /// <returns></returns>
        [Route("import/{CompanyId}/{YearMonth}/{DistributionFlag}/{DistributionMonths}")]
        public async Task<HttpResponseMessage> Post([FromUri] BonusRequest data)
        {
            if (commonBL.IsClosing(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth)))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, Messages.CloseBook);
            }
            string root = InitCommon.GetRootPath();
            var provider = new FileUpload(root);
            await Request.Content.ReadAsMultipartAsync(provider);

            string strFile = provider.FileData[0].LocalFileName;
            string extension = Path.GetExtension(strFile);

            // Check format is Excel(.xls, .xlsx)
            if (string.IsNullOrEmpty(extension) || (!".xls".Equals(extension) && !".xlsx".Equals(extension)))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM014.ErrorFileFormat);
            }
            string fileName = Path.GetFileName(strFile).Split(new char[] { '_' }).First();
            DataSet ds = InitCommon.ReadExcel(strFile);
            DataTable dt = ds.Tables[0];
            BonusTemplate bonusTemplate = new BonusTemplate();
            // Check Column number 
            if (!Constant.NUMBER_COLUMN_BONUS_TEMPLATE.Equals(dt.Columns.Count))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM014.ErrorColumnNumber);
            }
            // Check Row number 
            if (dt.Rows.Count < Constant.NUMBER_ROW_BONUS_TEMPLATE ||
                String.IsNullOrEmpty(dt.Rows[Constant.NUMBER_ROW_BONUS_TEMPLATE - 1][BonusTemplate.NO_INDEX].ToString()))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM014.ErrorRowNumber);
            }
            // Check Cell D5 in Excel file
            string payDesc = dt.Rows[Constant.NUMBER_ROW_BONUS_TEMPLATE - 3][BonusTemplate.PAY_DESC_INDEX].ToString();
            if (String.IsNullOrEmpty(payDesc))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM014.PayDesc);
            }
            if (payDesc.Length > 200)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM014.MaxLengthPayDesc);
            }
            // create LogFile
            var log = new Logger(Constant.SCREEN_M014);
            var listCurrencies = commonBL.GetCurrency(Constant.FOREIGN_CUR);
            int countRows = 0;
            int countInsertedRow = 0;
            for (int i = 7; i <= dt.Rows.Count; i++)
            {
                var row = dt.Rows[i - 1];
                // Check No is blank
                if (String.IsNullOrEmpty(row[BonusTemplate.NO_INDEX].ToString()))
                {
                    continue;
                }
                var employeeNo = row[BonusTemplate.EMPLOYEE_NO_INDEX].ToString();
                if (string.IsNullOrEmpty(employeeNo))
                {
                    log.Write(string.Format(MessagesM014.Required, i, StringsM014.EmployeeNo));
                    continue;
                }
                else
                {
                    var isExist = employeeBL.CheckEmployeeExists(data.CompanyId, employeeNo);
                    if (!isExist)
                    {
                        log.Write(string.Format(MessagesM014.ErrorExist, i, StringsM014.EmployeeNo));
                        continue;
                    }
                }
                var validator = new ImportBonusValidator(i, listCurrencies);
                OtherPayDto otherPayDto = new OtherPayDto();
                otherPayDto.EmployeeNo = row[BonusTemplate.EMPLOYEE_NO_INDEX].ToString();
                otherPayDto.Value = row[BonusTemplate.PAY_DESC_INDEX].ToString().Replace(",", "");
                otherPayDto.Unit = row[BonusTemplate.UNIT_INDEX].ToString();
                otherPayDto.PayType = Constant.FLAG_YES;
                otherPayDto.PayDesc = payDesc;
                otherPayDto.YearMonth = data.YearMonth;
                otherPayDto.DistributionFlag = data.DistributionFlag;
                otherPayDto.DistributionMonths = data.DistributionMonths;
                otherPayDto.UpdatedBy = Helper.EmployeeNo();

                var valid = validator.Validate(otherPayDto);
                if (valid.IsValid)
                {
                    if (!string.IsNullOrEmpty(otherPayDto.EmployeeNo))
                    {
                        new OtherPayBL().Insert(otherPayDto);
                        countInsertedRow++;
                    }
                }
                else
                {
                    log.Write(valid.Errors.Select(e => e.ErrorMessage).ToList());
                }
                countRows++;
            }
            var filePath = log.Close();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = string.Format(MessagesM014.ResultImport, countInsertedRow, countRows),
                LogFile = filePath
            });
        }

        /// <summary>
        /// Insert OtherPay to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="bonus"></param>
        /// <returns></returns>
        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request, BonusRequest bonus)
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
                    // Check to close Book
                    var isClosing = commonBL.IsClosing(bonus.CompanyId, bonus.YearMonth);
                    if (isClosing)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.CloseBook } });
                    }

                    otherPayBL.Insert(bonus.EmployeeNo, bonus.PayType, bonus.PayDesc, Convert.ToDecimal(bonus.Value), bonus.Unit,
                    bonus.YearMonth, bonus.DistributionFlag, Convert.ToDecimal(bonus.DistributionMonths), Helper.EmployeeNo());

                    return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataCreated } });
                }
            });
        }

        /// <summary>
        /// Update OtherPay to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="bonus"></param>
        /// <returns></returns>
        [HttpPut]
        public HttpResponseMessage Put(HttpRequestMessage request, BonusRequest bonus)
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
                    // Check to close Book
                    var isClosing = commonBL.IsClosing(bonus.CompanyId, bonus.YearMonth);
                    if (isClosing)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.CloseBook } });
                    }

                    var otherPayDto = otherPayBL.GetBonusById(bonus.Id ?? 0);
                    if (otherPayDto == null)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorDeleted } });
                    }
                    else if (otherPayDto.UpdatedDt != otherPayDto.UpdatedDt)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorExclusive } });
                    }
                    otherPayBL.Update(bonus.Id ?? 0, bonus.EmployeeNo, bonus.PayDesc,
                        Convert.ToDecimal(bonus.Value), bonus.Unit,
                        bonus.DistributionFlag, Convert.ToDecimal(bonus.DistributionMonths), Helper.EmployeeNo());

                    return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataUpdated } });
                }
            });
        }

        /// <summary>
        /// Delete OtherPay to Database
        /// </summary>
        /// <param name="request"></param>
        /// <param name="id"></param>
        /// <param name="updatedDt"></param>
        /// <returns></returns>
        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, [FromUri] int? companyId, [FromUri] int? id, [FromUri] string updatedDt = null,
            [FromUri] string yearMonth = null)
        {
            // Check to close Book
            var isClosing = commonBL.IsClosing(companyId.Value, yearMonth);
            if (isClosing)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.CloseBook } });
            }

            var otherPayDto = otherPayBL.GetBonusById(id.Value);
            if (otherPayDto == null)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorDeleted } });
            }
            else if (otherPayDto.UpdatedDt != updatedDt)
            {
                return request.CreateResponse(HttpStatusCode.BadRequest, new { Messages = new string[] { Messages.ErrorExclusive } });
            }
            otherPayBL.Delete(id.Value, Helper.EmployeeNo());

            return request.CreateResponse(HttpStatusCode.OK, new { Messages = new string[] { Messages.DataDeleted } });
        }
    }
}
