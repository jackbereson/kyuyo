using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Employee;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Employee
{
    public class EmployeeValidator : AbstractValidator<EmployeeRequest>
    {
        public EmployeeValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.CompanyCd));

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.EmployeeNo))
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmployeeNo, 10));

            RuleFor(r => r.EmployeeNoPE)
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmployeeNoPE, 10));

            RuleFor(r => r.EmployeeName)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.EmployeeName))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmployeeName, 100));

            RuleFor(r => r.EmployeeNameFull)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.EmployeeNameFull))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmployeeNameFull, 100));

            RuleFor(r => r.EmployeeType)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.EmployeeType))
                .MaxLength(2).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmployeeType, 2));

            RuleFor(r => r.BirthDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.Birthday));

            RuleFor(r => r.UserId)
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.UserId, 20));

            RuleFor(r => r.Email)
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.Email, 100));

            RuleFor(r => r.Address)
                .MaxLength(200).WithMessage(string.Format(Messages.Maxlength, StringsM009.Address, 200));

            RuleFor(r => r.Nationality)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.Nationality))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.Nationality, 100));

            RuleFor(r => r.PersonalTaxCode)
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.NumberTaxCode, 20));

            RuleFor(r => r.IdentityPassport)
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.IdentifyPassport, 20));

            RuleFor(r => r.University)
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.University, 100));

            RuleFor(r => r.Qualification)
                .MaxLength(50).WithMessage(string.Format(Messages.Maxlength, StringsM009.Qualification, 50));

            RuleFor(r => r.EntryDt)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.EntryDate))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.EntryDate));

            RuleFor(r => r.ProbationEndDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.ProbationEndDate))
                .Must((instance, value) => ValidateOpts.CheckFuture(instance, instance.EntryDt, instance.ProbationEndDt))
                    .WithErrorCode("future:#calEntryDate:false").WithMessage(MessagesM009.FutureProbation);

            RuleFor(r => r.LabourUnionDt)
               .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.UnionJoinDate));

            RuleFor(r => r.QuitDt)
               .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.RetireDate))
               .Must((instance, value) => ValidateOpts.CheckFuture(instance, instance.EntryDt, instance.QuitDt))
                    .WithErrorCode("future:#calEntryDate:false").WithMessage(MessagesM009.FutureProbation);

            RuleFor(r => r.PhoneNo)
               .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.PhoneNumber, 20));

            RuleFor(r => r.EmergencyPhoneNo)
               .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmergencyNumber, 20));

            RuleFor(r => r.StandardHours)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.StandardHours))
               .InclusiveBetween(0, 24).WithMessage(string.Format(Messages.MaxNumber, StringsM009.StandardHours, 24));

            RuleFor(r => r.InsuranceUnionMonth)
               .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.MonthJoinInsurance));

            RuleFor(r => r.InsuaranceCode)
               .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM009.InsuCode, 10));

            RuleFor(r => r.Hospital)
               .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.Hospital, 100));

            RuleFor(r => r.AbsenceNotPayBf)
              .InclusiveBetween(0, 999).WithMessage(string.Format(Messages.MaxNumber, StringsM009.AbsenceNotPayDaysBefore2008, 999));

            RuleFor(r => r.AbsenceNotPayAt)
               .InclusiveBetween(0, 999).WithMessage(string.Format(Messages.MaxNumber, StringsM009.AbsenceNotPayDaysAfter2008, 999));

            // Validate popup effective date
            RuleFor(r => r.EmpTypeEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.EmployeeType, instance.EmpTypeEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.EmployeeType))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.EmployeeType));

            RuleFor(r => r.EmailEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.Email, instance.EmailEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.Email))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.Email));

            RuleFor(r => r.AddressEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.Address, instance.AddressEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.Address))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.Address));

            RuleFor(r => r.WorkPlaceEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.WorkPlace, instance.WorkPlaceEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.WorkingPlace))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.WorkingPlace));

            RuleFor(r => r.LevelEffctiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.Level, instance.LevelEffctiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.Level))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.Level));

            RuleFor(r => r.LevelGroupEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.LevelGroup, instance.LevelGroupEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.LevelGroup))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.LevelGroup));

            RuleFor(r => r.ContractFormEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.ContractForm, instance.ContractFormEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.ContractForm))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.ContractForm));

            RuleFor(r => r.ContractTypeEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.ContractType, instance.ContractTypeEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.ContractType))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.ContractType));

            RuleFor(r => r.StandardHoursEffeciveDt)
                .NotEmpty().WithMessage(string.Format(MessagesM009.Required, StringsM009.StandardHours))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.StandardHours));

            RuleFor(r => r.HospitalEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.Hospital, instance.HospitalEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.Hospital))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.Hospital));

            RuleFor(r => r.InsuranceEffectiveDt)
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.Insurance, instance.InsuranceEffectiveDt))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.Insurances))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.Insurances));

            RuleFor(r => r.PITEffectiveDt)
                .Must((instance, value) => instance.PIT == false || (instance.PIT == true && !string.IsNullOrEmpty(value)))
                    .WithErrorCode("required").WithMessage(string.Format(MessagesM009.Required, StringsM009.PIT))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.PIT));
        }
    }

    public class SearchEmployeeValidator : AbstractValidator<SearchEmployeeRequest>
    {
        public SearchEmployeeValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.CompanyCd));

            RuleFor(r => r.FromDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.EffectiveDt));

            RuleFor(r => r.ToDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.EffectiveDt));
        }
    }

    public class EmployeeDeptValidator : AbstractValidator<EmployeeDeptRequest>
    {
        public EmployeeDeptValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyCd)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.CompanyCd))
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.CompanyCd, 20));

            RuleFor(r => r.DeptCd)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.Department))
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.Department, 20));

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.EmployeeNo))
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM009.EmployeeNo, 20));

            RuleFor(r => r.Title)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.TitleClass))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM009.TitleClass, 100));

            RuleFor(r => r.StartDt)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM009.StartDate))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.StartDate));

            RuleFor(r => r.InactiveDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM009.InactiveDt))
                .Must((instance, value) => ValidateOpts.CheckFuture(instance, instance.StartDt, instance.InactiveDt))
                    .WithErrorCode("future:#calStartDt:false").WithMessage(MessagesM009.FutureDept);
        }
    }

}