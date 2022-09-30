using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils.MapTemplate
{
    /// <summary>
    /// Class Map Data from Excel file
    /// </summary>
    public class Compare1Template
    {
        // CompanyCode
        public const int COMPANY_CODE_INDEX = 0;

        // EmployeeNo
        public const int EMPLOYEE_NO_INDEX = 1;

        // WorkDate
        public const int WORK_DATE_INDEX = 2;

        // EnterActualHour
        public const int ENTER_ACTUAL_HOUR_INDEX = 3;

        // OutActualHour
        public const int OUT_ACTUAL_HOUR_INDEX = 4;

        // TotalWorkTime
        public const int TOTAL_WORK_TIME_INDEX = 5;

        // TotalAbsence
        public const int TOTAL_ABSENCE_INDEX = 6;

        // TotalOTTime
        public const int TOTAL_OT_TIME_INDEX = 7;

        // TotalOTLateTime
        public const int TOTAL_OT_LATE_TIME_INDEX = 8;

        // TotalLateTime
        public const int TOTAL_LATE_TIME_INDEX = 9;

        // DeductedUnPaid
        public const int DEDUCTED_UNPAID_INDEX = 10;

        // DeductedPaid
        public const int DEDUCTED_PAID_INDEX = 11;

        // WorkingStatus
        public const int WORKING_STATUS_INDEX = 12;

        // WorkDayType
        public const int WORK_DAY_TYPE_INDEX = 13;

        // SpecialHolidayType
        public const int SPECIAL_HOLIDAY_TYPE_INDEX = 14;

        // ShiftWork
        public const int SHIF_TWORK_INDEX = 15;

        // StartWorkingStandardHour
        public const int START_WORKING_STANDARD_HOUR_INDEX = 16;

        // EndStandardWorkingHour
        public const int END_STANDARD_WORKING_HOUR_INDEX = 17;

        // StandardWorkingHour
        public const int STANDARD_WORKING_HOUR_INDEX = 18;

        // ApproveStatus
        public const int APPROVE_STATUS_INDEX = 19;

        // Get list of Column
        public Dictionary<int, CommonExcel> dicCommonExcel { get; set; }

        // Constructor
        public Compare1Template()
        {
            this.dicCommonExcel = new Dictionary<int, CommonExcel>();
            dicCommonExcel.Add(COMPANY_CODE_INDEX, InitCommonExcel(COMPANY_CODE_INDEX));
            dicCommonExcel.Add(EMPLOYEE_NO_INDEX, InitCommonExcel(EMPLOYEE_NO_INDEX));
            dicCommonExcel.Add(WORK_DATE_INDEX, InitCommonExcel(WORK_DATE_INDEX));
            dicCommonExcel.Add(ENTER_ACTUAL_HOUR_INDEX, InitCommonExcel(ENTER_ACTUAL_HOUR_INDEX));
            dicCommonExcel.Add(OUT_ACTUAL_HOUR_INDEX, InitCommonExcel(OUT_ACTUAL_HOUR_INDEX));
            dicCommonExcel.Add(TOTAL_WORK_TIME_INDEX, InitCommonExcel(TOTAL_WORK_TIME_INDEX));
            dicCommonExcel.Add(TOTAL_ABSENCE_INDEX, InitCommonExcel(TOTAL_ABSENCE_INDEX));
            dicCommonExcel.Add(TOTAL_OT_TIME_INDEX, InitCommonExcel(TOTAL_OT_TIME_INDEX));
            dicCommonExcel.Add(TOTAL_OT_LATE_TIME_INDEX, InitCommonExcel(TOTAL_OT_LATE_TIME_INDEX));
            dicCommonExcel.Add(TOTAL_LATE_TIME_INDEX, InitCommonExcel(TOTAL_LATE_TIME_INDEX));
            dicCommonExcel.Add(DEDUCTED_UNPAID_INDEX, InitCommonExcel(DEDUCTED_UNPAID_INDEX));
            dicCommonExcel.Add(DEDUCTED_PAID_INDEX, InitCommonExcel(DEDUCTED_PAID_INDEX));
            dicCommonExcel.Add(WORKING_STATUS_INDEX, InitCommonExcel(WORKING_STATUS_INDEX));
            dicCommonExcel.Add(WORK_DAY_TYPE_INDEX, InitCommonExcel(WORK_DAY_TYPE_INDEX));
            dicCommonExcel.Add(SPECIAL_HOLIDAY_TYPE_INDEX, InitCommonExcel(SPECIAL_HOLIDAY_TYPE_INDEX));
            dicCommonExcel.Add(SHIF_TWORK_INDEX, InitCommonExcel(SHIF_TWORK_INDEX));
            dicCommonExcel.Add(START_WORKING_STANDARD_HOUR_INDEX, InitCommonExcel(START_WORKING_STANDARD_HOUR_INDEX));
            dicCommonExcel.Add(END_STANDARD_WORKING_HOUR_INDEX, InitCommonExcel(END_STANDARD_WORKING_HOUR_INDEX));
            dicCommonExcel.Add(STANDARD_WORKING_HOUR_INDEX, InitCommonExcel(STANDARD_WORKING_HOUR_INDEX));
            dicCommonExcel.Add(APPROVE_STATUS_INDEX, InitCommonExcel(APPROVE_STATUS_INDEX));
        }

        /// <summary>
        /// InitCommonExcel
        /// </summary>
        /// <param name="index"></param>
        /// <returns></returns>
        private CommonExcel InitCommonExcel(int index)
        {
            CommonExcel commonExcel = new CommonExcel();
            commonExcel.Index = index;

            return commonExcel;
        }
    }
}