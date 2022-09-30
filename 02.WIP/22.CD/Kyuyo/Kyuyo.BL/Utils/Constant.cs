using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Kyuyo.BL.Utils
{
    public class Constant
    {
        // Screen ID
        //Master
        public const string SCREEN_M020 = "M020";     // Bộ phận
        public const string SCREEN_M005 = "M005";     // Chính sách
        public const string SCREEN_M006 = "M006";     // Tỷ lệ nộp BH khi giảm LĐ
        public const string SCREEN_M007 = "M007";     // Trợ cấp/phụ cấp
        public const string SCREEN_M008 = "M008";     // Công thức tính lương
        public const string SCREEN_M009 = "M009";     // Nhân viên
        public const string SCREEN_M010 = "M010";     // Danh sách BH tham gia
        public const string SCREEN_M012 = "M012";     // Lương
        // Nghiệp vụ
        public const string SCREEN_M004 = "M004";     // Phân quyền
        public const string SCREEN_M011 = "M011";     // Đăng ký người phụ thuộc
        public const string SCREEN_M013 = "M013";     // Đăng ký nghỉ không lương
        public const string SCREEN_M014 = "M014";     // Đăng ký thưởng
        public const string SCREEN_M015 = "M015";     // Import dữ liệu chấm công
        public const string SCREEN_M016 = "M016";     // Truy thu/truy lĩnh
        public const string SCREEN_M017 = "M017";     // Tính lương
        public const string SCREEN_M018 = "M018";     // Tham khảo thay đổi dữ liệu chấm công
        public const string SCREEN_M019 = "M019";     // In báo cáo

        // Category System master
        public const string LEVEL = "LEVEL";                        // Cấp bậc 
        public const string LEVEL_GROUP = "LEVEL_GROUP";            // Phân cấp nhân sự 
        public const string CONTRACT_TYPE = "CONTRACT_TYPE";        // Loại hợp đồng 
        public const string START_DT_CAL_SAL = "START_DT_CAL_SAL";  // Ngày đầu kỳ tính lương 
        public const string END_DT_CAL_SAL = "END_DT_CAL_SAL";      // Ngày cuối kỳ tính lương 
        public const string KY_PATH = "KY_PATH";                    // Đường dẫn lưu trữ file template 
        public const string KY_DATE = "KY_DATE";                    // Lưu giá trị ngày đầu kỳ lương 
        public const string TITLE = "TITLE";                        // Chức vụ trực thuộc bộ phận 
        public const string ALLOWED_CASE = "ALLOWED_CASE";          // Trường hợp hưởng trợ cấp 
        public const string GROUP_CAL_SAL = "GROUP_CAL_SAL";        // Nhóm tính lương 
        public const string NUM_DAYS_WORKING = "NUM_DAYS_WORKING";  // Số ngày làm việc trong tháng công ty quy định 
        public const string REPORT_LIST = "REPORT_LIST";            // Lưu các loại báo cáo 
        public const string SCREEN_ID = "SCREEN_ID";                // Màn hình 
        public const string FOREIGN_CUR = "FOREIGN_CUR";            // Đơn vị 
        public const string EMPLOYEE_TYPE = "EMPLOYEE_TYPE";        // Phân loại nhân viên 
        public const string WORKING_PLACE = "WORKING_PLACE";        // Nơi làm việc 
        public const string CONTINENTS = "CONTINENTS";              // Châu lục
        public const string CONTRACT_FORM = "CONTRACT_FORM";        // Hình thức hợp đồng
        public const string ADMIN_USER = "ADMIN_USER";
        public const string LONGTERM_ABSENCE = "LONGTERM_ABSENCE";  // Type of Holiday
        public const string INSU_CODE = "INSU_CODE";                // Insurance Code
        public const string ATTENDANCE_WT_TYPE = "ATTENDANCE_WT_TYPE"; // Trạng thái làm việc
        public const string WORKING_TYPE = "WORKING_TYPE";          // Loại ngày làm việc
        public const string SHIFT = "SHIFT";                        // Danh sách ca làm việc
        public const string SPECIAL_TYPE = "SPECIAL_TYPE";          // nghỉ đặt biệt
        public const string CONFIRM_STATUS = "CONFIRM_STATUS";      // Trạng thái duyệt
        public const string CITY = "CITY";
        public const string DISTRICT = "DISTRICT";
        public const string WARD = "WARD";
        public const string COUNTRY = "COUNTRY";
        public const string RELATIONSHIP = "RELATIONSHIP";
        public const string CD_VALUE = "001";


        // Salary calulate role
        public const string ROLE_CALC = "CALC";
        public const string ROLE_CONF = "CONF";
        public const string ROLE_CLOS = "CLOS";

        // flag
        public const string FLAG_NO = "0";
        public const string FLAG_YES = "1";

        public const string APP_FLAG_CALC = "0";     // đang tính lương
        public const string APP_FLAG_REQU = "1";     // Yêu cầu xác nhận
        public const string APP_FLAG_APPR = "2";     // approved
        public const string APP_FLAG_CLOS = "3";     // closing

        // value
        public const string DATETIME_FORMAT = "yyyyMMddHHmmssfff";
        public const string DATE_FORMAT = "yyyyMMdd";
        public const string DATE_FORMAT_VN = "dd/MM/yyyy";
        public const string DATE_FORMAT_BASE = "ddMMyyyy";
        public const string YEARMONTH_FORMAT = "yyyyMM";
        public const string YEARMONTH_VN_FORMAT = "MM/yyyy";
        public const string COMMON_COMPANYCD = "0000000000";

        // mode Authority
        public const string MODE_NONE = "0";
        public const string MODE_EDIT = "1";
        public const string MODE_VIEW = "2";

        // Common log
        public const string LOG_START = "Start";
        public const string LOG_END = "End";

        // The folder containing the file of the client
        public const string FILE_UPLOAD_PATH = @"FileUpload";
        public const string FILE_LOG_PATH = "Log";


        // 11A ImportDependent : Index for all fields 
        public const int IMPORT_DEPENDENT_COL_NUM = 23;
        // 12 Salary Master
        // OT_TYPE
        public const string OT_TYPE = "OT_TYPE";
        public const string UNIT_VND = "VND";
        public const string SALARY_TYPE_NET = "1";
        public const string SALARY_TYPE_GROSS = "0";
        public const string SALARY_TYPE_NET_VALUE = "NET";
        public const string SALARY_TYPE_GROSS_VALUE = "GROSS";
        public const int MAX_SALARY = 999999999;
        public const int MAX_RATE = 9999999;

        // 018 WorkingTimeChangeRefer
        public const string FILE_NAME_COMPARE_TEMPLATE1 = "CompareTemplate1";
        public const string FILE_NAME_COMPARE_TEMPLATE2 = "CompareTemplate2";
        public const int NUMBER_COLUMN_COMPARE_TEMPLATE1 = 20;
        public const int NUMBER_COLUMN_FILE_DATA_TO_COMPARE = 18;
        public const int NUMBER_COLUMN_COMPARE_TEMPLATE2 = 9;
        public const int NUMBER_ROW_COMPARE_TEMPLATE = 3;
        public const int NUMBER_ROW_FILE_DATA_TO_COMPARE = 6;
        public const string APPROVE_STATUS = "C";

        // 014 Bonus
        public const int NUMBER_COLUMN_BONUS_TEMPLATE = 5;
        public const int NUMBER_ROW_BONUS_TEMPLATE = 7;

        // STATUS
        public const string CONFIRMED = "C";
    }
}
