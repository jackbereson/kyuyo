using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYAllowanceDto : BaseDto
    {
        public int CompanyId { get; set; }
        public string AllowanceCd { get; set; }
        public string AllowanceName { get; set; }
        public string GroupCd { get; set; }
        public string Group { get; set; }
        public decimal ValueOffical { get; set; }
        public decimal ValueProb { get; set; }
        public string Unit { get; set; }
        public bool AllowanceFlg { get; set; }
        public string EffectiveDt { get; set; }
        public string DeleteFlag { get; set; }
        // tongnd @12 SalaryMaster
        public string EffectiveFrom { get; set; }
        public string EffectiveTo { get; set; }
        public bool selected { get; set; }
    }
}
