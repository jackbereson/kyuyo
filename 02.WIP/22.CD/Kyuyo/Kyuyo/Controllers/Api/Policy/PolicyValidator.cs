using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Policy;
using Kyuyo.Infrastructure.Extensions;

namespace Kyuyo.Controllers.Api.Policy
{
    /// <summary>
    /// Policy Validator
    /// </summary>
    public class PolicyValidator : AbstractValidator<PolicyRequest>
    {
        public PolicyValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;
        }
    }

    /// <summary>
    /// Policy Search Validator
    /// </summary>
    public class PolicySearchValidator : AbstractValidator<PolicySearchRequest>
    {
        public PolicySearchValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;
            RuleFor(r => r.PolicyName)
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM005.PolicyName, 100));
        }
    }
}