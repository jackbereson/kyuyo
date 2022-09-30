using FluentValidation;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Deparment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.BL.Resources.SpecialInsurance;

namespace Kyuyo.Controllers.Api.SpecialInsurance
{
    /// <summary>
    /// SpecialInsurance Validator
    /// </summary>
    public class SpecialInsuranceValidator : AbstractValidator<SpecialInsuranceRequest>
    {
        public SpecialInsuranceValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(d => d.AbsenceNo)
              .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM006.AbsenceNo))
            .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM006.AbsenceNo, 20));

            RuleFor(d => d.AbsenceDescription)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM006.Desciption))
                .MaxLength(200).WithMessage(string.Format(Messages.Maxlength, StringsM006.Desciption, 200));
            RuleFor(d => d.EffectiveDt)
                 .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM006.EffectiveDt))
                .DateFormat(Strings.DateFormat).WithMessage(string.Format(Messages.DateFormat, StringsM006.EffectiveDt));
        }
    }
}