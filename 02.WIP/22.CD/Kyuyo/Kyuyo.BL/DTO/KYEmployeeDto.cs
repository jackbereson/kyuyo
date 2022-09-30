using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYEmployeeDto : BaseDto
    {
        public int CompanyId { get; set; }
        public string CompanyCd { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeNoPE { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeNameFull { get; set; }
        public string UserId { get; set; }
        public string Gender { get; set; }
        public string EmployeeType { get; set; }
        public string EmployeeTypeName { get; set; }
        public string BirthDt { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string WorkPlace { get; set; }
        public string Nationality { get; set; }
        public string Continents { get; set; }
        public string IdentityPassport { get; set; }
        public string PersonalTaxCode { get; set; }
        public string University { get; set; }
        public string Qualification { get; set; }
        public string Level { get; set; }
        public string LevelGroup { get; set; }
        public string EntryDt { get; set; }
        public string ProbationEndDt { get; set; }
        public string LabourUnionDt { get; set; }
        public string QuitDt { get; set; }
        public string ContractForm { get; set; }
        public string ContractType { get; set; }
        public string PhoneNo { get; set; }
        public string EmergencyPhoneNo { get; set; }
        public decimal StandardHours { get; set; }
        public string CertificateList { get; set; }
        public string InsuranceUnionMonth { get; set; }
        public string InsuaranceCode { get; set; }
        public string Hospital { get; set; }
        public string Insurance { get; set; }
        public bool PIT { get; set; }
        public int? AbsenceNotPayBf { get; set; }
        public int? AbsenceNotPayAt { get; set; }
        public string DeleteFlag { get; set; }
        public string DeptName { get; set; }

        public string EmpTypeEffectiveDt { get; set; }
        public string EmailEffectiveDt { get; set; }
        public string AddressEffectiveDt { get; set; }
        public string WorkPlaceEffectiveDt { get; set; }
        public string LevelEffctiveDt { get; set; }
        public string LevelGroupEffectiveDt { get; set; }
        public string ContractFormEffectiveDt { get; set; }
        public string ContractTypeEffectiveDt { get; set; }
        public string StandardHoursEffeciveDt { get; set; }
        public string HospitalEffectiveDt { get; set; }
        public string InsuranceEffectiveDt { get; set; }
        public string PITEffectiveDt { get; set; }
    }
}
