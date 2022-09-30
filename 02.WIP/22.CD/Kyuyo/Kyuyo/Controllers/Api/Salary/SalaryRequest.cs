using Kyuyo.BL.DTO;
using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Salary
{
    public class SalaryRequest
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string CompanyCd { get; set; }
        public string DeptCd { get; set; }
        public string EffectDtFrom { get; set; }
        public string EffectDtTo { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }

        public string EffectiveDt { get; set; }
        public string BasicSalary { get; set; }
        public string UnitBasicSalary { get; set; }
        public string UnitPriceHours { get; set; }
        public string UnitInsuranceSalary { get; set; }
        public string UpdatedDt { get; set; }


        public string Rate { get; set; }
        public string ProbationSalary { get; set; }
        public string InsuranceCalSalary { get; set; }
        public string InsuranceCalSalaryRate { get; set; }
        public bool ProductSalary { get; set; }
        public string PriceHours { get; set; }
        public string AccountNo { get; set; }
        public string BankName { get; set; }
        public string SalaryUnit { get; set; }
        public string OTType { get; set; }
        public string SalaryFormular { get; set; }
        public List<KYAllowanceDto> Allowance { get; set; }
        public List<KYAllowanceDto> Subsidize { get; set; }

    }


    public class SalaryImportRequest : RequestBase
    {
        public SalaryImportRequest()
        {
            this.validator = new SalaryImportValidator();
        }
        public int? CompanyId { get; set; }
        public int Type { get; set; }
    }
}