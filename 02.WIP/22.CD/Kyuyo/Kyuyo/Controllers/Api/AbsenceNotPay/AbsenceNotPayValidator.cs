using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.AbsenceNotPay;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;

namespace Kyuyo.Controllers.Api.AbsenceNotPay
{
    /// <summary>
    /// AbsenceNotPay Validator
    /// </summary>
    public class AbsenceNotPayValidator : AbstractValidator<AbsenceNotPayRequest>
    {
        public AbsenceNotPayValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM013.EmployeeNo));

            RuleFor(r => r.AbsenceNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM013.AbsenceType));

            RuleFor(r => r.FromDt)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM013.FromDt))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM013.FromDt));

            RuleFor(r => r.ToDt)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM013.ToDt))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM013.ToDt))
                .Must((instance, value) => ValidateOpts.CheckFuture(instance, instance.FromDt, instance.ToDt))
                 .WithErrorCode("future:#calFromDt").WithMessage(MessagesM013.HolidayDate);

            RuleFor(r => r.StartWorkDt)
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM013.ActualDt))
                .Must((instance, value) => ValidateOpts.CheckFuture(instance, instance.FromDt, instance.StartWorkDt))
                    .WithErrorCode("future:#calFromDt").WithMessage(MessagesM013.StartWorkDate);
        }
    }

    /// <summary>
    /// AbsenceNotPay Search Validator
    /// </summary>
    public class AbsenceNotPaySearchValidator : AbstractValidator<AbsenceNotPaySearchRequest>
    {
        public AbsenceNotPaySearchValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;
            //RuleFor(r => r.EmployeeName)
            //    .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM005.PolicyName, 100));
        }
    }
}