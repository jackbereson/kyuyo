using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYLongtermAbsenceDto : BaseDto
    {
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string AbsenceNo { get; set; }
        public string AbsenceDesc { get; set; }
        public string FromDt { get; set; }
        public string ToDt { get; set; }
        public string StartWorkDt { get; set; }
        public bool DeleteFlag { get; set; }
        public string UpdatedBy { get; set; }
    }
}
