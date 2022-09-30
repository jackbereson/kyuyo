using System;
using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Authority;
using Kyuyo.Infrastructure.Extensions;

namespace Kyuyo.Controllers.Api.Authority
{
    public class AuthorityValidator : AbstractValidator<AuthorityRequest>
    {
        public AuthorityValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            this.RuleFor(e => e.EmployeeNo)
                .NotEmpty().WithMessage(Messages.Required, StringsM004.Employee)
                .MaxLength(10).WithMessage(Messages.Maxlength, StringsM004.Employee, 10);
            this.RuleFor(e => e.ScreenAccess)
                .NotEmpty().WithMessage(MessagesM004.EmptyAccess);

        }

    }
}
