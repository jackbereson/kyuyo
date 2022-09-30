using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    /// <summary>
    /// Class Data Transfer Object for OtherPay
    /// </summary>
    public class OtherPayDto : BaseDto
    {
        public string PayType { get; set; }
        public string PayDesc { get; set; }
        public string Value { get; set; }
        public string Unit { get; set; }
        public string YearMonth { get; set; }
        public string ArreaYearMonth { get; set; }
        public string DeleteFlag { get; set; }
        public string DistributionFlag { get; set; }
        public string DistributionMonths { get; set; }
        public string EmployeeNo { get; set; }
        public string UpdatedBy { get; set; }
    }
}
