using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.ImportWorkingTime;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.ImportWorkingTime
{
    public class ImportWorkingTimeValidator : AbstractValidator<ImportWorkingTimeRequest>
    {
        public ImportWorkingTimeValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM015.Company));

            RuleFor(r => r.FileName)
                .Must(value => true)
                .WithErrorCode("required").WithMessage(Messages.NoFileSelect);

            RuleFor(r => r.YearMonth)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM015.MonthYear))
                .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM015.MonthYear));
        }
    }
}