using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYCompanyDto : BaseDto
    {
        public string CompanyCd { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string CompanyTaxCode { get; set; }
        public bool ActiveFlag { get; set; }
        public bool PayrollStatus { get; set; }
        public int StandarWorkingDays { get; set; }
        public int CompanyArea { get; set; }
    }
}
