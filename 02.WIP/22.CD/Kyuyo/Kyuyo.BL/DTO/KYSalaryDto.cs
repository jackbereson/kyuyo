using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYSalaryDto : BaseDto
    {
        public string EmployeeNo { get; set; }
        public decimal? BasicSalaryOffical { get; set; }
        public decimal? BasicSalaryProbasion { get; set; }
        public decimal? SalaryHour { get; set; }
        //public string ExchangeRateBasicSal { get; set; }
        public decimal? SalaryCalSocialInsu { get; set; }
        public decimal? ExchangeRateSocialInsuSal { get; set; }
        public bool ProductSalary { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string SalaryUnit { get; set; }
        public string Unit { get; set; }
        public string AllowanceList { get; set; }
        public string OtType { get; set; }
        public string OtTypeValue { get; set; }
        public string FormulaCd { get; set; }
        public string EffectiveDt { get; set; }
        public bool DeleteFlag { get; set; }
        public string EmployeeName { get; set; }
        public int? MainId { get; set; }
        public int? HistoryNo { get; set; }
        public string UpdateBy { get; set; }
        // tongnd 
        public KYEmployeeDto EmployeeObject { get; set; }
        public List<KYAllowanceDto> Allowance { get; set; }
        public List<KYAllowanceDto> Subsidize { get; set; }
    }
}
