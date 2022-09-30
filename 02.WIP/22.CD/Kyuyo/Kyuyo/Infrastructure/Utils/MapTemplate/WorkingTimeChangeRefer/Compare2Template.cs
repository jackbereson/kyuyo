using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils.MapTemplate
{
    /// <summary>
    /// Class Map Data from Excel file
    /// </summary>
    public class Compare2Template
    {
        // CompanyCode
        public const int COMPANY_CODE_INDEX = 0;

        // EmployeeNo
        public const int EMPLOYEE_NO_INDEX = 1;

        // WorkDate
        public const int WORK_DATE_INDEX = 2;

        // TotalOTTime
        public const int TOTAL_OT_TIME_INDEX = 3;

        // TotalOTLateTime
        public const int TOTAL_OT_LATE_TIME_INDEX = 4;

        // TotalLateTime
        public const int TOTAL_LATE_TIME_INDEX = 5;

        // DeductedUnPaid
        public const int DEDUCTED_UNPAID_INDEX = 6;

        // WorkDayType
        public const int WORK_DAY_TYPE_INDEX = 7;

        // ApproveStatus
        public const int APPROVE_STATUS_INDEX = 8;

        // Get list of Column
        public Dictionary<int, CommonExcel> dicCommonExcel { get; set; }

        // Constructor
        public Compare2Template()
        {
            this.dicCommonExcel = new Dictionary<int, CommonExcel>();
            dicCommonExcel.Add(COMPANY_CODE_INDEX, InitCommonExcel(COMPANY_CODE_INDEX));
            dicCommonExcel.Add(EMPLOYEE_NO_INDEX, InitCommonExcel(EMPLOYEE_NO_INDEX));
            dicCommonExcel.Add(WORK_DATE_INDEX, InitCommonExcel(WORK_DATE_INDEX));
            dicCommonExcel.Add(TOTAL_OT_TIME_INDEX, InitCommonExcel(TOTAL_OT_TIME_INDEX));
            dicCommonExcel.Add(TOTAL_OT_LATE_TIME_INDEX, InitCommonExcel(TOTAL_OT_LATE_TIME_INDEX));
            dicCommonExcel.Add(TOTAL_LATE_TIME_INDEX, InitCommonExcel(TOTAL_LATE_TIME_INDEX));
            dicCommonExcel.Add(DEDUCTED_UNPAID_INDEX, InitCommonExcel(DEDUCTED_UNPAID_INDEX));
            dicCommonExcel.Add(WORK_DAY_TYPE_INDEX, InitCommonExcel(WORK_DAY_TYPE_INDEX));
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