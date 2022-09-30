using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Login
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        public LoginValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            this.RuleFor(e => e.UserCode)
                .NotEmpty().WithMessage(Messages.Required, Strings.UserCode)
                .MaxLength(32).WithMessage(Messages.Maxlength, Strings.UserCode, 32);
            this.RuleFor(e => e.Password)
                .NotEmpty().WithMessage(Messages.Required, Strings.Password)
                .MaxLength(32).WithMessage(Messages.Maxlength, Strings.UserCode, 32);

        }

    }
}