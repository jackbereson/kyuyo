using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.SalaryCalculate
{
    public class SalaryCalulateResponse
    {
        public string StartDt { get; set; }
        public string ClosingTxt { get; set; }
        public string AppFlag { get; set; }
        public bool Disable2 { get; set; }
        public bool Disable3 { get; set; }
        public bool Disable4 { get; set; }
        public bool Disable5 { get; set; }
        public List<KYSalaryFormulaDto> ListFormula { get; set; }
        public List<SalaryCalulateDto> ListSalary { get; set; }
    }
}