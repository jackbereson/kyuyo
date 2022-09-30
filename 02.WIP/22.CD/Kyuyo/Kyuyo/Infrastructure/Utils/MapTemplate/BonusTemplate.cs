using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils.MapTemplate
{
    /// <summary>
    /// Class Map Data from Excel file
    /// </summary>
    public class BonusTemplate
    {
        // No
        public const int NO_INDEX = 0;

        // EmployeeNo
        public const int EMPLOYEE_NO_INDEX = 1;

        // EmployeeName
        public const int EMPLOYEE_NAME_INDEX = 2;

        // PayDesc
        public const int PAY_DESC_INDEX = 3;

        // Unit
        public const int UNIT_INDEX = 4;

        // Get list of Column
        public Dictionary<int, CommonExcel> dicCommonExcel { get; set; }

        // Constructor
        public BonusTemplate()
        {
            this.dicCommonExcel = new Dictionary<int, CommonExcel>();
            dicCommonExcel.Add(NO_INDEX, InitCommonExcel(NO_INDEX));
            dicCommonExcel.Add(EMPLOYEE_NO_INDEX, InitCommonExcel(EMPLOYEE_NO_INDEX));
            dicCommonExcel.Add(EMPLOYEE_NAME_INDEX, InitCommonExcel(EMPLOYEE_NAME_INDEX));
            dicCommonExcel.Add(PAY_DESC_INDEX, InitCommonExcel(PAY_DESC_INDEX));
            dicCommonExcel.Add(UNIT_INDEX, InitCommonExcel(UNIT_INDEX));
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