using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Taglib;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Taglib
{
    public class TaglibValidator: AbstractValidator<TaglibRequest>
    {
        public TaglibValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsTaglib.CompanyCd));

            RuleFor(r => r.DeptCd)
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsTaglib.DeptCd, 20));

            RuleFor(r => r.EmployeeNo)
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsTaglib.EmployeeNo, 10));

            RuleFor(r => r.EmployeeName)
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsTaglib.EmployeeName, 100));
        }
    }
}