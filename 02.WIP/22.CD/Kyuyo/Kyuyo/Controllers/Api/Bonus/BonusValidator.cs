using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Bonus;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;

namespace Kyuyo.Controllers.Api.Bonus
{
    /// <summary>
    /// Bonus Validator
    /// </summary>
    public class BonusValidator : AbstractValidator<BonusRequest>
    {
        public BonusValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.YearMonth)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM014.MonthYear));

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM014.EmployeeNo));

            RuleFor(r => r.PayDesc)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM014.Description))
                .MaxLength(200).WithMessage(string.Format(Messages.Maxlength, StringsM014.Description, 200));

            RuleFor(r => r.Value)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM014.Value));

            RuleFor(r => r.Unit)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM014.Unit));

            RuleFor(r => r.DistributionMonths)
                .MaxLength(12).WithMessage(string.Format(Messages.Maxlength, StringsM014.NumMonthDistribute, 12));
        }
    }

    /// <summary>
    /// Bonus Search Validator
    /// </summary>
    public class BonusSearchValidator : AbstractValidator<BonusSearchRequest>
    {
        public BonusSearchValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.YearMonth)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM014.MonthYear));
        }
    }
}