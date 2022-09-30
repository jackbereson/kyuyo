using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Dependent;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Dependent
{
    public class DepentdentValidator : AbstractValidator<DependentRequest>
    {
        public DepentdentValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM011.Employee))
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM011.Employee, 10));

            RuleFor(r => r.Dependent)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM011.Dependent))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM011.Dependent, 100));

            RuleFor(r => r.BirthDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM011.Birthday));

            RuleFor(r => r.DependentTaxCode)
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM011.TaxCode, 20));

            RuleFor(r => r.IdPassport)
               .Must((instance, value) => CheckInput(instance))
                    .WithErrorCode("required").WithMessage(string.Format(Messages.Required, StringsM011.IdentityPassport))
               .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM011.IdentityPassport, 20));

            RuleFor(r => r.Number)
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM011.NumBirthCertificate, 10));

            RuleFor(r => r.NumberBook)
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM011.NumBookBirthCertificate, 10))
                .Must((instance, value) => ValidateOpts.CheckRequired2(instance, instance.Number, instance.NumberBook))
                    .WithErrorCode("requiredTo:#txtNumBirthCertificate").WithMessage(MessagesM011.InputNumberAndBook);

            //RuleFor(r => r.RegisterPlace)
            //    .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM011.RegisterPlace, 100));

            RuleFor(r => r.Relationship)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM011.Relationship))
                .MaxLength(50).WithMessage(string.Format(Messages.Maxlength, StringsM011.Relationship, 50));

            RuleFor(r => r.Nationality)
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM011.Nationality, 20));

            RuleFor(r => r.FromMonth)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM011.DateFrom))
                .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM011.DateFrom));

            RuleFor(r => r.ToMonth)
                .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM011.DateTo))
                .Must((instance, value) => ValidateOpts.CheckFuture(instance, instance.FromMonth, instance.ToMonth))
                    .WithErrorCode("future:#calDateFrom").WithMessage(MessagesM011.FutureDate);

        }

        private bool CheckInput(object instance, string value)
        {
            throw new NotImplementedException();
        }

        private bool CheckInput(DependentRequest instance)
        {
            if(instance.IdPassportFlag && string.IsNullOrEmpty(instance.IdPassport))
            {
                return false;
            }
            else
            {
                return true;
            }
            
        }

    }

    public class DependentSearchValidator : AbstractValidator<DependentSearchRequest>
    {
        public DependentSearchValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyCd)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM011.CompanyCd));

            RuleFor(r => r.DeptCd)
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM011.Deparment, 10));

            RuleFor(r => r.EmployeeNo)
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM011.EmployeeNo, 10));

            RuleFor(r => r.EmployeeName)
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM011.Deparment, 100));

        }
    }


}