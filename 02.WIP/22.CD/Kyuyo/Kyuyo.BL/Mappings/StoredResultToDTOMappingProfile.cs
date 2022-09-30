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
    public class StoredResultToDTOMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "StoredResultToDTOMappingProfile"; }
        }

        protected override void Configure()
        {

            CreateMap<SearchEmployee_Result, KYEmployeeDto>()
                .ForMember(dst => dst.BirthDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.BirthDt)))
                .ForMember(dst => dst.EntryDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EntryDt)))
                .ForMember(dst => dst.QuitDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.QuitDt)))
                .ForMember(dst => dst.ProbationEndDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.ProbationEndDt)))
                .ForMember(dst => dst.LabourUnionDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.LabourUnionDt)))
                .ForMember(dst => dst.PIT, opt => opt.MapFrom(src => src.PIT == Constant.FLAG_YES ? true : false))
                .ForMember(dst => dst.EmailEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EmailEffectiveDt)))
                .ForMember(dst => dst.EmpTypeEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EmpTypeEffectiveDt)))
                .ForMember(dst => dst.AddressEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.AddressEffectiveDt)))
                .ForMember(dst => dst.WorkPlaceEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.WorkPlaceEffectiveDt)))
                .ForMember(dst => dst.LevelEffctiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.LevelEffctiveDt)))
                .ForMember(dst => dst.LevelGroupEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.LevelGroupEffectiveDt)))
                .ForMember(dst => dst.ContractFormEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.ContractFormEffectiveDt)))
                .ForMember(dst => dst.ContractTypeEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.ContractTypeEffectiveDt)))
                .ForMember(dst => dst.StandardHoursEffeciveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.StandardHoursEffeciveDt)))
                .ForMember(dst => dst.HospitalEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.HospitalEffectiveDt)))
                .ForMember(dst => dst.InsuranceEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.InsuranceEffectiveDt)))
                .ForMember(dst => dst.PITEffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.PITEffectiveDt)))
                .ForMember(dst => dst.InsuranceUnionMonth, opt => opt.MapFrom(src => DateTimeFormat.YearMonthToStringDate(src.InsuranceUnionMonth)))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UpdatedDt)));

            CreateMap<GetEmployeeAuthority_Result, AuthorityDto>()
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UpdatedDt)));

            CreateMap<SearchDependent_Result, DependentDto>()
                .ForMember(dst => dst.BirthDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.BirthDt)))
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UpdatedDt)));

            CreateMap<SearchSalaryMaster_Result, KYSalaryDto>()
               .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dst => dst.EmployeeNo, opt => opt.MapFrom(src => src.EmployeeNo))
               .ForMember(dst => dst.BasicSalaryOffical, opt => opt.MapFrom(src => src.BasicSalaryOffical))
               .ForMember(dst => dst.BasicSalaryProbasion, opt => opt.MapFrom(src => src.BasicSalaryProbation))
               .ForMember(dst => dst.SalaryHour, opt => opt.MapFrom(src => src.SalaryHour))
               .ForMember(dst => dst.SalaryCalSocialInsu, opt => opt.MapFrom(src => src.SalaryCalSocialInsu))
               .ForMember(dst => dst.ExchangeRateSocialInsuSal, opt => opt.MapFrom(src => src.ExchangeRateSocialInsuSal))
               .ForMember(dst => dst.ProductSalary, opt => opt.MapFrom(src => src.ProductSalary == Constant.FLAG_YES ? true : false))
               .ForMember(dst => dst.BankAccount, opt => opt.MapFrom(src => src.BankAccount))
               .ForMember(dst => dst.BankName, opt => opt.MapFrom(src => src.BankName))
               .ForMember(dst => dst.SalaryUnit, opt => opt.MapFrom(src => src.SalaryUnit))
               .ForMember(dst => dst.Unit, opt => opt.MapFrom(src => src.Unit))
               .ForMember(dst => dst.AllowanceList, opt => opt.MapFrom(src => src.AllowanceList))
               .ForMember(dst => dst.OtType, opt => opt.MapFrom(src => src.OTType))
               .ForMember(dst => dst.FormulaCd, opt => opt.MapFrom(src => src.FormulaCd))
               .ForMember(dst => dst.EffectiveDt, opt => opt.MapFrom(src => DateTimeFormat.ToStringDate(src.EffectiveDt)))
               .ForMember(dst => dst.DeleteFlag, opt => opt.MapFrom(src => src.DeleteFlag == Constant.FLAG_YES ? true : false))
               .ForMember(dst => dst.MainId, opt => opt.MapFrom(src => src.MainId))
               .ForMember(dst => dst.HistoryNo, opt => opt.MapFrom(src => src.HistoryNo));

            CreateMap<SearchSalaryCalulate_Result, SalaryCalulateDto>()
                .ForMember(dst => dst.UpdatedDt, opt => opt.MapFrom(src => DateTimeFormat.ToString(src.UpdatedDt)));
        }

    }
}
