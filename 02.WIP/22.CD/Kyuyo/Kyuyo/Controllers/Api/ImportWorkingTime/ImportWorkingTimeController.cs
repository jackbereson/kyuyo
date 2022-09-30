using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.BL.DTO;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Kyuyo.Infrastructure.Utils.MapTemplate;
using System.IO;
using System.Net.Http.Headers;
using Kyuyo.BL.Resources.ImportWorkingTime;
using Kyuyo.BL.Resources;

namespace Kyuyo.Controllers.Api.ImportWorkingTime
{

    [RoutePrefix("api/ImportWorkingTime")]
    public class ImportWorkingTimeController : ApiControllerBase
    {
        private static readonly ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        [HttpPost]
        [MimeMultipart]
        [Route("{CompanyId}/{Type}/{YearMonth}")]
        [Authenticate(Constant.SCREEN_M015, true)]
        public async Task<HttpResponseMessage> Post(HttpRequestMessage request, [FromUri] ImportWorkingTimeRequest data)
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
                var companyBL = new CompanyBL();
                var employeeBL = new EmployeeBL();
                var workingTimeBL = new WorkingTimeBL();

                if (commonBL.IsClosing(data.CompanyId, DateTimeFormat.ToYearMonth(data.YearMonth)))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, MessagesM015.IsClosing);
                }

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

                if (table.Rows[0].ItemArray.Count() != 20)
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.FormatTemplate);
                }
                if(count < 3 || string.IsNullOrEmpty(table.Rows[2][ImportWorkingTimeTemplate.COMPANY_CD].ToString()))
                {
                    return request.CreateResponse(HttpStatusCode.BadRequest, Messages.FileNoData);
                }

                // create LogFile
                var log = new Logger(Constant.SCREEN_M015);

                var companyCd = companyBL.GetCompanyCd(data.CompanyId);

                // キ. Lấy danh sách nhân viên
                var listEmployee = employeeBL.GetAllByCompanyId(data.CompanyId);

                // ク. Lấy danh sách Trạng thái làm việc
                var listWTType = commonBL.getMSystemList(Constant.ATTENDANCE_WT_TYPE, companyCd);

                // ケ. Lấy danh sách Loại ngày làm việc
                var listWorkingType = commonBL.getMSystemList(Constant.WORKING_TYPE, companyCd);

                // コ. Lấy danh sách nghỉ đặt biệt
                var listSpecialType = commonBL.getMSystemList(Constant.SPECIAL_TYPE, companyCd);

                // サ. Lấy danh sáchca làm việc
                var listShift = commonBL.getMSystemList(Constant.SHIFT, companyCd);

                // シ. Lấy danh sách trạng thái duyệt
                var listStatus = commonBL.getMSystemList(Constant.CONFIRM_STATUS, companyCd);

                var m = 0;
                var listDto = new List<KYWorkingTimeDto>();
                var listEmpNo = new List<string>();

                var rangeSalary = commonBL.GetDateRangeSalary(companyCd, DateTimeFormat.ToDateTime(data.YearMonth) ?? DateTime.MinValue);

                for (int i = 3; i <= count; i++)
                {
                    var row = table.Rows[i - 1];
                    if (string.IsNullOrEmpty(row[ImportWorkingTimeTemplate.COMPANY_CD].ToString()))
                    {
                        break;
                    }

                    var validator = new WorkingTimeDtoValidator(i, listWTType, listWorkingType, listSpecialType, 
                                listShift, listStatus, rangeSalary);

                    var empNoPE = row[ImportWorkingTimeTemplate.EMPLOYEE_NO].ToString();
                    string empNo = null;
                    
                    if (string.IsNullOrEmpty(empNoPE))
                    {
                        log.Write(string.Format(MessagesM015.Required, i, StringsM015.EmployeeNo));
                    }
                    else
                    {
                        var emp = listEmployee.FirstOrDefault(e => e.EmployeeNoPE == empNoPE);
                        if (emp != null)
                        {
                            empNo = emp.EmployeeNo;
                            if (!listEmpNo.Exists(e => e == empNo))
                            {
                                listEmpNo.Add(empNo);
                            }
                        }
                        else
                        {
                            log.Write(string.Format(MessagesM015.NotExist, i, StringsM015.EmployeeNo));
                        }
                    }

                    var dto = new KYWorkingTimeDto()
                    {
                        CompanyCd = companyCd,
                        EmployeeNo = empNo,
                        WorkingDate = row[ImportWorkingTimeTemplate.WORKING_DATE].ToString(),
                        ActInTime = row[ImportWorkingTimeTemplate.ACT_IN_TIME].ToString(),
                        ActOutTime = row[ImportWorkingTimeTemplate.ACT_OUT_TIME].ToString(),
                        WorkingTime = row[ImportWorkingTimeTemplate.WORKING_TIME].ToString(),
                        AbsenceTime = row[ImportWorkingTimeTemplate.ABSENCE_TIME].ToString(),
                        TotalOtTime = row[ImportWorkingTimeTemplate.TOTAL_OT_TIME].ToString(),
                        LateOtTime = row[ImportWorkingTimeTemplate.LATE_OT_TIME].ToString(),
                        TotalLateTime = row[ImportWorkingTimeTemplate.TOTAL_LATE_TIME].ToString(),
                        DeductedUnpaind = row[ImportWorkingTimeTemplate.DEDUCTED_UNPAID].ToString(),
                        DeductedPaid = row[ImportWorkingTimeTemplate.DEDUCTED_PAID].ToString(),
                        AttendanceType = row[ImportWorkingTimeTemplate.ATTENDANCE_TYPE].ToString(),
                        WorkingType = row[ImportWorkingTimeTemplate.WORKING_TYPE].ToString(),
                        SpecialType = row[ImportWorkingTimeTemplate.SPECIAL_TYPE].ToString(),
                        MainShift = row[ImportWorkingTimeTemplate.MAIN_SHIFT].ToString(),
                        StdInTime = row[ImportWorkingTimeTemplate.STD_IN_TIME].ToString(),
                        StdOutTime = row[ImportWorkingTimeTemplate.STD_OUT_TIME].ToString(),
                        StdWorkHour = row[ImportWorkingTimeTemplate.STD_WORK_HOUR].ToString(),
                        Status = row[ImportWorkingTimeTemplate.STATUS].ToString()
                    };

                    var valid = validator.Validate(dto);

                    if (valid.IsValid)
                    {
                        if (!string.IsNullOrEmpty(dto.EmployeeNo))
                        {
                            listDto.Add(dto);
                        }
                    }
                    else
                    {
                        log.Write(valid.Errors.Select(e => e.ErrorMessage).ToList());
                    }
                    m++;
                }
                var filePath = log.Close();

                // Delete data
                workingTimeBL.DeleteWorkingTime(companyCd, listDto.Select(e => e.EmployeeNo).ToList(),
                                                rangeSalary[0], rangeSalary[1], data.Type == 1);

                // Insert new data
                workingTimeBL.Insert(listDto);

                 return request.CreateResponse(HttpStatusCode.OK, new {
                     Message = string.Format(Messages.Import, listDto.Count, m),
                     LogFile = filePath
                 });

            }
            catch (Exception ex)
            {
                logger.Error("Exception", ex);
                return request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



    }
}
