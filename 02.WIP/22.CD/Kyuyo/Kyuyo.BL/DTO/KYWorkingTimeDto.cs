using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYWorkingTimeDto : BaseDto
    {
        public int WorkingTimeCd { get; set; }
        public string CompanyCd { get; set; }
        public string EmployeeNo { get; set; }
        public string Revision { get; set; }
        public string DeptCd { get; set; }
        public string WorkingTitle { get; set; }
        public string WorkingDate { get; set; }
        public string ActInTime { get; set; }
        public string ActOutTime { get; set; }
        public string WorkingTime { get; set; }
        public string AbsenceTime { get; set; }
        public string TotalOtTime { get; set; }
        public string LateOtTime { get; set; }
        public string TotalLateTime { get; set; }
        public string DeductedUnpaind { get; set; }
        public string DeductedPaid { get; set; }
        public string AttendanceType { get; set; }
        public string WorkingType { get; set; }
        public string SpecialType { get; set; }
        public string Remark { get; set; }
        public string DeductedNonWorkPlan { get; set; }
        public string DeductedNonWorkActual { get; set; }
        public string MainShift { get; set; }
        public string CurrentShift { get; set; }
        public string StdInTime { get; set; }
        public string StdOutTime { get; set; }
        public string StdWorkHour { get; set; }
        public string Status { get; set; }
        public string ConfirmedBy { get; set; }
        public string WithdrawnBy { get; set; }
        public string ConfirmedDt { get; set; }
        public string WithDrawnDt { get; set; }

    }
}
