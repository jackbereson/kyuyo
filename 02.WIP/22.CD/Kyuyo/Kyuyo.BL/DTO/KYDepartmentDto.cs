using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYDepartmentDto : BaseDto
    {
        public string DeptCd { get; set; }
        public string DeptName { get; set; }
        public string CompanyCd { get; set; }
        public bool ActiveFlag { get; set; }
    }
}
