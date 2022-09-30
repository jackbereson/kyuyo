using Kyuyo.BL.DTO;
using System.Collections.Generic;

namespace Kyuyo.Models
{
    public class SalaryModel
    {
        public bool Editable { get; set; }
        public string CompanyCd { get; set; }
        public List<KYCompanyDto> ListCompany { get; set; }
        public List<KYDepartmentDto> ListDept { get; set; }
        public List<TBMSystemDto> OTType { get; set; }
        public List<TBMSystemDto> ForeignCur { get; set; }
        public List<KYSalaryFormulaDto> SalaryFormula { get; set; }
        public List<KYAllowanceDto> Allowance { get; set; }
        public List<KYAllowanceDto> Subsidize { get; set; }
        public string Mode { get; set; }
        // Validator, return validator of server to client jquery by validate() function ($scope.form.absenceNotPaySearchForm.validate())
        public object Validator { get; set; }
    }
}