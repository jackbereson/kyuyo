using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Core
{
    public class AccessRole
    {
        public string ScreenId { get; set; }
        public string RoleCode { get; set; }
        public List<int> CompanyIds { get; set; }
    }
}
