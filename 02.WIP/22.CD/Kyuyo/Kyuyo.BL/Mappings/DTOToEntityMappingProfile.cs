using AutoMapper;
using Kyuyo.BL.Resources;
using Kyuyo.DA;
using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.BL.Utils;

namespace Kyuyo.BL.Mappings
{
    public class DTOToEntityMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "DTOToEntityMappingProfile"; }
        }

        protected override void Configure()
        {

            CreateMap<KYEmployeeDto, KY_EMPLOYEE_MASTER>()
                .ForMember(dst => dst.ID, opt => opt.MapFrom(src => src.Id))
                .ForMember(dst => dst.COMPANY_ID, opt => opt.MapFrom(src => src.CompanyId))
                .ForMember(dst => dst.EMPLOYEE_NO, opt => opt.MapFrom(src => src.EmployeeNo))
                .ForMember(dst => dst.EMPLOYEE_NO_PE, opt => opt.MapFrom(src => src.EmployeeNoPE))
                .ForMember(dst => dst.EMPLOYEE_NAME, opt => opt.MapFrom(src => src.EmployeeName))
                .ForMember(dst => dst.EMPLOYEE_NAME_FULL, opt => opt.MapFrom(src => src.EmployeeNameFull))
                .ForMember(dst => dst.USER_ID, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dst => dst.ABSENCE_NOT_PAY_BF, opt => opt.MapFrom(src => src.AbsenceNotPayBf))
                .ForMember(dst => dst.ABSENCE_NOT_PAY_AT, opt => opt.MapFrom(src => src.AbsenceNotPayAt))
                .ForMember(dst => dst.ADDRESS, opt => opt.MapFrom(src => src.Address))
                .ForMember(dst => dst.ADDRESS_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.AddressEffectiveDt)))
                .ForMember(dst => dst.WORK_PLACE, opt => opt.MapFrom(src => src.WorkPlace))
                .ForMember(dst => dst.WORK_PLACE_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.WorkPlaceEffectiveDt)))
                .ForMember(dst => dst.EMAIL, opt => opt.MapFrom(src => src.Email))
                .ForMember(dst => dst.EMAIL_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.EmailEffectiveDt)))
                .ForMember(dst => dst.NATIONALITY, opt => opt.MapFrom(src => src.Nationality))
                .ForMember(dst => dst.CONTINENTS, opt => opt.MapFrom(src => src.Continents))
                .ForMember(dst => dst.IDENTITY_PASSPORT, opt => opt.MapFrom(src => src.IdentityPassport))
                .ForMember(dst => dst.PERSONAL_TAX_CODE, opt => opt.MapFrom(src => src.PersonalTaxCode))
                .ForMember(dst => dst.UNIVERSITY, opt => opt.MapFrom(src => src.University))
                .ForMember(dst => dst.QUALIFICATION, opt => opt.MapFrom(src => src.Qualification))
                .ForMember(dst => dst.LEVEL, opt => opt.MapFrom(src => src.Level))
                .ForMember(dst => dst.LEVEL_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.LevelEffctiveDt)))
                .ForMember(dst => dst.LEVEL_GROUP, opt => opt.MapFrom(src => src.LevelGroupEffectiveDt))
                .ForMember(dst => dst.LEVEL_GROUP_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.LevelGroupEffectiveDt)))
                .ForMember(dst => dst.PHONE_NO, opt => opt.MapFrom(src => src.PhoneNo))
                .ForMember(dst => dst.EMERGENCY_PHONE_NO, opt => opt.MapFrom(src => src.EmergencyPhoneNo))
                .ForMember(dst => dst.CONTRACT_FORM, opt => opt.MapFrom(src => src.ContractForm))
                .ForMember(dst => dst.CONTRACT_FORM_EFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.ContractFormEffectiveDt)))
                .ForMember(dst => dst.CONTRACT_TYPE, opt => opt.MapFrom(src => src.ContractType))
                .ForMember(dst => dst.CONTRACT_TYPE_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.ContractTypeEffectiveDt)))
                .ForMember(dst => dst.EMPLOYEE_TYPE, opt => opt.MapFrom(src => src.EmployeeType))
                .ForMember(dst => dst.EMP_TYPE_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.EmpTypeEffectiveDt)))
                .ForMember(dst => dst.GENDER, opt => opt.MapFrom(src => src.Gender))
                .ForMember(dst => dst.BIRTH_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.BirthDt)))
                .ForMember(dst => dst.ENTRY_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.EntryDt)))
                .ForMember(dst => dst.STANDARD_HOURS, opt => opt.MapFrom(src => src.StandardHours))
                .ForMember(dst => dst.STANDARD_HOURS_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.StandardHoursEffeciveDt)))
                .ForMember(dst => dst.QUIT_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.QuitDt)))
                .ForMember(dst => dst.PROBATION_END_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.ProbationEndDt)))
                .ForMember(dst => dst.INSURANCE, opt => opt.MapFrom(src => src.Insurance))
                .ForMember(dst => dst.INSURANCE_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.InsuranceEffectiveDt)))
                .ForMember(dst => dst.INSURANCE_UNION_MONTH, opt => opt.MapFrom(src => DateTimeFormat.ToYearMonth(src.InsuranceUnionMonth)))
                .ForMember(dst => dst.INSURANCE_CODE, opt => opt.MapFrom(src => src.InsuaranceCode))
                .ForMember(dst => dst.HOSPITAL, opt => opt.MapFrom(src => src.Hospital))
                .ForMember(dst => dst.HOSPITAL_EFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.HospitalEffectiveDt)))
                .ForMember(dst => dst.PIT, opt => opt.MapFrom(src => src.PIT ? Constant.FLAG_YES : Constant.FLAG_NO))
                .ForMember(dst => dst.PIT_EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.PITEffectiveDt)))
                .ForMember(dst => dst.CERTIFICATE_LIST, opt => opt.MapFrom(src => src.CertificateList))
                .ForMember(dst => dst.LABOUR_UNION_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.LabourUnionDt)))
                .ForMember(dst => dst.DELETE_FLAG, opt => opt.MapFrom(src => Constant.FLAG_NO));

            CreateMap<DependentDto, KY_DEPENDENT>()
                .ForMember(dst => dst.EMPLOYEE_NO, opt => opt.MapFrom(src => src.EmployeeNo))
                .ForMember(dst => dst.DEPENDENT, opt => opt.MapFrom(src => src.Dependent))
                .ForMember(dst => dst.BIRTH_DT, opt => opt.MapFrom(src => 
                                DateTimeFormat.ToDateTime(DateTimeFormat.formatDateSys(src.BirthDt, Constant.DATE_FORMAT_VN))))
                .ForMember(dst => dst.DEPENDENT_TAX_CODE, opt => opt.MapFrom(src => src.DependentTaxCode))
                .ForMember(dst => dst.IDENTITY_PASSPORT, opt => opt.MapFrom(src => src.IdPassport))
                .ForMember(dst => dst.NUMBER, opt => opt.MapFrom(src => src.Number))
                .ForMember(dst => dst.NUMBER_BOOK, opt => opt.MapFrom(src => src.NumberBook))
                .ForMember(dst => dst.RELATIONSHIP, opt => opt.MapFrom(src => src.Relationship))
                .ForMember(dst => dst.NATIONALITY, opt => opt.MapFrom(src => src.Nationality))
                .ForMember(dst => dst.REG_COUNTRY, opt => opt.MapFrom(src => src.regCountry))
                .ForMember(dst => dst.REG_CITY, opt => opt.MapFrom(src => src.regCity))
                .ForMember(dst => dst.REG_DISTRICT, opt => opt.MapFrom(src => src.regDistrict))
                .ForMember(dst => dst.REG_WARD, opt => opt.MapFrom(src => src.regWard))
                .ForMember(dst => dst.FROM_MONTH, opt => opt.MapFrom(src => src.FromMonth.Replace(@"/", "")))
                .ForMember(dst => dst.TO_MONTH, opt => opt.MapFrom(src => src.ToMonth.Replace(@"/", "")))
                .ForMember(dst => dst.DELETE_FLAG, opt => opt.MapFrom(src => Constant.FLAG_NO))
                .ForMember(dst => dst.MAIN_ID, opt => opt.MapFrom(src => src.MainId))
                .ForMember(dst => dst.HISTORY_NO, opt => opt.MapFrom(src => src.HisNo))

                .ForMember(dst => dst.CREATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dst => dst.CREATED_BY, opt => opt.MapFrom(src => src.updateBy))
                .ForMember(dst => dst.UPDATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dst => dst.UPDATED_BY, opt => opt.MapFrom(src => src.updateBy));

            CreateMap<KYWorkingTimeDto, TB_R_WORKING_TIME>()
                  .ForMember(dst => dst.COMPANY_CD, opt => opt.MapFrom(src => src.CompanyCd))
                  .ForMember(dst => dst.EMPLOYEE_NO, opt => opt.MapFrom(src => src.EmployeeNo))
                  .ForMember(dst => dst.WORKING_DATE, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.WorkingDate)))
                  .ForMember(dst => dst.ACT_IN_TIME, opt => opt.MapFrom(src => src.ActInTime))
                  .ForMember(dst => dst.ACT_OUT_TIME, opt => opt.MapFrom(src => src.ActOutTime))
                  .ForMember(dst => dst.WORKING_TIME, opt => opt.MapFrom(src => DecimalFormat.Parse(src.WorkingTime)))
                  .ForMember(dst => dst.ABSENCE_TIME, opt => opt.MapFrom(src => DecimalFormat.Parse(src.AbsenceTime)))
                  .ForMember(dst => dst.TOTAL_OT_TIME, opt => opt.MapFrom(src => DecimalFormat.Parse(src.TotalOtTime)))
                  .ForMember(dst => dst.LATE_OT_TIME, opt => opt.MapFrom(src => DecimalFormat.Parse(src.LateOtTime)))
                  .ForMember(dst => dst.TOTAL_LATE_TIME, opt => opt.MapFrom(src => DecimalFormat.Parse(src.TotalLateTime)))
                  .ForMember(dst => dst.DEDUCTED_UNPAID, opt => opt.MapFrom(src => DecimalFormat.Parse(src.DeductedUnpaind)))
                  .ForMember(dst => dst.DEDUCTED_PAID, opt => opt.MapFrom(src => DecimalFormat.Parse(src.DeductedPaid)))
                  .ForMember(dst => dst.ATTENDANCE_TYPE, opt => opt.MapFrom(src => src.AttendanceType))
                  .ForMember(dst => dst.WORKING_TYPE, opt => opt.MapFrom(src => src.WorkingType))
                  .ForMember(dst => dst.SPECIAL_TYPE, opt => opt.MapFrom(src => src.SpecialType))
                  .ForMember(dst => dst.MAIN_SHIFT, opt => opt.MapFrom(src => src.MainShift))
                  .ForMember(dst => dst.STD_IN_TIME, opt => opt.MapFrom(src => src.StdInTime))
                  .ForMember(dst => dst.STD_OUT_TIME, opt => opt.MapFrom(src => src.StdOutTime))
                  .ForMember(dst => dst.CREATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                  .ForMember(dst => dst.UPDATED_DT, opt => opt.MapFrom(src => DateTime.Now));


            CreateMap<KYSalaryDto, KY_SALARY_MASTER>()
                 .ForMember(dst => dst.ID, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dst => dst.MAIN_ID, opt => opt.MapFrom(src => src.MainId))
                 .ForMember(dst => dst.HISTORY_NO, opt => opt.MapFrom(src => src.HistoryNo))
                 .ForMember(dst => dst.EMPLOYEE_NO, opt => opt.MapFrom(src => src.EmployeeNo))
                 .ForMember(dst => dst.BASIC_SALARY_OFFICAL, opt => opt.MapFrom(src => src.BasicSalaryOffical))
                 .ForMember(dst => dst.BASIC_SALARY_PROBATION, opt => opt.MapFrom(src => src.BasicSalaryProbasion))
                 .ForMember(dst => dst.SALARY_HOUR, opt => opt.MapFrom(src => src.SalaryHour))
                 .ForMember(dst => dst.SALARY_CAL_SOCIAL_INSU, opt => opt.MapFrom(src => src.SalaryCalSocialInsu))
                 .ForMember(dst => dst.EXCHANGE_RATE_SOCIAL_INSU_SAL, opt => opt.MapFrom(src => src.ExchangeRateSocialInsuSal))
                 .ForMember(dst => dst.PRODUCT_SALARY, opt => opt.MapFrom(src => src.ProductSalary ? Constant.FLAG_YES : Constant.FLAG_NO))
                 .ForMember(dst => dst.BANK_ACCOUNT, opt => opt.MapFrom(src => src.BankAccount))
                 .ForMember(dst => dst.BANK_NAME, opt => opt.MapFrom(src => src.BankName))
                 .ForMember(dst => dst.SALARY_UNIT, opt => opt.MapFrom(src => src.SalaryUnit))
                 .ForMember(dst => dst.UNIT, opt => opt.MapFrom(src => src.Unit))
                 .ForMember(dst => dst.ALLOWANCE_LIST, opt => opt.MapFrom(src => src.AllowanceList))
                 .ForMember(dst => dst.OT_TYPE, opt => opt.MapFrom(src => src.OtType))
                 .ForMember(dst => dst.FORMULA_CD, opt => opt.MapFrom(src => src.FormulaCd))
                 .ForMember(dst => dst.EFFECTIVE_DT, opt => opt.MapFrom(src => DateTimeFormat.ToDateTime(src.EffectiveDt)))
                 .ForMember(dst => dst.DELETE_FLAG, opt => opt.MapFrom(src => src.DeleteFlag ? Constant.FLAG_YES : Constant.FLAG_NO))
                 .ForMember(dst => dst.CREATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                 .ForMember(dst => dst.CREATED_BY, opt => opt.MapFrom(src => src.UpdateBy))
                 .ForMember(dst => dst.UPDATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                 .ForMember(dst => dst.UPDATED_BY, opt => opt.MapFrom(src => src.UpdateBy));
            ;
        }
    }
}