using FluentValidation;
using FluentValidation.Results;
using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Salary;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Salary;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Salary
{
    public class KYAllowanceValidator : AbstractValidator<KYAllowanceDto>
    {
        private String name = "1";

        public KYAllowanceValidator()
        {

            RuleFor(s => s.EffectiveTo).Must((instance, value) => checkEffectFrom(instance))
                .WithMessage(MessagesM012.ErrorAllowanceNull, s => s.AllowanceName);
        }

        private bool checkEffectFrom(KYAllowanceDto instance)
        {
            name = instance.AllowanceName;
            if (instance.selected)
            {
                if (string.IsNullOrEmpty(instance.EffectiveFrom))
                {
                    return false;
                }
            }
            return true;
        }
    }

    public class SalaryValidator : AbstractValidator<SalaryRequest>
    {
        public SalaryValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(s => s.CompanyCd)
              .NotEmpty().WithMessage(MessagesM012.ErrorCompanyCdEmpty);

            RuleFor(s => s.EmployeeNo)
               .NotEmpty().WithMessage(MessagesM012.ErrorEmployeeEmpty);

            RuleFor(s => s.EffectiveDt)
              .NotEmpty().WithMessage(MessagesM012.ErrorEffectiveDtEmpty);

            RuleFor(s => s.BasicSalary).Must((instance, value) => checkInputBasicSalaryAndPriceHour(instance))
                            .WithMessage(MessagesM012.ErrorBasicSalaryAndPriceHourEmpty);

            RuleFor(s => s.BasicSalary).NumberRange(0, Constant.MAX_SALARY).WithMessage(MessagesM012.ErrorBasicSalaryToLarge);

            RuleFor(s => s.UnitBasicSalary).Must((instance, value) => checkForeignCur(instance))
                        .WithMessage(MessagesM012.ErrorForeignCurNull);

            RuleFor(s => s.UnitPriceHours).Must((instance, value) => checkUnitPriceHours(instance))
                      .WithMessage(MessagesM012.ErrorForeignCurNull);

            RuleFor(s => s.InsuranceCalSalaryRate).Must((instance, value) => checkInsuranceCalSalaryRate(instance))
                      .WithMessage(MessagesM012.ErrorInsuranceCalSalaryRateNull);

            RuleFor(s => s.OTType).NotEmpty().WithMessage(MessagesM012.ErrorOTTypeNull);

            RuleFor(s => s.SalaryUnit).NotEmpty().WithMessage(MessagesM012.ErrorSalaryUnitNull);

            RuleFor(s => s.SalaryFormular).NotEmpty().WithMessage(MessagesM012.ErrorSalaryFormularNull);

            RuleFor(s => s.ProbationSalary).NumberRange(0, Constant.MAX_SALARY).WithMessage(MessagesM012.ErrorProbationSalaryToLarge);

            RuleFor(s => s.InsuranceCalSalary).NumberRange(0, Constant.MAX_SALARY).WithMessage(MessagesM012.ErrorInsuranceCalSalaryToLarge);

            RuleFor(s => s.InsuranceCalSalaryRate).NumberRange(0, Constant.MAX_RATE).WithMessage(MessagesM012.ErrorInsuranceCalSalaryRateToLarge);

            RuleFor(s => s.PriceHours).NumberRange(0, Constant.MAX_RATE).WithMessage(MessagesM012.ErrorPriceHoursToLarge);

            RuleFor(s => s.Allowance).SetCollectionValidator(new KYAllowanceValidator());

            RuleFor(s => s.Subsidize).SetCollectionValidator(new KYAllowanceValidator());
        }

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="instance"></param>
        private bool checkInputBasicSalaryAndPriceHour(SalaryRequest instance)
        {
            if(!instance.ProductSalary && string.IsNullOrEmpty(instance.BasicSalary) 
                && string.IsNullOrEmpty(instance.PriceHours)) {
                return false;
            }
            return true;
        }

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="instance"></param>
        private bool checkForeignCur(SalaryRequest instance)
        {
            if (!instance.ProductSalary &&  
                    !string.IsNullOrEmpty(instance.BasicSalary) && string.IsNullOrEmpty(instance.UnitBasicSalary)) {
                return false;
            }
            return true;
        }

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="instance"></param>
        private bool checkUnitPriceHours(SalaryRequest instance)
        {
            if (!instance.ProductSalary &&
                    !string.IsNullOrEmpty(instance.PriceHours) && string.IsNullOrEmpty(instance.UnitPriceHours))
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="instance"></param>
        private bool checkInsuranceCalSalaryRate(SalaryRequest instance)
        {
            if (!Constant.UNIT_VND.Equals(instance.UnitInsuranceSalary) 
                && string.IsNullOrEmpty(instance.InsuranceCalSalaryRate))
            {
                return false;
            }
            return true;
        }
        
    }


    public class SalaryImportValidator : AbstractValidator<SalaryImportRequest>
    {
        public SalaryImportValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;
            RuleFor(s => s.CompanyId).NotEmpty().WithMessage(string.Format(Messages.Required, StringsM012.Company));
        }
    }

}