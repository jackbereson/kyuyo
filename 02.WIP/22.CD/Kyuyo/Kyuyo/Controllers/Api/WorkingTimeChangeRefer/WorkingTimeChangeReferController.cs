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
using Kyuyo.BL.Resources.WorkingTimeChangeRefer;
using Excel = Microsoft.Office.Interop.Excel;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Threading;
using System.Diagnostics;

namespace Kyuyo.Controllers.Api.WorkingTimeChangeRefer
{
    /// <summary>
    /// Class process API for WorkingTimeChangeRefer
    /// </summary>
    [RoutePrefix("api/WorkingTimeChangeRefer")]
    public class WorkingTimeChangeReferController : ApiControllerBase
    {
        // CommonBL
        private CommonBL commonBL = new CommonBL();
        // WorkingTimeChangeReferBL
        private WorkingTimeChangeReferBL workingTimeChangeReferBL = new WorkingTimeChangeReferBL();

        string FORMAT_DATE_DDMMYYYY = "ddMMyyyy";

        /// <summary>
        /// Compare File
        /// </summary>
        /// <returns></returns>
        [Route("compare/{YearMonth}/{CompareFile}/{CompanyCode}")]
        public async Task<HttpResponseMessage> Post([FromUri]WorkingTimeChangeReferRequest refer)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest,
                   ModelState.Keys.SelectMany(k => ModelState[k].Errors)
                       .Select(e => e.ErrorMessage).ToArray());
            }

            string root = InitCommon.GetRootPath();
            var provider = new FileUpload(root);
            await Request.Content.ReadAsMultipartAsync(provider);

            string strFile = provider.FileData[0].LocalFileName;
            string extension = Path.GetExtension(strFile);

            // Check format is Excel(.xls, .xlsx)
            if (string.IsNullOrEmpty(extension) || (!".xls".Equals(extension) && !".xlsx".Equals(extension)))
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM018.ErrorCompareFileFormat);
            }

            string fileName = Path.GetFileName(strFile).Split(new char[] { '_' }).First();
            DataSet ds = InitCommon.ReadExcel(strFile);
            DataTable dt = ds.Tables[0];
            Compare1Template compare1 = new Compare1Template();
            Compare2Template compare2 = new Compare2Template();

            // Check Column number 
            DateTime dTimeYearMonth;
            if (String.Equals(fileName, Constant.FILE_NAME_COMPARE_TEMPLATE1))
            {
                if (!Constant.NUMBER_COLUMN_COMPARE_TEMPLATE1.Equals(dt.Columns.Count))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM018.ErrorColumnNumber);
                }
            }
            if (String.Equals(fileName, Constant.FILE_NAME_COMPARE_TEMPLATE2))
            {
                if (!Constant.NUMBER_COLUMN_COMPARE_TEMPLATE2.Equals(dt.Columns.Count))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM018.ErrorColumnNumber);
                }
            }

            // Check Row number 
            if (dt.Rows.Count < Constant.NUMBER_ROW_COMPARE_TEMPLATE ||
                String.IsNullOrEmpty(dt.Rows[Constant.NUMBER_ROW_COMPARE_TEMPLATE - 1][Compare1Template.COMPANY_CODE_INDEX].ToString()))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM018.ErrorRowNumber);
            }

            dTimeYearMonth = DateTimeFormat.ToDateTime(refer.YearMonth + "01").Value;
            List<DateTime> listDateRangeSalary = commonBL.GetDateRangeSalary(refer.CompanyCode, dTimeYearMonth);
            List<WorkingTimeChangeReferDto> listtWorkingTimeChangeRefer = workingTimeChangeReferBL.GetWorkingTimeChangeRefer(refer.CompanyCode, listDateRangeSalary[0], listDateRangeSalary[1]);

            DataTable dtCompareResult = new DataTable();
            dtCompareResult.Columns.Add("NO", typeof(int));
            dtCompareResult.Columns.Add("EMPLOYEE_NO", typeof(string));
            dtCompareResult.Columns.Add("EMPLOYEE_NAME", typeof(string));
            dtCompareResult.Columns.Add("WORK_DATE", typeof(string));
            dtCompareResult.Columns.Add("FILE_EXCEL_OT", typeof(decimal));
            dtCompareResult.Columns.Add("SYSTEM_OT", typeof(decimal));
            dtCompareResult.Columns.Add("DIFFERENCE_OT", typeof(decimal));
            dtCompareResult.Columns.Add("FILE_EXCEL_OT_LATE", typeof(decimal));
            dtCompareResult.Columns.Add("SYSTEM_OT_LATE", typeof(decimal));
            dtCompareResult.Columns.Add("DIFFERENCE_OT_LATE", typeof(decimal));
            dtCompareResult.Columns.Add("FILE_EXCEL_LATE_TIME", typeof(decimal));
            dtCompareResult.Columns.Add("SYSTEM_LATE_TIME", typeof(decimal));
            dtCompareResult.Columns.Add("DIFFERENCE_LATE_TIME", typeof(decimal));
            dtCompareResult.Columns.Add("FILE_EXCEL_ABSENCE", typeof(decimal));
            dtCompareResult.Columns.Add("SYSTEM_ABSENCE", typeof(decimal));
            dtCompareResult.Columns.Add("DIFFERENCE_ABSENCE", typeof(decimal));
            dtCompareResult.Columns.Add("FILE_EXCEL_WORK_DATE_TYPE", typeof(string));
            dtCompareResult.Columns.Add("SYSTEM_WORK_DATE_TYPE", typeof(string));

            // Compare1Template
            if (String.Equals(fileName, Constant.FILE_NAME_COMPARE_TEMPLATE1))
            {
                // compare and export result
                for (int i = 3; i <= dt.Rows.Count; i++)
                {
                    var row = dt.Rows[i - 1];
                    // Check CompanyCode is blank
                    if (String.IsNullOrEmpty(row[Compare1Template.COMPANY_CODE_INDEX].ToString()))
                    {
                        break;
                    }
                    if (!String.Equals(row[Compare1Template.COMPANY_CODE_INDEX].ToString(), refer.CompanyCode)
                        && !String.Equals(row[Compare1Template.APPROVE_STATUS_INDEX].ToString(), Constant.APPROVE_STATUS))
                    {
                        continue;
                    }
                    string strEmployeeNo = row[Compare1Template.EMPLOYEE_NO_INDEX].ToString();
                    string strWorkDate = row[Compare1Template.WORK_DATE_INDEX].ToString();
                    DateTime dTimeWorkDate;
                    DateTime.TryParseExact(strWorkDate, FORMAT_DATE_DDMMYYYY,
                                            System.Globalization.CultureInfo.InvariantCulture,
                                            System.Globalization.DateTimeStyles.None, out dTimeWorkDate);
                    if (DateTime.Compare(dTimeWorkDate, listDateRangeSalary[0]) < 0 || (DateTime.Compare(dTimeWorkDate, listDateRangeSalary[1]) > 0))
                    {
                        continue;
                    }
                    if (listtWorkingTimeChangeRefer.Count() > 0)
                    {
                        var item = listtWorkingTimeChangeRefer.Where(x => x.EmployeeNoPe == strEmployeeNo)
                                                              .Where(x => x.WorkingDate == dTimeWorkDate)
                                                              .Where(x => x.IsInExcelFile == false)
                                                              .FirstOrDefault();
                        if (item != null)
                        {
                            listtWorkingTimeChangeRefer.Where(x => x.EmployeeNoPe == strEmployeeNo)
                                                              .Where(x => x.WorkingDate == dTimeWorkDate)
                                                              .FirstOrDefault().IsInExcelFile = true;
                            dtCompareResult.Rows.Add(new object[] { 1,
                                item.EmployeeNoPe,
                                item.EmployeeName,
                                item.WorkingDate.ToString(),
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_TIME_INDEX].ToString()),
                                item.TotalOtTime,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_TIME_INDEX].ToString()) - item.TotalOtTime,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_LATE_TIME_INDEX].ToString()),
                                item.LateOtTime,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_LATE_TIME_INDEX].ToString()) - item.LateOtTime,
                                row[Compare1Template.TOTAL_LATE_TIME_INDEX].ToString() == null ? 0 : Convert.ToDecimal(row[Compare1Template.TOTAL_LATE_TIME_INDEX].ToString()),
                                item.TotalLateTime,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_LATE_TIME_INDEX].ToString()) - item.TotalLateTime,
                                Convert.ToDecimal(row[Compare1Template.DEDUCTED_UNPAID_INDEX].ToString()),
                                item.DeductedUnpaid,
                                Convert.ToDecimal(row[Compare1Template.DEDUCTED_UNPAID_INDEX].ToString()) - item.DeductedUnpaid,
                                row[Compare1Template.WORK_DAY_TYPE_INDEX].ToString(),
                                item.WorkingType == null ? "" : item.WorkingType
                            });
                        }
                        else
                        {
                            dtCompareResult.Rows.Add(new object[] { 1,
                                row[Compare1Template.EMPLOYEE_NO_INDEX].ToString(),
                                row[Compare1Template.EMPLOYEE_NO_INDEX].ToString(),
                                row[Compare1Template.WORK_DATE_INDEX].ToString(),
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_TIME_INDEX].ToString()),
                                0,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_TIME_INDEX].ToString()),
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_LATE_TIME_INDEX].ToString()),
                                0,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_OT_LATE_TIME_INDEX].ToString()),
                                Convert.ToDecimal(row[Compare1Template.TOTAL_LATE_TIME_INDEX].ToString()),
                                0,
                                Convert.ToDecimal(row[Compare1Template.TOTAL_LATE_TIME_INDEX].ToString()),
                                Convert.ToDecimal(row[Compare1Template.DEDUCTED_UNPAID_INDEX].ToString()),
                                0,
                                Convert.ToDecimal(row[Compare1Template.DEDUCTED_UNPAID_INDEX].ToString()),
                                row[Compare1Template.WORK_DAY_TYPE_INDEX].ToString(),
                                ""
                            });
                        }
                    }
                }
                // Generate Excel file
                GenerateExcelFile(dTimeYearMonth, root, dtCompareResult);
            }
            // Compare2Template
            if (String.Equals(fileName, Constant.FILE_NAME_COMPARE_TEMPLATE2))
            {

            }

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = "Tmp thanh cong",
                //LogFile = log.Close()
            });
        }

        
        [Route("import/{CompanyCode}/{CompanyId}/{YearMonth}/{Month}")]
        public async Task<HttpResponseMessage> Post(HttpRequestMessage request, [FromUri] WorkingTimeChangeReferRequest data)
        {
            string root = InitCommon.GetRootPath();
            var provider = new FileUpload(root);
            await Request.Content.ReadAsMultipartAsync(provider);

            string strFile = provider.FileData[0].LocalFileName;
            string extension = Path.GetExtension(strFile);

            // Check format is Excel(.xls, .xlsx)
            if (string.IsNullOrEmpty(extension) || (!".xls".Equals(extension) && !".xlsx".Equals(extension)))
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, MessagesM018.ErrorCompareFileFormat);
            }

            string fileName = Path.GetFileName(strFile).Split(new char[] { '_' }).First();
            DataSet ds = InitCommon.ReadExcel(strFile);
            DataTable dt = ds.Tables[0];

            // Valid data
            String message = validFileImportData(dt, data);
            if (!String.IsNullOrEmpty(message))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, message);
            }

            // get List employee
            List < KYEmployeeDto > emps =  new EmployeeBL().GetAllByCompanyId(data.CompanyId);
            // get list workingType
            List<TBMSystemDto> workingTypes = new CommonBL().getMSystemList(Constant.WORKING_TYPE, data.CompanyCode);

            List<WorkingTimeChangeReferDto> dtos = new List<WorkingTimeChangeReferDto>();
          
            for (int i = Constant.NUMBER_ROW_FILE_DATA_TO_COMPARE - 1; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];
                string id = row[FileDataToCompare.STT].ToString();
                WorkingTimeChangeReferDto dto = new WorkingTimeChangeReferDto();
                if (!string.IsNullOrEmpty(id))
                {
               
                    dto.EmployeeNo = row[FileDataToCompare.EMPLOYEE_NO_INDEX].ToString();
                    dto.EmployeeName = row[FileDataToCompare.EMPLOYEE_NM_INDEX].ToString();
                    //dto.WorkingDate = DateTimeFormat.ToDateTime(row[FileDataToCompare.WORKING_DATE].ToString()).Value;
                    dto.WorkingDateStr = row[FileDataToCompare.WORKING_DATE].ToString();

                    dto.TotalOtFileExcel = DecimalFormat.Parse(row[FileDataToCompare.TOTAL_OT_FILE_EXCEL].ToString());
                    dto.TotalOtSystem = DecimalFormat.Parse(row[FileDataToCompare.TOTAL_OT_SYSTEM].ToString());
                    dto.TotalOtDifference = row[FileDataToCompare.TOTAL_OT_DIFFERENCE].ToString();

                    dto.TotalOtLateFileExcel = DecimalFormat.Parse(row[FileDataToCompare.TOTAL_OT_LATE_FILE_EXCEL].ToString());
                    dto.TotalOtLateSystem = DecimalFormat.Parse(row[FileDataToCompare.TOTAL_OT_LATE_SYSTEM].ToString());
                    dto.TotalOtLateDifference = row[FileDataToCompare.TOTAL_OT_LATE_DIFFERENCE].ToString();

                    dto.TotalLateFileExcel = DecimalFormat.Parse(row[FileDataToCompare.TOTAL_LATE_FILE_EXCEL].ToString());
                    dto.TotalLateSystem = DecimalFormat.Parse(row[FileDataToCompare.TOTAL_LATE_SYSTEM].ToString());
                    dto.TotalLateDifference = row[FileDataToCompare.TOTAL_LATE_DIFFERENCE].ToString();

                    dto.NoSalaryHourFileExcel = DecimalFormat.Parse(row[FileDataToCompare.NO_SALARY_HOUR_FILE_EXCEL].ToString());
                    dto.NoSalaryHourSystem = DecimalFormat.Parse(row[FileDataToCompare.NO_SALARY_HOUR_SYSTEM].ToString());
                    dto.NoSalaryHourDifference = row[FileDataToCompare.NO_SALARY_HOUR_DIFFERENCE].ToString();

                    dto.WkDateTypeFileExcel = row[FileDataToCompare.WK_DATE_TYPE_FILE_EXCEL].ToString();
                    dto.WkDateTypeSystem = row[FileDataToCompare.WK_DATE_TYPE_SYSTEM].ToString();
                
                    dto.UpdateBy = Helper.EmployeeNo();

                    dto.CompanyCd = data.CompanyCode;
                    dtos.Add(dto);
                }
            }

            // create LogFile
            var log = new Logger(Constant.SCREEN_M018);
            int coutInsertedRow = 0;

            // Get startDate , endDate to cal Salary
            DateTime timeYearMonth = DateTimeFormat.ToDateTime("01" +data.YearMonth).Value;

            List<DateTime> listDateRangeSalary = commonBL.GetDateRangeSalary(data.CompanyCode, timeYearMonth);

            for (int i = 0; i < dtos.Count; i++)
            {
                List<string> messages = new List<string>();
                WorkingTimeChangeReferDto dto = dtos[i];

                var check = new WorkingTimeChangeReferImportValidator(i, emps, workingTypes).Validate(dto);
                foreach (var error in check.Errors)
                {
                    messages.Add(error.ErrorMessage);
                }

                log.Write(messages);

                if (messages.Count == 0)
                {
                    coutInsertedRow++;
                    new WorkingTimeChangeReferBL().DeleteWorkingTimeHisByYearMonth(DateTimeFormat.converVnDateToSysDate(data.Month));
                    new WorkingTimeChangeReferBL().InsertDataImport(dto, DateTimeFormat.converVnDateToSysDate(data.Month));
                }
                
            }

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = string.Format(MessagesM018.ResultImport, coutInsertedRow, dtos.Count),
                LogFile = log.Close()
            });

            //return Request.CreateResponse(HttpStatusCode.OK, new
            //{
            //    //Message = string.Format(MessagesM011.ResultImport, coutInsertedRow, dependentDtos.Count),
            //    //LogFile = log.Close()
            //});
            
        }

        /// <summary>
        /// valid file import infomation
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private String validFileImportData(DataTable dt, WorkingTimeChangeReferRequest data)
        {
            // Check Column 
            if (!Constant.NUMBER_COLUMN_FILE_DATA_TO_COMPARE.Equals(dt.Columns.Count))
            {   
                return MessagesM018.ErrorColumnNumber;
            }
            // Check Row
            if (dt.Rows.Count < Constant.NUMBER_ROW_FILE_DATA_TO_COMPARE ||
               String.IsNullOrEmpty(dt.Rows[Constant.NUMBER_ROW_FILE_DATA_TO_COMPARE - 1][FileDataToCompare.STT].ToString()))
            {
                return MessagesM018.ErrorRowNumber;
            }

            // Check closeYm
            if (new CommonBL().IsClosing(data.CompanyId, data.Month))
            {
                return MessagesM018.ErrorIsClose;
            }

            return "";
        }

        /// <summary>
        /// Get Extenstion of Excel file
        /// </summary>
        /// <param name="application"></param>
        /// <returns></returns>
        private string GetDefaultExtension(Excel.Application application)
        {
            double Version = Convert.ToDouble(application.Version, CultureInfo.InvariantCulture);
            if (Version >= 12.00)
                return ".xlsx";
            else
                return ".xls";
        }

        /// <summary>
        /// Create a Excel file
        /// </summary>
        /// <param name="dTimeYearMonth"></param>
        /// <param name="root"></param>
        private void GenerateExcelFile(DateTime dTimeYearMonth, string root, DataTable dtCompareResult)
        {
            // Store the Excel processes before opening.
            Process[] processesBefore = Process.GetProcessesByName("excel");
            object m = Type.Missing;
            // open Excel application
            Excel.Application app = new Excel.Application();
            app.DisplayAlerts = false;
            app.ScreenUpdating = false;
            string workbookPath = root + "\\CompareResult.xlsx";
            Excel.Workbooks wbs = app.Workbooks;
            Excel.Workbook wb = null;
            Excel.Sheets sheets = null;
            Excel.Worksheet ws = null;
            Excel.Range r = null;
            bool isOpen = false;
            string fileExtension = "";
            string fileNameExcel = "";
            try
            {
                wb = wbs.Open(workbookPath, m, m, m, m, m,
                     m, m, m, m, m,
                        m, m, m, Excel.XlCorruptLoad.xlRepairFile);
                sheets = wb.Worksheets;
                // The following gets Sheet1 for editing
                string currentSheet = "File Import";
                ws = (Excel.Worksheet)sheets.get_Item(currentSheet);

                ws.Cells[2, "I"] = "'" + dTimeYearMonth.ToString("MM/yyyy");
                r = ws.get_Range("I1:I1", Type.Missing);
                isOpen = true;
            }
            catch
            {
                //Create a new workbook if the existing workbook failed to open.
                wb = wbs.Add(m);
                ws = (Excel.Worksheet)wb.ActiveSheet;

                //set file name
                fileExtension = this.GetDefaultExtension(app);
                fileNameExcel = "CompareResult";
                ws.Name = "File Import";
                r = ws.get_Range("A1", "A1");
                r.RowHeight = 24;

                //set value for header
                ws.Cells[1, "G"] = "So sánh thông tin dữ liệu dùng để tính lương";
                r = ws.get_Range("G1:N1", Type.Missing);
                r.Font.Size = 20;
                r.VerticalAlignment = Excel.XlVAlign.xlVAlignCenter;
                r.HorizontalAlignment = Excel.XlHAlign.xlHAlignLeft;

                ws.Cells[2, "G"] = "Tháng năm so sánh";
                r = ws.get_Range("G1:H1", Type.Missing);

                ws.Cells[2, "I"] = "'" + dTimeYearMonth.ToString("MM/yyyy");
                r = ws.get_Range("I1:I1", Type.Missing);

                ws.Cells[4, "A"] = "Số thứ tự";
                r = ws.get_Range("A4", "A5");
                r.Merge();
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "B"] = "Mã số nhân viên";
                r = ws.get_Range("B4", "B5");
                r.Merge();
                r.ColumnWidth = 25;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "C"] = "Tên nhân viên";
                r = ws.get_Range("C4", "C5");
                r.Merge();
                r.ColumnWidth = 25;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "D"] = "Ngày làm việc";
                r = ws.get_Range("D4", "D5");
                r.Merge();
                r.ColumnWidth = 25;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "E"] = "Tổng thời gian OT";
                r = ws.get_Range("E4", "G4");
                r.Merge();
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "H"] = "Tổng thời gian OT khuya";
                r = ws.get_Range("H4", "J4");
                r.Merge();
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "K"] = "Tổng thời gian làm khuya";
                r = ws.get_Range("K4", "M4");
                r.Merge();
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "N"] = "Số giờ bị trừ lương";
                r = ws.get_Range("N4", "P4");
                r.Merge();
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[4, "Q"] = "Phân loại ngày làm việc";
                r = ws.get_Range("Q4", "R4");
                r.Merge();
                r.ColumnWidth = 25;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "E"] = "File excel";
                r = ws.get_Range("E5", "E5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "F"] = "Hệ thống";
                r = ws.get_Range("F5", "F5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "G"] = "Chênh lệch";
                r = ws.get_Range("G5", "G5");
                r.ColumnWidth = 15;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "H"] = "File excel";
                r = ws.get_Range("H5", "H5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "I"] = "Hệ thống";
                r = ws.get_Range("I5", "I5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "J"] = "Chênh lệch";
                r = ws.get_Range("J5", "J5");
                r.ColumnWidth = 15;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "K"] = "File excel";
                r = ws.get_Range("K5", "K5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "L"] = "Hệ thống";
                r = ws.get_Range("L5", "L5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "M"] = "Chênh lệch";
                r = ws.get_Range("M5", "M5");
                r.ColumnWidth = 15;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "N"] = "File excel";
                r = ws.get_Range("N5", "N5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "O"] = "Hệ thống";
                r = ws.get_Range("O5", "O5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "P"] = "Chênh lệch";
                r = ws.get_Range("P5", "P5");
                r.ColumnWidth = 15;
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "Q"] = "File excel";
                r = ws.get_Range("Q5", "Q5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);

                ws.Cells[5, "R"] = "Hệ thống";
                r = ws.get_Range("R5", "R5");
                r.BorderAround2(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin,
                    Excel.XlColorIndex.xlColorIndexAutomatic, Type.Missing, Type.Missing);
            }
            string workbookFile = "";
            // Get Excel processes after opening the file.
            Process[] processesAfter = Process.GetProcessesByName("excel");
            // Now find the process id that was created, and store it.
            int processID = 0;
            foreach (Process process in processesAfter)
            {
                if (!processesBefore.Select(p => p.Id).Contains(process.Id))
                {
                    processID = process.Id;
                }
            }
            try
            {
                int ColumnsCount = dtCompareResult.Columns.Count;
                // DataCells
                int RowsCount = dtCompareResult.Rows.Count;
                object[,] Cells = new object[RowsCount, ColumnsCount];
                for (int j = 0; j < RowsCount; j++)
                    for (int i = 0; i < ColumnsCount; i++)
                        Cells[j, i] = dtCompareResult.Rows[j][i];

                ws.get_Range((Excel.Range)(ws.Cells[6, 1]), (Excel.Range)(ws.Cells[RowsCount + 5, ColumnsCount])).Value = Cells;
                // save the book
                if (!Directory.Exists(root))
                {
                    Directory.CreateDirectory(root);
                }
                if (isOpen)
                {
                    wb.SaveAs(workbookPath, m, m, m, m, m, Excel.XlSaveAsAccessMode.xlExclusive);
                }
                else
                {
                    fileNameExcel = fileNameExcel + "_" + DateTime.Now.ToString(FORMAT_DATE_DDMMYYYY);
                    workbookFile = string.Format("{0}{1}{2}",
                                root, "\\" + fileNameExcel, fileExtension);
                    wb.SaveAs(workbookFile, m, m, m, m, m, Excel.XlSaveAsAccessMode.xlExclusive);
                }
            }
            finally
            {
                // close excel and dispose reference
                if (r != null)
                    Marshal.ReleaseComObject(r);
                if (sheets != null)
                    Marshal.ReleaseComObject(sheets);
                if (ws != null)
                {
                    Marshal.ReleaseComObject(ws);
                    wb.Close(true, m, m);
                }
                if (wbs != null)
                    Marshal.ReleaseComObject(wbs);
                if (wb != null)
                    Marshal.ReleaseComObject(wb);
                Thread.Sleep(500);
                app.Quit();
                if (app != null)
                    Marshal.ReleaseComObject(app);
                GC.Collect();
                GC.WaitForPendingFinalizers();
                GC.Collect();
                GC.WaitForPendingFinalizers();

                // And now kill the process.
                if (processID != 0)
                {
                    Process process = Process.GetProcessById(processID);
                    process.Kill();
                }
            }
        }
    }
}