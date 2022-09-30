using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    public class EmployeeModel
    {
        public bool Editable { get; set; }
        public List<KYCompanyDto> ListCompany { get; set; }
        public List<KYDepartmentDto> ListDept { get; set; }
        public List<TBMSystemDto> ListEmployeeType { get; set; }
        public List<TBMSystemDto> ListWorkingPlace { get; set; }
        public List<TBMSystemDto> ListContinents { get; set; }
        public List<TBMSystemDto> ListLevel { get; set; }
        public List<TBMSystemDto> ListLevelGroup { get; set; }
        public List<TBMSystemDto> ListContractForm { get; set; }
        public List<TBMSystemDto> ListContractType { get; set; }
        public List<TBMSystemDto> ListInsuCode { get; set; }
        public List<KYAllowanceDto> ListCertificate { get; set; }
        public List<PolicyDto> ListInsurance { get; set; }

        public string DateNow { get; set; }
        public int CompanyId { get; set; }
        public object Validator { get; set; }

        // using in popup
        public object ValidatorDept { get; set; }
    }
}