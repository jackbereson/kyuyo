using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class EmpDeptDto : BaseDto
    {
        public string CompanyCd { get; set; }
        public string DeptCd { get; set; }
        public string EmployeeNo { get; set; }
        public string Title { get; set; }
        public bool MainFlag { get; set; }
        public bool DeleteFlag { get; set; }
        public string StartDt { get; set; }
        public string InactiveDt { get; set; }
    }
}
