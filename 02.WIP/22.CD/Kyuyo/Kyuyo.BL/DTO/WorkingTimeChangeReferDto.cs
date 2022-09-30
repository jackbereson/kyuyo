using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    /// <summary>
    /// Class Data Transfer Object for WorkingTimeChangeRefer
    /// </summary>
    public class WorkingTimeChangeReferDto : BaseDto
    {

        public string EmployeeNoPe { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public DateTime WorkingDate { get; set; }
        public decimal? WorkingTime { get; set; }
        public decimal? AbsenceTime { get; set; }
        public decimal? TotalOtTime { get; set; }
        public decimal? LateOtTime { get; set; }
        public decimal? TotalLateTime { get; set; }
        public decimal? DeductedUnpaid { get; set; }
        public decimal? DeductedPaid { get; set; }
        public string WorkingType { get; set; }
        public bool IsInExcelFile { get; set; }

        // tongnd export excel file
        public string WorkingDateStr { get; set; }
        public string UpdateBy { get; set; }
        public string CompanyCd { get; set; }
        
        public decimal? TotalOtFileExcel { get; set; }
        public decimal? TotalOtSystem { get; set; }
        public string TotalOtDifference { get; set; }

        public decimal? TotalOtLateFileExcel { get; set; }
        public decimal? TotalOtLateSystem { get; set; }
        public string TotalOtLateDifference { get; set; }

        public decimal? TotalLateFileExcel { get; set; }
        public decimal? TotalLateSystem { get; set; }
        public string TotalLateDifference { get; set; }

        public decimal? NoSalaryHourFileExcel { get; set; }
        public decimal? NoSalaryHourSystem { get; set; }
        public string NoSalaryHourDifference { get; set; }

        public string WkDateTypeFileExcel { get; set; }
        public string WkDateTypeSystem { get; set; }
    }
}