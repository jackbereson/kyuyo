using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Salary;
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

namespace Kyuyo.Controllers.Api.Salary
{
    [RoutePrefix("api/Salary")]
    public class SalaryController : ApiControllerBase
    {

        private static readonly ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        /// <summary>
        /// Import Salary
        /// thanhtv
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [HttpPost]
        [MimeMultipart]
        [Route("Import/{CompanyId}/{Type}")]
        [Authenticate(Constant.SCREEN_M012, true)]
        public async Task<HttpResponseMessage> Post(HttpRequestMessage request, [FromUri] SalaryImportRequest data)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                         ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                            .Select(e => e.ErrorMessage).ToArray());
                }

                // initBL
                var commonBL = new CommonBL();
                var employeeBL = new EmployeeBL();
                var salaryBL = new SalaryBL();
                var allowanceBL = new AllowanceBL();

                string root = InitCommon.GetRootPath();
                var provider = new FileUpload(root);

                // Read the form data.
                await Request.Content.ReadAsMultipartAsync(provider);

                string localFileName = provider
                            .FileData.Select(multiPartData => multiPartData.LocalFileName).FirstOrDefault();

                if (!Helper.CheckExtention(localFileName))
                {

                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.FormatExcel);
                }

                var dataset = InitCommon.ReadExcel(localFileName);
                var table = dataset.Tables[0];
                var count = table.Rows.Count;

                if ((data.Type == 0 && table.Rows[0].ItemArray.Count() != 19) || (data.Type == 1 && table.Rows[0].ItemArray.Count() != 12))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.FormatTemplate);
                }
                if (count < 4 || string.IsNullOrEmpty(table.Rows[3][SalaryTemplate.STT].ToString()))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.FileNoData);
                }

                // イ. Lấy danh sách nhân viên
                var listEmployee = employeeBL.GetAllByCompanyId(data.CompanyId.Value);

                // ウ. Lấy danh sách mater lương
                var listSalary = salaryBL.GetAllByCompanyId(data.CompanyId.Value);

                // ⑥. Lấy danh sách công thức tính lương
                var listSalaryFormula = salaryBL.GetSalaryFormula(data.CompanyId.Value);

                // ⑦. Lấy danh sách phụ cấp/trợ cấp
                var listAllowance = allowanceBL.GetAllowanceByCompanyId(data.CompanyId.Value);

                // ④. Lấy danh sách đơn vị tiền tệ
                var listUnit = commonBL.getMSystemList(Constant.FOREIGN_CUR);

                // 
                var listOtType = commonBL.getMSystemList(Constant.OT_TYPE);

                // エ. Lấy ngày kết sổ mới nhất
                var closingDate = commonBL.GetLastClosingDate(data.CompanyId.Value);

                // create LogFile
                var log = new Logger(Constant.SCREEN_M012);

                var listInsert = new List<KYSalaryDto>();
                var listUpdate = new List<KYSalaryDto>();

                var n = 0;
                var m = 0;
                var n1 = 0;
                var n2 = 0;

                for (int i = 4; i <= count; i++)
                {
                    var row = table.Rows[i - 1];
                    if (string.IsNullOrEmpty(row[SalaryTemplate.STT].ToString()))
                    {
                        break;
                    }
                    m++;

                    SalaryImport dataRow = null;
                    KYSalaryDtoValidator validator = null;

                    // Import SalaryMaster
                    if (data.Type == 0)
                    {
                        dataRow = new SalaryImport()
                        {
                            EmployeeNo = row[SalaryTemplate.EMPLOYEE_NO].ToString(),
                            Unit = row[SalaryTemplate.UNIT].ToString(),
                            BasicSalaryOffical = row[SalaryTemplate.BASIC_SALARY_OFFICAL].ToString(),
                            BasicSalaryProbasion = row[SalaryTemplate.BASIC_SALARY_PROBATION].ToString(),
                            SalaryCalSocialInsu = row[SalaryTemplate.SALARY_CAL_SOCIAL_INSU].ToString(),
                            ExchangeRateSocialInsuSal = row[SalaryTemplate.EXCHANGE_RATE_SOCIAL_INSU_SAL].ToString(),
                            SalaryHour = row[SalaryTemplate.SALARY_HOUR].ToString(),
                            BankAccount = row[SalaryTemplate.BANK_ACCOUNT].ToString(),
                            BankName = row[SalaryTemplate.BANK_NAME].ToString(),
                            SalaryUnit = row[SalaryTemplate.SALARY_UNIT].ToString(),
                            ProductSalary = row[SalaryTemplate.PRODUCT_SALARY].ToString(),
                            Allowance = row[SalaryTemplate.ALLOWANCE].ToString(),
                            AllowanceStartDt = row[SalaryTemplate.ALLOWANCE_START_DATE].ToString(),
                            AllowanceEndDt = row[SalaryTemplate.ALLOWANCE_END_DATE].ToString(),
                            FormulaCd = row[SalaryTemplate.FORMULA_CD].ToString(),
                            OtType = row[SalaryTemplate.OT_TYPE].ToString(),
                            EffectiveDt = row[SalaryTemplate.EFFECTIVE_DT].ToString()
                        };
                        validator = new KYSalaryDtoValidator(i, listEmployee, listSalaryFormula, listUnit, listAllowance, listOtType);
                    }

                    // Import new SalaryMaster
                    else if (data.Type == 1)
                    {
                        dataRow = new SalaryImport()
                        {
                            EmployeeNo = row[SalaryNewTemplate.EMPLOYEE_NO].ToString(),
                            Unit = row[SalaryNewTemplate.UNIT].ToString(),
                            SalaryUnit = row[SalaryNewTemplate.SALARY_UNIT].ToString(),
                            BasicSalaryOffical = row[SalaryNewTemplate.BASIC_SALARY_OFFICAL].ToString(),
                            SalaryCalSocialInsu = row[SalaryNewTemplate.SALARY_CAL_SOCIAL_INSU].ToString(),
                            Allowance = row[SalaryNewTemplate.ALLOWANCE].ToString(),
                            AllowanceStartDt = row[SalaryNewTemplate.ALLOWANCE_START_DATE].ToString(),
                            AllowanceEndDt = row[SalaryNewTemplate.ALLOWANCE_END_DATE].ToString(),
                            OtType = row[SalaryNewTemplate.OT_TYPE].ToString(),
                            EffectiveDt = row[SalaryNewTemplate.EFFECTIVE_DT].ToString()
                        };
                        validator = new KYSalaryDtoValidator(i, listEmployee, listUnit, listAllowance, listOtType);
                    }

                    var valid = validator.Validate(dataRow);
                    if (!valid.IsValid)
                    {
                        log.Write(valid.Errors.Select(e => e.ErrorMessage).ToList());
                    }
                    else
                    {
                        var salary = listSalary.FirstOrDefault(a => a.EmployeeNo == dataRow.EmployeeNo && a.EffectiveDt == dataRow.EffectiveDt);

                        // ※3 Edit thành danh sách allowance
                        string allowanceList = null;
                        if (!string.IsNullOrEmpty(dataRow.Allowance))
                        {
                            dataRow.AllowanceEndDt = dataRow.AllowanceEndDt ?? string.Empty;
                            var allowance = dataRow.Allowance.Split(',');
                            var startDt = dataRow.AllowanceStartDt.Split(',');
                            var endDt = dataRow.AllowanceEndDt.Split(',');
                            allowanceList = string.Join("|", allowance.Select((v, k) => v + "-" + startDt[k] + "-" + endDt[k]));
                        }

                        // t/h ton tai du lieu
                        if (salary != null)
                        {
                            var effectiveDt = DateTimeFormat.ToDateTime(salary.EffectiveDt);
                            if ((effectiveDt.Value.Date - closingDate.Date).TotalHours < 0)
                            {
                                // dk dong lich su
                                listInsert.Add(new KYSalaryDto()
                                {
                                    MainId = salary.Id,
                                    EmployeeNo = salary.EmployeeNo,
                                    EmployeeName = salary.EmployeeName,
                                    BasicSalaryOffical = salary.BasicSalaryOffical,
                                    BasicSalaryProbasion = salary.BasicSalaryProbasion,
                                    SalaryHour = salary.SalaryHour,
                                    SalaryCalSocialInsu = salary.SalaryCalSocialInsu,
                                    ExchangeRateSocialInsuSal = salary.ExchangeRateSocialInsuSal,
                                    ProductSalary = salary.ProductSalary,
                                    BankAccount = salary.BankAccount,
                                    BankName = salary.BankName,
                                    SalaryUnit = salary.SalaryUnit,
                                    Unit = salary.Unit,
                                    AllowanceList = salary.AllowanceList,
                                    OtType = salary.OtType,
                                    FormulaCd = salary.FormulaCd,
                                    EffectiveDt = salary.EffectiveDt,
                                    DeleteFlag = salary.DeleteFlag
                                });
                            }

                            // update data
                            salary.BasicSalaryOffical = DecimalFormat.Parse(dataRow.BasicSalaryOffical);
                            salary.SalaryCalSocialInsu = DecimalFormat.Parse(dataRow.SalaryCalSocialInsu);
                            salary.AllowanceList = allowanceList;
                            salary.EffectiveDt = dataRow.EffectiveDt;
                            salary.Unit = dataRow.Unit;

                            // Import SalaryMaster
                            if (data.Type == 0)
                            {
                                salary.BasicSalaryProbasion = DecimalFormat.Parse(dataRow.BasicSalaryProbasion);
                                salary.SalaryHour = DecimalFormat.Parse(dataRow.SalaryHour);
                                salary.ExchangeRateSocialInsuSal = DecimalFormat.Parse(dataRow.ExchangeRateSocialInsuSal);
                                salary.ProductSalary = dataRow.ProductSalary == Constant.FLAG_YES ? true : false;
                                salary.BankAccount = dataRow.BankAccount;
                                salary.BankName = dataRow.BankName;
                                salary.SalaryUnit = dataRow.SalaryUnit;
                                salary.FormulaCd = dataRow.FormulaCd;
                            }

                            n2++;
                            listUpdate.Add(salary);
                        }

                        // insert data
                        else
                        {
                            var newData = new KYSalaryDto()
                            {
                                EmployeeNo = dataRow.EmployeeNo,
                                BasicSalaryOffical = DecimalFormat.Parse(dataRow.BasicSalaryOffical),
                                SalaryCalSocialInsu = DecimalFormat.Parse(dataRow.SalaryCalSocialInsu),
                                AllowanceList = allowanceList,
                                OtType = dataRow.OtType,
                                Unit = dataRow.Unit,
                                EffectiveDt = dataRow.EffectiveDt,
                                DeleteFlag = false
                            };

                            // Import SalaryMaster
                            if (data.Type == 0)
                            {
                                newData.BasicSalaryProbasion = DecimalFormat.Parse(dataRow.BasicSalaryProbasion);
                                newData.SalaryHour = DecimalFormat.Parse(dataRow.SalaryHour);
                                newData.ExchangeRateSocialInsuSal = DecimalFormat.Parse(dataRow.ExchangeRateSocialInsuSal);
                                newData.ProductSalary = dataRow.ProductSalary == Constant.FLAG_YES ? true : false;
                                newData.BankAccount = dataRow.BankAccount;
                                newData.BankName = dataRow.BankName;
                                newData.SalaryUnit = dataRow.SalaryUnit;
                                newData.FormulaCd = dataRow.FormulaCd;
                            }
                            else if (data.Type == 1)
                            {
                                var salaryEff = salaryBL.GetSalaryByEmployeeNo(dataRow.EmployeeNo, DateTimeFormat.ToDateTime(dataRow.EffectiveDt).Value);
                                if(salaryEff == null)
                                {
                                    log.Write(string.Format(MessagesM012.SalaryNotExist, i, row[SalaryNewTemplate.EMPLOYEE_NAME].ToString()));
                                    continue;
                                }
                                else
                                {
                                    newData.BasicSalaryProbasion = salaryEff.BasicSalaryProbasion;
                                    newData.SalaryHour = salaryEff.SalaryHour;
                                    newData.ExchangeRateSocialInsuSal = salaryEff.ExchangeRateSocialInsuSal;
                                    newData.ProductSalary = false;
                                    newData.BankAccount = salaryEff.BankAccount;
                                    newData.BankName = salaryEff.BankName;
                                    newData.SalaryUnit = salaryEff.SalaryUnit;
                                    newData.FormulaCd = salaryEff.FormulaCd;
                                }
                            }

                            n1++;
                            listInsert.Add(newData);
                        }

                        n++;
                    }
                }

                salaryBL.InsertDataImport(listInsert, listUpdate, Helper.EmployeeNo());

                var filePath = log.Close();

                return request.CreateResponse(HttpStatusCode.OK, new
                {
                    Messages = new List<string>() {
                        string.Format(Messages.Import, n, m),
                        string.Format(Messages.ImportInsert, n1),
                        string.Format(Messages.ImportUpdate, n2)
                    },
                    LogFile = filePath
                });

            }
            catch (Exception ex)
            {
                logger.Error("Exception", ex);
                return request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public HttpResponseMessage Get(HttpRequestMessage request, [FromUri] SalaryRequest search)
        {
            return CreateHttpResponse(request, () =>
            {
                var commonBL = new CommonBL();
                //var dependentBL = new DependentBL();

                // 2. Check payroll
                var payRollStatus = commonBL.CheckPayrollStatus(search.CompanyCd);

                // 3. Refresh all combo follow companyCd
                var foreignCur = commonBL.getMSystemList(Constant.FOREIGN_CUR);
                // Get List Allowance And Subsidize
                List<KYAllowanceDto> allowances = new List<KYAllowanceDto>();
                List<KYAllowanceDto> subsidizes = new List<KYAllowanceDto>();
                
                foreach (KYAllowanceDto dto in new AllowanceBL().GetAllowanceByCompanyId(Helper.CompanyId()))
                {
                    if (dto.AllowanceFlg)
                    {
                        allowances.Add(dto);
                    }
                    else
                    {
                        subsidizes.Add(dto);
                    }
                }

                // 4. Get list salary master
                var lstSalary = new SalaryBL().GetSalaryMaster(
                                    search.CompanyId,
                                    search.DeptCd,
                                    search.EmployeeNo,
                                    search.EmployeeName,
                                    DateTimeFormat.ToDateTime(search.EffectDtFrom),
                                    DateTimeFormat.ToDateTime(search.EffectDtTo));
                // edit OTTypeValue, UnitValue

                foreach (KYSalaryDto dto in lstSalary)
                {
                    dto.EmployeeObject = new EmployeeBL().GetByEmployeeNo(dto.EmployeeNo);
                    getAllowancesList(dto, allowances, subsidizes);
                }

                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                        new
                        {
                            LstSalary = lstSalary,
                            ForeignCur = foreignCur,
                            Allowances = allowances,
                            Subsidizes = subsidizes,
                            Messages = new string[] { Messages.Payroll }
                        });
                }
                else
                {
                    return request.CreateResponse(HttpStatusCode.OK,
                        new
                        {
                            LstSalary = lstSalary,
                            ForeignCur = foreignCur,
                            Allowances = allowances,
                            Subsidizes = subsidizes,
                        });
                }

            });
        }
        

        /// <summary>
        /// Puts the specified request.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [HttpPut]
        public HttpResponseMessage Put(HttpRequestMessage request, SalaryRequest data)
        {
            return CreateHttpResponse(request, () =>
            {
                // 2. Check payroll
                var payRollStatus = new CommonBL().CheckPayrollStatus(data.CompanyCd);

                if(payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                       new
                       {
                           Messages = new string[] { Messages.Payroll }
                       });
                } 

                var check = new SalaryValidator().Validate(data);

                List<string> messages = new List<string>();
                foreach (var error in check.Errors)
                {
                    messages.Add(error.ErrorMessage);
                }
                // Check exist data
                if (messages.Count == 0) { 
                    var salaryEff = new SalaryBL().GetSalaryByEmployeeNo(data.EmployeeNo,
                            DateTimeFormat.ToDateTime(data.EffectiveDt).Value);
                    if (salaryEff != null)
                    {
                        messages.Add(MessagesM012.ErrorDataExist);
                    }
                }

                // If error, return and show messages
                if (messages.Count != 0)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        Messages =  messages 
                    });
                }

                new SalaryBL().Insert(convertRequestToDto(data));
          
                return request.CreateResponse(HttpStatusCode.OK, new
                {
                    Messages = Messages.DataCreated
                });
            });
        }

        [HttpPost]
        public HttpResponseMessage Post(HttpRequestMessage request, SalaryRequest data)
        {
            return CreateHttpResponse(request, () =>
            {

                // 2. Check payroll
                var payRollStatus = new CommonBL().CheckPayrollStatus(data.CompanyCd);

                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                       new
                       {
                           Messages = new string[] { Messages.Payroll }
                       });
                }

                var check = new SalaryValidator().Validate(data);

                List<string> messages = new List<string>();
                foreach (var error in check.Errors)
                {
                    messages.Add(error.ErrorMessage);
                }

                // 3. Check exist data
                if (messages.Count == 0)
                {
                    var salaryEff = new SalaryBL().GetSalaryByEmployeeNo(data.EmployeeNo,
                                               DateTimeFormat.ToDateTime(data.EffectiveDt).Value);
                    if (salaryEff != null && !salaryEff.Id.Equals(data.Id))
                    {
                        messages.Add(MessagesM012.ErrorDataExist);
                    }
                    // 4.
                    salaryEff = new SalaryBL().GetAllById(data.Id);
                    if (salaryEff == null)
                    {
                        messages.Add(MessagesM012.ErrorDataWasDelete);
                    }
                    else
                    {
                        if (DateTimeFormat.ToDateTime(salaryEff.UpdatedDt).ToString()
                                    .CompareTo(data.UpdatedDt) != 0)
                        {
                            messages.Add(MessagesM012.ErrorDataWasModify);
                        }
                    }
                }
                   

                if (messages.Count != 0)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        Messages = messages
                    });
                }
                // 5. update data to KY_SALARY_MASTER
                bool isRegHistory = new CommonBL().IsBeforeClosing(data.CompanyId,
                                    DateTimeFormat.ToDateTime(data.EffectiveDt).Value);
              
                if(isRegHistory)
                {
                    // Register History Data
                    KYSalaryDto history =  new SalaryBL().GetAllById(data.Id);
                    history.MainId = history.Id;
                    history.UpdateBy = Helper.EmployeeNo();
                    new SalaryBL().Insert(history);

                }

                // Update current data
                new SalaryBL().Update(convertRequestToDto(data));

                return request.CreateResponse(HttpStatusCode.OK, new
                {
                    Messages = Messages.DataUpdated
                });
              
            });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpDelete]
        public HttpResponseMessage Delete(HttpRequestMessage request, [FromUri] int? id, [FromUri] string updatedDt = null,
                        [FromUri] string companyCd = null, [FromUri] int? companyId = null)
        {
            return CreateHttpResponse(request, () =>
            {

                // 2. Check payroll
                var payRollStatus = new CommonBL().CheckPayrollStatus(companyCd);

                if (payRollStatus)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest,
                       new
                       {
                           Messages = new string[] { Messages.Payroll }
                       });
                }

                // 3. Check exist data
                var salaryEff = new SalaryBL().GetAllById(id.Value);
                if (salaryEff == null)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, new
                    {
                        Messages = MessagesM012.ErrorDataWasDelete
                    });
                }
                else
                {
                    
                    if (DateTimeFormat.ToDateTime(salaryEff.UpdatedDt).ToString()
                            .CompareTo(updatedDt) != 0)
                    {
                        return request.CreateResponse(HttpStatusCode.BadRequest, new
                        {
                            Messages = MessagesM012.ErrorDataWasModify
                        });
                    }
                }

                // 4.update data to KY_SALARY_MASTER
                bool isRegHistory = new CommonBL().IsBeforeClosing(companyId.Value,
                                    DateTimeFormat.ToDateTime(salaryEff.EffectiveDt).Value);
                if (isRegHistory)
                {
                    // Register History Data
                    KYSalaryDto history = new SalaryBL().GetAllById(id.Value);
                    history.MainId = history.Id;
                    history.UpdateBy = Helper.EmployeeNo();
                    new SalaryBL().Insert(history);

                }

                // Update current data
                salaryEff.UpdateBy= Helper.EmployeeNo();
                new SalaryBL().Delete(salaryEff);


                return request.CreateResponse(HttpStatusCode.OK, new string[] { Messages.DataDeleted });
            });
               
        }

        private string getAllowanceAsString(SalaryRequest data)
        {
            string allowance = "";
            for (int i = 0; i < data.Allowance.Count; i++)
            {
                KYAllowanceDto dto = data.Allowance[i];
                if (dto.selected)
                {
                    if(!string.IsNullOrEmpty(allowance))
                    {
                        allowance += "|";
                    }

                    allowance += dto.AllowanceCd + "-" + DateTimeFormat.ToStringDate(DateTimeFormat.ToDateTime(dto.EffectiveFrom));
                    if (!string.IsNullOrEmpty(dto.EffectiveTo))
                    {
                        allowance += "-" + DateTimeFormat.ToStringDate(DateTimeFormat.ToDateTime(dto.EffectiveTo));
                    }
                    
                }

            }

            

            for (int i = 0; i < data.Subsidize.Count; i++)
            {
                KYAllowanceDto dto = data.Subsidize[i];
                if (dto.selected)
                {
                    if (!string.IsNullOrWhiteSpace(allowance))
                    {
                        allowance += "|";
                    }

                    allowance += dto.AllowanceCd + "-" + DateTimeFormat.ToStringDate(DateTimeFormat.ToDateTime(dto.EffectiveFrom));
                    if (!string.IsNullOrEmpty(dto.EffectiveTo))
                    {
                        allowance += "-" + DateTimeFormat.ToStringDate(DateTimeFormat.ToDateTime(dto.EffectiveTo));
                    }

                }

            }

            return allowance;
        }

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        private KYSalaryDto convertRequestToDto(SalaryRequest data)
        {
            var newData = new KYSalaryDto()
            {
                Id = data.Id,
                MainId = null,
                HistoryNo = null,
                EmployeeNo = data.EmployeeNo,
                BasicSalaryOffical = System.Convert.ToDecimal(data.BasicSalary),
                BasicSalaryProbasion = System.Convert.ToDecimal(data.ProbationSalary),
                SalaryHour = System.Convert.ToDecimal(data.PriceHours),
                SalaryCalSocialInsu = System.Convert.ToDecimal(data.InsuranceCalSalary),
                ExchangeRateSocialInsuSal = System.Convert.ToDecimal(data.InsuranceCalSalaryRate),
                ProductSalary = data.ProductSalary,
                BankAccount = data.AccountNo,
                BankName = data.BankName,
                Unit = data.UnitBasicSalary,
                SalaryUnit = data.SalaryUnit,
                AllowanceList = getAllowanceAsString(data),
                OtType = data.OTType,
                FormulaCd = data.SalaryFormular,
                EffectiveDt = data.EffectiveDt,
                DeleteFlag = false,
                UpdateBy = Helper.EmployeeNo()
            };
            return newData;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="allowances"></param>
        /// <param name="subsidizes"></param>
        private void getAllowancesList(KYSalaryDto dto, List<KYAllowanceDto> allowances,
           List<KYAllowanceDto> subsidizes)
        {
            dto.Allowance = new List<KYAllowanceDto>();
            dto.Subsidize = new List<KYAllowanceDto>();
            foreach (KYAllowanceDto tem in allowances)
            {
                dto.Allowance.Add(CopyKYAllowanceDto(new KYAllowanceDto(), tem));
            }

            foreach (KYAllowanceDto tem in subsidizes)
            {
                dto.Subsidize.Add(CopyKYAllowanceDto(new KYAllowanceDto(), tem));
            }
            string str = dto.AllowanceList;
            if (string.IsNullOrEmpty(str))
            {
                return;
            }

            foreach (string subStr in str.Split('|'))
            {
                string[] allowInfo = subStr.Split('-');

                KYAllowanceDto allowDto = dto.Allowance.Find(x => x.AllowanceCd.Contains(allowInfo[0]));

                if (allowDto == null)
                {
                    allowDto = dto.Subsidize.Find(x => x.AllowanceCd.Contains(allowInfo[0]));
                }
                allowDto.selected = true;
                allowDto.EffectiveFrom = allowInfo[1];
                if (allowInfo.Length > 2)
                {
                    allowDto.EffectiveTo = allowInfo[2];
                }


            }

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="des"></param>
        /// <param name="src"></param>
        /// <returns></returns>
        private KYAllowanceDto CopyKYAllowanceDto(KYAllowanceDto des, KYAllowanceDto src)
        {
            des.Id = src.Id;
            des.UpdatedDt = src.UpdatedDt;
            des.CompanyId = src.CompanyId;
            des.AllowanceCd = src.AllowanceCd;
            des.AllowanceName = src.AllowanceName;
            des.GroupCd = src.GroupCd;
            des.Group = src.Group;
            des.ValueOffical = src.ValueOffical;
            des.ValueProb = src.ValueProb;
            des.Unit = src.Unit;
            des.AllowanceFlg = src.AllowanceFlg;
            des.EffectiveDt = src.EffectiveDt;
            des.DeleteFlag = src.DeleteFlag;
            des.EffectiveFrom = src.EffectiveFrom;
            des.EffectiveTo = src.EffectiveTo;
            des.selected = src.selected;

            return des;
        }

    }
}
