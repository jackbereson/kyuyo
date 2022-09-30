using FluentValidation;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Deparment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Department
{

    public class DepartmentValidator : AbstractValidator<DepartmentRequest>
    {
        public DepartmentValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(d => d.CompanyCd)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM020.CompanyCd))
                .MaxLength(20).WithMessage(string.Format(Messages.Maxlength, StringsM020.CompanyCd, 20));

            RuleFor(d => d.DeptCd)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM020.DeptCd))
                .MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM020.DeptCd, 10));

            RuleFor(d => d.DeptName)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM020.DeptName))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM020.DeptName, 100));


        }
    }
}