using FluentValidation;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources.Salary;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Salary
{
    public class KYSalaryDtoValidator : AbstractValidator<SalaryImport>
    {

        private const int MAX_SALARY = 999999999;
        private const int MAX_RATE = 9999999;

        /// <summary>
        /// Validate Import muc luong
        /// </summary>
        /// <param name="index">The index.</param>
        /// <param name="listEmp">The list emp.</param>
        /// <param name="listSalaryFormular">The list salary formular.</param>
        /// <param name="listUnit">The list unit.</param>
        /// <param name="listAllowance">The list allowance.</param>
        /// <param name="listOtType">Type of the list ot.</param>
        public KYSalaryDtoValidator(int index, List<KYEmployeeDto> listEmp, List<KYSalaryFormulaDto> listSalaryFormular, List<TBMSystemDto> listUnit,
                    List<KYAllowanceDto> listAllowance, List<TBMSystemDto> listOtType)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(s => s.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.EmployeeNo))
                .Must(value => listEmp.Exists(e => e.EmployeeNo == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.EmployeeNo));

            RuleFor(s => s.Unit)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.UnitCur))
                .Must(value => listUnit.Exists(e => e.Cd == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.UnitCur));

            RuleFor(s => s.BasicSalaryOffical)
                .Must((intance, value) => intance.ProductSalary == Constant.FLAG_YES || (!string.IsNullOrEmpty(intance.SalaryHour) && !string.IsNullOrEmpty(value)))
                    .WithMessage(string.Format(MessagesM012.RequiredSalary, index))
                .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.BasicSalaryOffical))
                .Must((intantce, value) => checkPointLength(value, listUnit.FirstOrDefault(a => a.Cd == intantce.Unit)))
                    .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.BasicSalaryOffical))
                .NumberRange(0, MAX_SALARY).WithMessage(string.Format(MessagesM012.MaxNumber1, index, StringsM012.BasicSalaryOffical));

            RuleFor(s => s.BasicSalaryProbasion)
                .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.ProbationSalary))
                .Must((intantce, value) => checkPointLength(value, listUnit.FirstOrDefault(a => a.Cd == intantce.Unit)))
                    .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.ProbationSalary))
                .NumberRange(0, MAX_SALARY).WithMessage(string.Format(MessagesM012.MaxNumber1, index, StringsM012.ProbationSalary));

            RuleFor(s => s.SalaryCalSocialInsu)
                .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.InsuranceCalSalary))
                .Must((intantce, value) => checkPointLength(value, listUnit.FirstOrDefault(a => a.Cd == intantce.Unit)))
                    .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.InsuranceCalSalary))
                .NumberRange(0, MAX_SALARY).WithMessage(string.Format(MessagesM012.MaxNumber1, index, StringsM012.InsuranceCalSalary));

            RuleFor(s => s.ExchangeRateSocialInsuSal)
                .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.InsuranceCalSalaryRate))
                .Must(value => checkPointLength(value, 0))
                    .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.InsuranceCalSalaryRate))
                .NumberRange(0, MAX_RATE).WithMessage(string.Format(MessagesM012.MaxNumber2, index, StringsM012.InsuranceCalSalaryRate))
                .Must((intance, value) => intance.Unit == Constant.UNIT_VND || !string.IsNullOrEmpty(value))
                    .WithMessage(string.Format(MessagesM012.Required, index, StringsM012.InsuranceCalSalaryRate));

            RuleFor(s => s.SalaryHour)
               .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.SalaryHour))
               .Must((intantce, value) => checkPointLength(value, listUnit.FirstOrDefault(a => a.Cd == intantce.Unit)))
                   .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.SalaryHour))
               .NumberRange(0, MAX_SALARY).WithMessage(string.Format(MessagesM012.MaxNumber1, index, StringsM012.SalaryHour));

            RuleFor(s => s.BankAccount)
                .MaxLength(20).WithMessage(string.Format(MessagesM012.MaxLength, index, StringsM012.BankAccount, 20));

            RuleFor(s => s.BankName)
                 .MaxLength(200).WithMessage(string.Format(MessagesM012.MaxLength, index, StringsM012.BankName, 200));

            RuleFor(s => s.SalaryUnit)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.SalaryUnit))
                .Must(value => listUnit.Exists(e => e.Cd == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.SalaryUnit));

            RuleFor(s => s.ProductSalary)
                .Must(value => string.IsNullOrEmpty(value) || value.Equals(Constant.FLAG_YES) || value.Equals(Constant.FLAG_NO))
                    .WithMessage(string.Format(MessagesM012.ProductSalary, index));

            RuleFor(s => s.Allowance)
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => listAllowance.Exists(b => b.AllowanceCd == a)))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.AllowanceList));

            RuleFor(s => s.AllowanceStartDt)
                .Must((intance, value) => CheckRequiredAllowanceStartDt(intance, value)).WithMessage(string.Format(MessagesM012.ListDate, index, StringsM012.AllowanceStartDt))
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => !string.IsNullOrEmpty(a)))
                   .WithMessage(string.Format(MessagesM012.Required, index, StringsM012.AllowanceStartDt))
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => new DateTimeFormat().IsValid(a)))
                   .WithMessage(string.Format(MessagesM012.DateFormat, index, StringsM012.AllowanceStartDt));

            RuleFor(s => s.AllowanceEndDt)
                .Must((intance, value) => CheckRequiredAllowanceEndDt(intance, value)).WithMessage(string.Format(MessagesM012.ListDate, index, StringsM012.AllowanceEndDt))
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => new DateTimeFormat().IsValid(a)))
                   .WithMessage(string.Format(MessagesM012.DateFormat, index, StringsM012.AllowanceEndDt));

            RuleFor(s => s.OtType)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.TypeOT))
                .Must(value => listOtType.Exists(e => e.Cd == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.TypeOT));

            RuleFor(s => s.FormulaCd)
               .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.SalaryFormular))
               .Must(value => listSalaryFormular.Exists(e => e.FormulaCd == value))
                   .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.SalaryFormular));

            RuleFor(s => s.EffectiveDt)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.EffectiveDt))
                .DateFormat().WithMessage(string.Format(MessagesM012.DateFormat, index, StringsM012.EffectiveDt));

        }

        /// <summary>
        /// Validate Import muc luong moi
        /// </summary>
        /// <param name="index">The index.</param>
        /// <param name="listEmp">The list emp.</param>
        /// <param name="listUnit">The list unit.</param>
        /// <param name="listAllowance">The list allowance.</param>
        /// <param name="listOtType">Type of the list ot.</param>
        public KYSalaryDtoValidator(int index, List<KYEmployeeDto> listEmp, List<TBMSystemDto> listUnit,
                    List<KYAllowanceDto> listAllowance, List<TBMSystemDto> listOtType)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(s => s.EmployeeNo)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.EmployeeNo))
                .Must(value => listEmp.Exists(e => e.EmployeeNo == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.EmployeeNo));

            RuleFor(s => s.Unit)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.UnitCur))
                .Must(value => listUnit.Exists(e => e.Cd == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.UnitCur));

            RuleFor(s => s.BasicSalaryOffical)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.BasicSalaryOffical))
                .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.BasicSalaryOffical))
                .Must((intantce, value) => checkPointLength(value, listUnit.FirstOrDefault(a => a.Cd == intantce.Unit)))
                    .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.BasicSalaryOffical))
                .NumberRange(0, MAX_SALARY).WithMessage(string.Format(MessagesM012.MaxNumber1, index, StringsM012.BasicSalaryOffical));

            RuleFor(s => s.SalaryCalSocialInsu)
                .Number().WithMessage(string.Format(MessagesM012.Number, index, StringsM012.InsuranceCalSalary))
                .Must((intantce, value) => checkPointLength(value, listUnit.FirstOrDefault(a => a.Cd == intantce.Unit)))
                    .WithMessage(string.Format(MessagesM012.PointLength, index, StringsM012.InsuranceCalSalary))
                .NumberRange(0, MAX_SALARY).WithMessage(string.Format(MessagesM012.MaxNumber1, index, StringsM012.InsuranceCalSalary));

             RuleFor(s => s.Allowance)
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => listAllowance.Exists(b => b.AllowanceCd == a)))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.AllowanceList));

            RuleFor(s => s.AllowanceStartDt)
                .Must((intance, value) => CheckRequiredAllowanceStartDt(intance, value)).WithMessage(string.Format(MessagesM012.ListDate, index, StringsM012.AllowanceStartDt))
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => !string.IsNullOrEmpty(a)))
                   .WithMessage(string.Format(MessagesM012.Required, index, StringsM012.AllowanceStartDt))
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => new DateTimeFormat().IsValid(value)))
                   .WithMessage(string.Format(MessagesM012.DateFormat, index, StringsM012.AllowanceStartDt));

            RuleFor(s => s.AllowanceEndDt)
                .Must((intance, value) => CheckRequiredAllowanceEndDt(intance, value)).WithMessage(string.Format(MessagesM012.ListDate, index, StringsM012.AllowanceEndDt))
                .Must(value => string.IsNullOrEmpty(value) || value.Split(',').All(a => new DateTimeFormat().IsValid(value)))
                   .WithMessage(string.Format(MessagesM012.DateFormat, index, StringsM012.AllowanceStartDt));

            RuleFor(s => s.OtType)
                .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.TypeOT))
                .Must(value => listOtType.Exists(e => e.Cd == value))
                    .WithMessage(string.Format(MessagesM012.NotExist, index, StringsM012.TypeOT));

            RuleFor(s => s.EffectiveDt)
               .NotEmpty().WithMessage(string.Format(MessagesM012.Required, index, StringsM012.EffectiveDt))
               .DateFormat().WithMessage(string.Format(MessagesM012.DateFormat, index, StringsM012.EffectiveDt));

        }

        private bool checkPointLength(string value, TBMSystemDto unit)
        {
            if(unit == null)
            {
                return true;
            }
            return checkPointLength(value, (int)unit.NumValue1);
        }

        private bool checkPointLength(string value, int length)
        {
            var split = value.Split('.');
            if (split.Length < 2)
            {
                return true;
            }
            return split[1].Length <= length;
        }

        private bool CheckRequiredAllowanceStartDt(SalaryImport intance, string value)
        {
            if (!string.IsNullOrEmpty(intance.Allowance) && !string.IsNullOrEmpty(value))
            {
                return intance.Allowance.Split(',').Length == value.Split(',').Length;
            }
            else if (string.IsNullOrEmpty(intance.Allowance) && string.IsNullOrEmpty(value))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private bool CheckRequiredAllowanceEndDt(SalaryImport intance, string value)
        {
            if (!string.IsNullOrEmpty(intance.Allowance))
            {
                var countAllowance = intance.Allowance.Split(',').Length;
                // t/h co 1 tro cap -> Allowance allow null
                if(countAllowance == 1 && string.IsNullOrEmpty(value))
                {
                    return true;
                }
                else if (string.IsNullOrEmpty(value))
                {
                    return false;
                }
                else
                {
                    return countAllowance == value.Split(',').Length;
                }
            }
            else if (string.IsNullOrEmpty(intance.Allowance) && string.IsNullOrEmpty(value))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}