using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using FluentValidation.Results;
using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Bonus;

using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using System.Globalization;


namespace Kyuyo.Controllers.Api.Bonus
{
    /// <summary>
    /// Import Bonus Validator
    /// </summary>
    public class ImportBonusValidator : AbstractValidator<OtherPayDto>
    {
        /// <summary>
        /// ImportBonusValidator
        /// </summary>
        /// <param name="index"></param>
        public ImportBonusValidator(int index, List<TBMSystemDto> listCurrencies)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(MessagesM014.Required, index, StringsM014.EmployeeNo))
                .MaxLength(10).WithMessage(string.Format(MessagesM014.MaxEmployeeCode, index, StringsM014.EmployeeNo));

            RuleFor(r => r.Unit)
                .NotEmpty().WithMessage(string.Format(MessagesM014.Required, index, StringsM014.Unit))
                .Must(value => listCurrencies.FirstOrDefault(a => a.Value == value) != null).WithMessage(string.Format(MessagesM014.ErrorExist, index, StringsM014.Unit));

            RuleFor(r => r.Value)
               .NotEmpty().WithMessage(string.Format(MessagesM014.Required, index, StringsM014.Value))
               .Number().WithMessage(string.Format(MessagesM014.FormatNumber, index, StringsM014.Value))
               .NumberRange(0, 999999999).WithMessage(string.Format(MessagesM014.MaxNumber, index, StringsM014.Value))
               .Must((instance, value) => CheckDecimal(listCurrencies, instance)).WithMessage(string.Format(MessagesM014.IsValidDecimal, index, StringsM014.Value));

        }

        /// <summary>
        /// Check Point of Decimal
        /// </summary>
        /// <param name="listCurrencies"></param>
        /// <param name="otherPayDto"></param>
        /// <returns></returns>
        private bool CheckDecimal(List<TBMSystemDto> listCurrencies, OtherPayDto otherPayDto)
        {
            var currency = listCurrencies.FirstOrDefault(a => a.Value == otherPayDto.Unit);
            var numValue1 = currency.NumValue1.ToString().Split(',').Select(int.Parse).ElementAt(1);
            var percison = 0;
            try
            {
                percison = otherPayDto.Value.Split('.').Select(int.Parse).ElementAt(1);
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