using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.SSO
{
    public class SSOValidator : AbstractValidator<SSORequest>
    {
        public SSOValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            this.RuleFor(e => e.Param)
                .NotEmpty().WithMessage("Invalid url");

        }
        
    }
    

    public class SSORegistValidator : AbstractValidator<SSORegistRequest>
    {
        public SSORegistValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            this.RuleFor(e => e.Param1)
                .NotEmpty().WithMessage("Invalid url");

            this.RuleFor(e => e.Param2)
                .NotEmpty().WithMessage("Invalid url");

        }
    }
}