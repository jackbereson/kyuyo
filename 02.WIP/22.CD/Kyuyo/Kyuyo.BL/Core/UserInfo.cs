using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Core
{
    public class UserInfo
    {   
        public string EmployeeName { get; set; }
        public int CompanyId { get; set; }
        public string CompanyCd { get; set; }
        public string EmployeeNo { get; set; }
        public string UserId { get; set; }
        public bool IsAuthenticate { get; set; }
        public bool IsAdmin { get; set; }
        public IEnumerable<ScreenItem> ScreenMaster { get; set; }
        public IEnumerable<ScreenItem> ScreenBusiness { get; set; }
    }
}
