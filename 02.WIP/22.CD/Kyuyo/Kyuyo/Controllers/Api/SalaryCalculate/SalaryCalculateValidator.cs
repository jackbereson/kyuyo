using FluentValidation;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.SalaryCalculate;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.SalaryCalculate
{
    public class SalaryCalculateValidator : AbstractValidator<SalaryCalculateRequest>
    {
        public SalaryCalculateValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.Company));

            RuleFor(r => r.YearMonth)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.MonthYear))
                .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM017.MonthYear));

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.Employee));

            RuleFor(r => r.Status)
                .MaxLength(50).WithMessage(string.Format(Messages.Maxlength, StringsM017.Status, 50));

            RuleFor(r => r.Other)
                .InclusiveBetween(0, 999999999).WithMessage(MessagesM017.MaxOther);

            RuleFor(r => r.OtherUnit)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.OtherUnit));

            RuleFor(r => r.OtherRemark)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.OtherPayDescription))
                .MaxLength(100).WithMessage(string.Format(Messages.Maxlength, StringsM017.OtherPayDescription, 100));

            RuleFor(r => r.Sabbtical100)
                .InclusiveBetween(0, 99).WithMessage(string.Format(MessagesM017.MaxSabbtical, StringsM017.NumDayCal100));

            RuleFor(r => r.Sabbtical300)
                 .InclusiveBetween(0, 99).WithMessage(string.Format(MessagesM017.MaxSabbtical, StringsM017.NumDayCal300));

        }
    }

    public class SalaryCalculateSearchValidator : AbstractValidator<SalaryCalculateSearchRequest>
    {
        public SalaryCalculateSearchValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.Company));

            RuleFor(r => r.YearMonth)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.MonthYear))
                .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM017.MonthYear));
        }
    }

    /// <summary>
    /// Validator Input of SalaryCalculate
    /// </summary>
    public class SalaryCalculateInputValidator : AbstractValidator<SalaryCalculateInputRequest>
    {
        public SalaryCalculateInputValidator(List<TBMSystemDto> listCurrencies)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.CompanyId)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.Company));

            RuleFor(r => r.YearMonth)
                .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.MonthYear))
                .DateFormat(Strings.MonthYearFormat).WithMessage(string.Format(Messages.DateFormat, StringsM017.MonthYear));

            RuleFor(r => r.USDRate)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.USD))
               .InclusiveBetween(0, 999999999).WithMessage(MessagesM017.MaxRate, StringsM017.USD)
               .Must((instance, value) => CheckUSDRate(instance)).WithMessage(string.Format(MessagesM017.DataTypeUSDRate, StringsM017.USD));

            RuleFor(r => r.USDEffectiveDt)
              .NotEmpty().WithMessage(string.Format(MessagesM017.ErrorEffectiveDt, StringsM017.USD));

            RuleFor(r => r.JPYRate)
              .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM017.JPY))
              .InclusiveBetween(0, 999999999).WithMessage(MessagesM017.MaxRate, StringsM017.JPY)
              .Must((instance, value) => CheckJPYRate(listCurrencies, instance)).WithMessage(string.Format(MessagesM017.DataTypeJPYRate, StringsM017.JPY));

            RuleFor(r => r.JPYEffectiveDt)
              .NotEmpty().WithMessage(string.Format(MessagesM017.ErrorEffectiveDt, StringsM017.JPY));
        }

        /// <summary>
        /// Check Point of USDRate
        /// </summary>
        /// <param name="listCurrencies"></param>
        /// <param name="otherPayDto"></param>
        /// <returns></returns>
        private bool CheckUSDRate(SalaryCalculateInputRequest request)
        {
            var usdRate = request.USDRate.ToString();
            var percison = 0;
            try
            {
                percison = usdRate.Split(',').Select(int.Parse).ElementAt(1);
            }
            catch
            {
                // Do not thing
            }
            if (percison > 0)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Check Point of JPYRate
        /// </summary>
        /// <param name="listCurrencies"></param>
        /// <param name="otherPayDto"></param>
        /// <returns></returns>
        private bool CheckJPYRate(List<TBMSystemDto> listCurrencies, SalaryCalculateInputRequest request)
        {
            var currency = listCurrencies.FirstOrDefault(a => a.Value == "JPY");
            var numValue1 = currency.NumValue1.ToString().Split(',').Select(int.Parse).ElementAt(1);
            var percison = 0;
            try
            {
                percison = request.JPYRate.ToString().Split(',').Select(int.Parse).ElementAt(1);
            }
            catch
            {
                // Do not thing
            }
            if (percison > numValue1)
            {
                return false;
            }

            return true;
        }
    }
}