using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class AuthorityDto : BaseDto
    {
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string ScreenAccess { get; set; }
    }
}
