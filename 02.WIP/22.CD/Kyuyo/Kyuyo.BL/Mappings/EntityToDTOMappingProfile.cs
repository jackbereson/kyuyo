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
    public class EntityToDTOMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "EntityToDTOMappingProfile"; }
        }

        protected override void Configure()
        {

            CreateMap<TB_M_DEPARTMENT, KYDepartmentDto>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dst => dst.DeptCd, opt => opt.MapFrom(src => src.DEPT_CD))
                .ForMember(dst => dst.DeptName, opt => opt.MapFrom(src => src.DEPT_NAME))
                .ForMember(dst => dst.CompanyCd, opt => opt.MapFrom(src => src.COMPANY_CD))
                .ForMember(dst => dst.ActiveFlag, opt => opt.MapFrom(src => src.ACTIVE_FLAG == Constant.FLAG_YES ? true : false))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<TB_M_COMPANY, KYCompanyDto>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dst => dst.CompanyCd, opt => opt.MapFrom(src => src.COMPANY_CD))
                .ForMember(dst => dst.CompanyName, opt => opt.MapFrom(src => src.COMPANY_NAME))
                .ForMember(dst => dst.Address, opt => opt.MapFrom(src => src.ADDRESS))
                .ForMember(dst => dst.CompanyTaxCode, opt => opt.MapFrom(src => src.COMPANY_TAX_CODE))
                .ForMember(dst => dst.ActiveFlag, opt => opt.MapFrom(src => src.ACTIVE_FLAG == Constant.FLAG_YES ? true : false))
                .ForMember(dst => dst.PayrollStatus, opt => opt.MapFrom(src => src.PAYROLL_STATUS == Constant.FLAG_YES ? true : false))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<TB_M_SYSTEM, TBMSystemDto>()
               .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
               .ForMember(dst => dst.CompanyCd, opt => opt.MapFrom(src => src.COMPANY_CD))
               .ForMember(dst => dst.Category, opt => opt.MapFrom(src => src.CATEGORY))
               .ForMember(dst => dst.Cd, opt => opt.MapFrom(src => src.CD))
               .ForMember(dst => dst.Value, opt => opt.MapFrom(src => src.VALUE))
               .ForMember(dst => dst.CharValue1, opt => opt.MapFrom(src => src.CHAR_VALUE_1))
               .ForMember(dst => dst.CharValue2, opt => opt.MapFrom(src => src.CHAR_VALUE_2))
               .ForMember(dst => dst.CharValue3, opt => opt.MapFrom(src => src.CHAR_VALUE_3))
               .ForMember(dst => dst.NumValue1, opt => opt.MapFrom(src => src.NUM_VALUE_1))
               .ForMember(dst => dst.NumValue2, opt => opt.MapFrom(src => src.NUM_VALUE_2))
               .ForMember(dst => dst.NumValue3, opt => opt.MapFrom(src => src.NUM_VALUE_3))
               .ForMember(dst => dst.Remark, opt => opt.MapFrom(src => src.REMARK))
               .ForMember(dst => dst.ListOrder, opt => opt.MapFrom(src => src.LIST_ORDER))
               .ForMember(dst => dst.ActiveFlag, opt => opt.MapFrom(src => src.ACTIVE_FLAG == Constant.FLAG_YES ? true : false))
               .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_AUTHORITY, AuthorityDto>()
                 .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                 .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                 .ForMember(dst => dst.ScreenAccess, opt => opt.MapFrom(src => src.SCREEN_ACCESSES))
                 .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_POLICY_MASTER, PolicyDto>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dst => dst.PolicyCd, opt => opt.MapFrom(src => src.POLICY_CD))
                .ForMember(dst => dst.PolicyName, opt => opt.MapFrom(src => src.POLICY_NAME))
                .ForMember(dst => dst.PolicyType, opt => opt.MapFrom(src => src.POLICY_TYPE))
                .ForMember(dst => dst.GroupName, opt => opt.MapFrom(src => src.GROUP_NAME))
                .ForMember(dst => dst.LimitStep, opt => opt.MapFrom(src => src.LIMIT_STEP))
                .ForMember(dst => dst.NumValue, opt => opt.MapFrom(src => src.NUM_VALUE))
                .ForMember(dst => dst.CharValue, opt => opt.MapFrom(src => src.CHAR_VALUE))
                .ForMember(dst => dst.Unit, opt => opt.MapFrom(src => src.UNIT))
                .ForMember(dst => dst.LimitStepUnit, opt => opt.MapFrom(src => src.LIMIT_STEP_UNIT))
                .ForMember(dst => dst.ItemRef, opt => opt.MapFrom(src => src.ITEM_REF))
                .ForMember(dst => dst.EffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.EFFECTIVE_DT)))
                .ForMember(dst => dst.AllowEdit, opt => opt.MapFrom(src => src.ALLOW_EDIT))
                ;

            CreateMap<KY_DEPENDENT, DependentDto>()
                 .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                 .ForMember(dst => dst.FromMonth, opt => opt.MapFrom(src => src.FROM_MONTH))
                 .ForMember(dst => dst.ToMonth, opt => opt.MapFrom(src => src.TO_MONTH))
                 .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                 .ForMember(dst => dst.Dependent, opt => opt.MapFrom(src => src.DEPENDENT))
                 .ForMember(dst => dst.BirthDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.BIRTH_DT)))
                 .ForMember(dst => dst.DependentTaxCode, opt => opt.MapFrom(src => src.DEPENDENT_TAX_CODE))
                 .ForMember(dst => dst.IdPassport, opt => opt.MapFrom(src => src.IDENTITY_PASSPORT))
                 .ForMember(dst => dst.Number, opt => opt.MapFrom(src => src.NUMBER))
                 .ForMember(dst => dst.NumberBook, opt => opt.MapFrom(src => src.NUMBER_BOOK))
                 .ForMember(dst => dst.Relationship, opt => opt.MapFrom(src => src.RELATIONSHIP))
                 .ForMember(dst => dst.Nationality, opt => opt.MapFrom(src => src.NATIONALITY))
                 .ForMember(dst => dst.regCountry, opt => opt.MapFrom(src => src.REG_COUNTRY))
                 .ForMember(dst => dst.regCity, opt => opt.MapFrom(src => src.REG_CITY))
                 .ForMember(dst => dst.regDistrict, opt => opt.MapFrom(src => src.REG_DISTRICT))
                 .ForMember(dst => dst.regWard, opt => opt.MapFrom(src => src.REG_WARD))
                 .ForMember(dst => dst.FromMonth, opt => opt.MapFrom(src => src.FROM_MONTH))
                 .ForMember(dst => dst.ToMonth, opt => opt.MapFrom(src => src.TO_MONTH))
                 .ForMember(dst => dst.MainId, opt => opt.MapFrom(src => src.MAIN_ID))
                 .ForMember(dst => dst.HisNo, opt => opt.MapFrom(src => src.HISTORY_NO))
                 .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT))
                //.ForMember(dst => dst.REG_WARD, opt => opt.MapFrom(src => src.regWard))
                //.ForMember(dst => dst.FROM_MONTH, opt => opt.MapFrom(src => src.FromMonth.Replace(@"/", "")))
                //.ForMember(dst => dst.TO_MONTH, opt => opt.MapFrom(src => src.ToMonth.Replace(@"/", "")))
                //.ForMember(dst => dst.DELETE_FLAG, opt => opt.MapFrom(src => Constant.FLAG_NO))
                //.ForMember(dst => dst.MAIN_ID, opt => opt.MapFrom(src => src.MainId))
                //.ForMember(dst => dst.HISTORY_NO, opt => opt.MapFrom(src => src.HisNo))
                //.ForMember(dst => dst.CREATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                //.ForMember(dst => dst.CREATED_BY, opt => opt.MapFrom(src => src.updateBy))
                //.ForMember(dst => dst.UPDATED_DT, opt => opt.MapFrom(src => DateTime.Now))
                //.ForMember(dst => dst.UPDATED_BY, opt => opt.MapFrom(src => src.updateBy)
                );

            CreateMap<KY_EMPLOYEE_MASTER, KYEmployeeDto>()
                 .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                 .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                 .ForMember(dst => dst.EmployeeNoPE, opt => opt.MapFrom(src => src.EMPLOYEE_NO_PE))
                 .ForMember(dst => dst.EmployeeName, opt => opt.MapFrom(src => src.EMPLOYEE_NAME))
                 .ForMember(dst => dst.CompanyId, opt => opt.MapFrom(src => src.COMPANY_ID))
                 .ForMember(dst => dst.PIT, opt => opt.MapFrom(src => src.PIT == Constant.FLAG_YES))
                 .ForMember(dst => dst.PersonalTaxCode, opt => opt.MapFrom(src => src.PERSONAL_TAX_CODE))
                .ForMember(dst => dst.EmpTypeEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EMP_TYPE_EFFECTIVE_DT)))
                .ForMember(dst => dst.EmailEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EMAIL_EFFECTIVE_DT)))
                .ForMember(dst => dst.AddressEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.ADDRESS_EFFECTIVE_DT)))
                .ForMember(dst => dst.WorkPlaceEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.WORK_PLACE_EFFECTIVE_DT)))
                .ForMember(dst => dst.LevelEffctiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.LEVEL_EFFECTIVE_DT)))
                .ForMember(dst => dst.LevelGroupEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.LEVEL_GROUP_EFFECTIVE_DT)))
                .ForMember(dst => dst.ContractFormEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.CONTRACT_FORM_EFECTIVE_DT)))
                .ForMember(dst => dst.ContractTypeEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.CONTRACT_TYPE_EFFECTIVE_DT)))
                .ForMember(dst => dst.StandardHoursEffeciveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.STANDARD_HOURS_EFFECTIVE_DT)))
                .ForMember(dst => dst.HospitalEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.HOSPITAL_EFECTIVE_DT)))
                .ForMember(dst => dst.InsuranceEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.INSURANCE_EFFECTIVE_DT)))
                .ForMember(dst => dst.PITEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.PIT_EFFECTIVE_DT)))
                 .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            //CreateMap<KY_SPECIAL_INSURANCE_MASTER, SpecialInsuranceDto>()
            //    .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
            //    .ForMember(dst => dst.AbsenceNo, opt => opt.MapFrom(src => src.ABSENCE_NO))
            //    .ForMember(dst => dst.AbsenceDescription, opt => opt.MapFrom(src => src.ABSENCE_DESCIPTION))
            //    .ForMember(dst => dst.EffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.EFFECTIVE_DT)))
            //    .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_ALLOWANCE_MASTER, KYAllowanceDto>()
                 .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                 .ForMember(dst => dst.CompanyId, opt => opt.MapFrom(src => src.COMPANY_ID))
                 .ForMember(dst => dst.AllowanceCd, opt => opt.MapFrom(src => src.ALLOWANCE_CD))
                 .ForMember(dst => dst.AllowanceName, opt => opt.MapFrom(src => src.ALLOWANCE_NAME))
                 .ForMember(dst => dst.GroupCd, opt => opt.MapFrom(src => src.GROUP_CD))
                 .ForMember(dst => dst.Group, opt => opt.MapFrom(src => src.GROUP_NAME))
                 .ForMember(dst => dst.ValueOffical, opt => opt.MapFrom(src => src.VALUE_OFFICAL))
                 .ForMember(dst => dst.ValueProb, opt => opt.MapFrom(src => src.VALUE_PROB))
                 .ForMember(dst => dst.AllowanceFlg, opt => opt.MapFrom(src => src.ALLOWANCE_FLG == Constant.FLAG_YES ? true : false))
                 .ForMember(dst => dst.Unit, opt => opt.MapFrom(src => src.UNIT))
                 .ForMember(dst => dst.EffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EFFECTIVE_DT)))
                 .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_LONGTERM_ABSENCE, KYLongtermAbsenceDto>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                .ForMember(dst => dst.AbsenceNo, opt => opt.MapFrom(src => src.ABSENCE_NO))
                .ForMember(dst => dst.FromDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.FROM_DT)))
                .ForMember(dst => dst.ToDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.TO_DT)))
                .ForMember(dst => dst.StartWorkDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.START_WORK_DT)))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<TB_M_EMP_DEPT, EmpDeptDto>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dst => dst.CompanyCd, opt => opt.MapFrom(src => src.COMPANY_CD))
                .ForMember(dst => dst.DeptCd, opt => opt.MapFrom(src => src.DEPT_CD))
                .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                .ForMember(dst => dst.Title, opt => opt.MapFrom(src => src.TITLE))
                .ForMember(dst => dst.StartDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.START_DT)))
                .ForMember(dst => dst.InactiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.INACTIVE_DT)))
                .ForMember(dst => dst.MainFlag, opt => opt.MapFrom(src => src.MAIN_FLAG == Constant.FLAG_YES ? true : false))
                .ForMember(dst => dst.DeleteFlag, opt => opt.MapFrom(src => src.DELETE_FLAG == Constant.FLAG_YES ? true : false))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_OTHER_PAY, OtherPayDto>()
               .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
               .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_SALARY_FORMULA_MASTER, KYSalaryFormulaDto>()
              .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
              .ForMember(dst => dst.CompanyId, opt => opt.MapFrom(src => src.COMPANY_ID))
              .ForMember(dst => dst.FormulaCd, opt => opt.MapFrom(src => src.FORMULA_CD))
              .ForMember(dst => dst.FormulaName, opt => opt.MapFrom(src => src.FORMULA_NAME))
              .ForMember(dst => dst.FormulaValue, opt => opt.MapFrom(src => src.FORMULA_VALUE))
              .ForMember(dst => dst.FormulType, opt => opt.MapFrom(src => src.FORMULA_TYPE))
              .ForMember(dst => dst.MainId, opt => opt.MapFrom(src => src.MAIN_ID))
              .ForMember(dst => dst.HistoryNo, opt => opt.MapFrom(src => src.HISTORY_NO))
              .ForMember(dst => dst.DeleteFlg, opt => opt.MapFrom(src => src.DELETE_FLAG == Constant.FLAG_YES ? true : false))
              //.ForMember(dst => dst.CreateDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.CREATED_DT))
              //.ForMember(dst => dst.EffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.EFFECTIVE_DT))
              .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_SALARY_MASTER, KYSalaryDto>()
              .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
              .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
              .ForMember(dst => dst.BasicSalaryOffical, opt => opt.MapFrom(src => src.BASIC_SALARY_OFFICAL))
              .ForMember(dst => dst.BasicSalaryProbasion, opt => opt.MapFrom(src => src.BASIC_SALARY_PROBATION))
              .ForMember(dst => dst.SalaryHour, opt => opt.MapFrom(src => src.SALARY_HOUR))
              .ForMember(dst => dst.SalaryCalSocialInsu, opt => opt.MapFrom(src => src.SALARY_CAL_SOCIAL_INSU))
              .ForMember(dst => dst.ExchangeRateSocialInsuSal, opt => opt.MapFrom(src => src.EXCHANGE_RATE_SOCIAL_INSU_SAL))
              .ForMember(dst => dst.ProductSalary, opt => opt.MapFrom(src => src.PRODUCT_SALARY == Constant.FLAG_YES ? true : false))
              .ForMember(dst => dst.BankAccount, opt => opt.MapFrom(src => src.BANK_ACCOUNT))
              .ForMember(dst => dst.BankName, opt => opt.MapFrom(src => src.BANK_NAME))
              //.ForMember(dst => dst.SalaryUnit, opt => opt.MapFrom(src => src.SALARY_UNIT))
              .ForMember(dst => dst.Unit, opt => opt.MapFrom(src => src.UNIT))
              .ForMember(dst => dst.AllowanceList, opt => opt.MapFrom(src => src.ALLOWANCE_LIST))
              .ForMember(dst => dst.OtType, opt => opt.MapFrom(src => src.OT_TYPE))
              .ForMember(dst => dst.FormulaCd, opt => opt.MapFrom(src => src.FORMULA_CD))
              .ForMember(dst => dst.EffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EFFECTIVE_DT)))
              .ForMember(dst => dst.MainId, opt => opt.MapFrom(src => src.MAIN_ID))
              .ForMember(dst => dst.HistoryNo, opt => opt.MapFrom(src => src.HISTORY_NO))
              .ForMember(dst => dst.DeleteFlag, opt => opt.MapFrom(src => src.DELETE_FLAG == Constant.FLAG_YES ? true : false))
              .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));

            CreateMap<KY_QUANTITY_PRODUCT, QuantityProductDto>()
                .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.ID))
                .ForMember(dst => dst.CompanyCd, opt => opt.MapFrom(src => src.COMPANY_CD))
                .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                .ForMember(dst => dst.ProductType, opt => opt.MapFrom(src => src.PRODUCT_TYPE))
                .ForMember(dst => dst.Quantity, opt => opt.MapFrom(src => src.QUANTITY))
                .ForMember(dst => dst.YearMonth, opt => opt.MapFrom(src => src.YEAR_MONTH))
                .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EMPLOYEE_NO))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UPDATED_DT)));
        }
    }
}