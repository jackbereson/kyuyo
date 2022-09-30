using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Salary
{
    public class SalaryImport
    {
        public string EmployeeNo { get; set; }
        public string BasicSalaryOffical { get; set; }
        public string BasicSalaryProbasion { get; set; }
        public string SalaryHour { get; set; }
        public string SalaryCalSocialInsu { get; set; }
        public string ExchangeRateSocialInsuSal { get; set; }
        public string ProductSalary { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string SalaryUnit { get; set; }
        public string Unit { get; set; }
        public string Allowance { get; set; }
        public string AllowanceStartDt { get; set; }
        public string AllowanceEndDt { get; set; }
        public string OtType { get; set; }
        public string FormulaCd { get; set; }
        public string EffectiveDt { get; set; }
    }
}