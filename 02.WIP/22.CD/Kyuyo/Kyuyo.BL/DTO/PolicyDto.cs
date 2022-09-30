using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    /// <summary>
    /// Class Data Transfer Object for Policy
    /// </summary>
    public class PolicyDto : BaseDto
    {
        public string PolicyCd { get; set; }
        public string PolicyName { get; set; }
        public string PolicyType { get; set; }
        public string GroupName { get; set; }
        public string LimitStep { get; set; }
        public string NumValue { get; set; }
        public string CharValue { get; set; }
        public string Unit { get; set; }
        public string LimitStepUnit { get; set; }
        public string ItemRef { get; set; }
        public string EffectiveDt { get; set; }
        public string AllowEdit { get; set; }
    }
}
