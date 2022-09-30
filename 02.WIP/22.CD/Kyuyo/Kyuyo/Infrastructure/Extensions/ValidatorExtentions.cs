using FluentValidation;
using FluentValidation.Validators;
using Kyuyo.BL.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Kyuyo.Infrastructure.Extensions
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilderOptions<T, string> MaxLength<T>(this IRuleBuilder<T, string> ruleBuilder, int max)
        {
            return ruleBuilder.SetValidator(new MaxLengthValidator(max));
        }

        public static IRuleBuilderOptions<T, string> MinLength<T>(this IRuleBuilder<T, string> ruleBuilder, int min)
        {
            return ruleBuilder.SetValidator(new MinLengthValidator(min));
        }

        public static IRuleBuilderOptions<T, string> DateFormat<T>(this IRuleBuilder<T, string> ruleBuilder, string format)
        {
            return ruleBuilder.SetValidator(new DateFormatValidator(format));
        }

        public static IRuleBuilderOptions<T, string> DateFormat<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.SetValidator(new DateFormatValidator(null));
        }

        public static IRuleBuilderOptions<T, string> TimeFormat<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.SetValidator(new TimeFormatValidator());
        }

        public static IRuleBuilderOptions<T, string> Interger<T>(this IRuleBuilder<T, string> ruleBuilder, int length, bool negative = false)
        {
            return ruleBuilder.SetValidator(new IntergerValidator(length, negative));
        }

        public static IRuleBuilderOptions<T, string> Decimal<T>(this IRuleBuilder<T, string> ruleBuilder, int before, int after)
        {
            return ruleBuilder.SetValidator(new DecimalValidator(before, after));
        }

        public static IRuleBuilderOptions<T, string> Number<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.SetValidator(new NumberValidator());
        }

        public static IRuleBuilderOptions<T, string> NumberRange<T>(this IRuleBuilder<T, string> ruleBuilder, int from, int to)
        {
            return ruleBuilder.SetValidator(new NumberRangeValidator(from, to));
        }

        public static IRuleBuilderOptions<T, string> DateRange<T>(this IRuleBuilder<T, string> ruleBuilder, DateTime from, DateTime to)
        {
            return ruleBuilder.SetValidator(new DateRangeValidator(from, to));
        }

    }

    public class MaxLengthValidator : PropertyValidator
    {
        public int Max { get; private set; }

        public MaxLengthValidator(int max)
            : base("Max length validator")
        {
            this.Max = max;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;

            if (value != null && value.Length > Max)
            {
                return false;
            }

            return true;
        }
    }

    public class DateFormatValidator : PropertyValidator
    {
        public string Format { get; private set; }
        public DateFormatValidator(string format)
            : base("Date invalid.")
        {
            this.Format = format;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;

            if (string.IsNullOrEmpty(value))
            {
                return true;
            }

            DateTime date;
            if (DateTime.TryParseExact(value, Constant.DATE_FORMAT, 
                System.Globalization.CultureInfo.InvariantCulture, 
                System.Globalization.DateTimeStyles.None, out date))
            {
                return true;
            }

            return false;
        }
    }

    public class TimeFormatValidator : PropertyValidator
    {
        public TimeFormatValidator()
            : base("Time invalid HHmm.")
        {
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;

            if (string.IsNullOrEmpty(value))
            {
                return true;
            }

            var regex = @"^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$";
            var match = Regex.Match(value, regex, RegexOptions.IgnoreCase);

            return match.Success;
        }
    }

    public class MinLengthValidator : PropertyValidator
    {
        public int Min { get; private set; }

        public MinLengthValidator(int min)
            : base("Min length validator")
        {
            this.Min = min;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;

            if (value != null && value.Length < Min)
            {
                return false;
            }

            return true;
        }
    }

    public class IntergerValidator : PropertyValidator
    {
        public bool Negative { get; private set; }
        public int Length { get; private set; }

        public IntergerValidator(int length, bool negative)
            : base("Interger validator")
        {
            this.Negative = negative;
            this.Length = length;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;

            if (string.IsNullOrEmpty(value))
            {
                return true;
            }

            string reg = null;
            if (Negative)
            {
                reg = @"^-?\d{1,";
            } else
            {
                reg = @"\d{1,";
            }
            reg = reg + this.Length + "}";

            Regex regex = new Regex(reg);
            Match match = regex.Match(value);

            return match.Success && value.Equals(match.Value);
        }
    }

    public class DecimalValidator : PropertyValidator
    {
        public bool Negative { get; private set; }
        public int Before { get; private set; }
        public int After { get; private set; }

        public DecimalValidator(int before, int after)
            : base("Decimal validator")
        {
            this.Before = before;
            this.After = after;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;
            if (string.IsNullOrEmpty(value))
            {
                return true;
            }

            var point = value.IndexOf('.');
            string after, before;
            if (point >= 0)
            {
                after = value.Substring(point + 1);
                before = value.Substring(0, point);
            }
            else
            {
                before = value;
                after = "";
            }
            return DecimalFormat.IsDecimal(value) && before.Length <= this.Before && after.Length <= this.After;
        }
    }

    public class NumberValidator : PropertyValidator
    {

        public NumberValidator()
            : base("Number validator")
        {
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;
            if (string.IsNullOrEmpty(value))
            {
                return true;
            }

            return DecimalFormat.IsDecimal(value);
        }
    }

    public class NumberRangeValidator : PropertyValidator
    {
        public int From { get; private set; }
        public int To { get; private set; }

        public NumberRangeValidator(int from, int to)
            : base("InclusiveBetween validator")
        {
            this.From = from;
            this.To = to;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;
            if (string.IsNullOrEmpty(value))
            {
                return true;
            }
            var number = DecimalFormat.Parse(value);

            return number >= this.From && number <= this.To;
        }
    }

    public class DateRangeValidator : PropertyValidator
    {
        public DateTime From { get; private set; }
        public DateTime To { get; private set; }

        public DateRangeValidator(DateTime from, DateTime to)
            : base("InclusiveBetween validator")
        {
            this.From = from;
            this.To = to;
        }

        protected override bool IsValid(PropertyValidatorContext context)
        {
            var value = context.PropertyValue as string;
            if (string.IsNullOrEmpty(value))
            {
                return true;
            }
            var date = DateTimeFormat.ToDateTime(value) ?? DateTime.MinValue;
            return date >= this.From && date <= this.To;
        }
    }


}