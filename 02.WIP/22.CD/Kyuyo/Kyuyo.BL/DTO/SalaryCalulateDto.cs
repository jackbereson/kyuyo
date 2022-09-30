using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class SalaryCalulateDto : BaseDto
    {
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public Nullable<decimal> Bounus { get; set; }
        public Nullable<decimal> Arrear { get; set; }
        public Nullable<decimal> ProbationSalary { get; set; }
        public Nullable<decimal> OfficalSalary { get; set; }
        public Nullable<decimal> BasicSalary { get; set; }
        public Nullable<decimal> TotalPay { get; set; }
        public Nullable<decimal> Other { get; set; }
        public string SalaryUnit { get; set; }
        public string OtherUnit { get; set; }
        public string OtherRemark { get; set; }
        public Nullable<decimal> Sabbtical100 { get; set; }
        public Nullable<decimal> Sabbtical300 { get; set; }
        public string Status { get; set; }
        public string AppFlag { get; set; }
    }
}
