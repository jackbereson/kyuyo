using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentValidation;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.WorkingTimeChangeRefer;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Utils;

namespace Kyuyo.Controllers.Api.WorkingTimeChangeRefer
{
    /// <summary>
    /// WorkingTimeChangeRefer Validator
    /// </summary>
    public class WorkingTimeChangeReferValidator : AbstractValidator<WorkingTimeChangeReferRequest>
    {
        public WorkingTimeChangeReferValidator()
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.YearMonth)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM018.MonthYear));
            RuleFor(r => r.Month)
               .NotEmpty().WithMessage(string.Format(Messages.Required, StringsM018.MonthCalSalary));
        }
    }

    /// <summary>
    /// WorkingTimeChangeRefer Import Validator
    /// </summary>
    public class WorkingTimeChangeReferImportValidator : AbstractValidator<WorkingTimeChangeReferDto>
    {
        public WorkingTimeChangeReferImportValidator(int index, List<KYEmployeeDto> emps, List<TBMSystemDto> workingTypes)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(r => r.EmployeeNo)
               .NotEmpty().WithMessage(string.Format(MessagesM018.ErrorEmpEmpty, index))
               .Must((instance, value) => checkExistEmployee(instance, emps)).WithMessage(string.Format(MessagesM018.ErrorEmpNotExist, index));

            RuleFor(r => r.WorkingDateStr)
                .NotEmpty().WithMessage(string.Format(MessagesM018.ErrorWorkingDateNotExist, index))
                .DateFormat(Constant.DATE_FORMAT).WithMessage(string.Format(MessagesM018.ErrorWorkingDateFormatWrong, index));

            RuleFor(r => r.TotalOtDifference)
                .Number().WithMessage(string.Format(MessagesM018.ErrorTotalOtDifNotNumber, index))
                .Must((instance, value) => Parse(instance.TotalOtDifference) + Parse(instance.NoSalaryHourDifference) <= 24)
                .WithMessage(string.Format(MessagesM018.ErrorTotalOtAndNoSalaryHourNotValid, index));

            RuleFor(r => r.TotalOtLateDifference)
                .Number().WithMessage(string.Format(MessagesM018.ErrorTotalOtLateDifNotNumber, index))
                .Must((instance, value) => compare(instance.TotalOtLateDifference, instance.TotalOtDifference))
                .WithMessage(string.Format(MessagesM018.ErrorTotalOtLateLargerThanTotalOt, index))
                .Must((instance, value) => compare(instance.TotalOtLateDifference, instance.TotalLateDifference))
                .WithMessage(string.Format(MessagesM018.ErrorTotalOtLateLargerThanTotalLate, index));
             

            RuleFor(r => r.TotalLateDifference)
                .Number().WithMessage(string.Format(MessagesM018.ErrorTotalLateDifNotNumber, index))
                .Must((instance, value) => Parse(instance.TotalLateDifference) + Parse(instance.NoSalaryHourDifference) <= 24)
                .WithMessage(string.Format(MessagesM018.ErrorTotalLateAndNoSalaryHourNotValid, index));

            RuleFor(r => r.NoSalaryHourDifference)
                .Number().WithMessage(string.Format(MessagesM018.ErrorNoSalaryHourDiffNotNumber, index));

            RuleFor(r => r.WkDateTypeFileExcel)
                .Must((instance, value) => checkExistWkDateTypeFileExcel(instance, workingTypes)).WithMessage(string.Format(MessagesM018.ErrorWkDateTypeFileExcelNotExist, index));

       

        }

        public WorkingTimeChangeReferImportValidator()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="num1"></param>
        /// <param name="num2"></param>
        /// <returns></returns>
        private bool compare(String num1, String num2)
        {
            Decimal? number1 = DecimalFormat.Parse(num1);
            Decimal? number2 = DecimalFormat.Parse(num2);

            number1 = number1 == null ? 0 : number1;
            number2 = number2 == null ? 0 : number2;
            
            if(number1 > number2)
            {
                return false; 
            }
            return true;
            
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="num1"></param>
        /// <returns></returns>
        private Decimal? Parse(String num1)
        {
            Decimal? number1 = DecimalFormat.Parse(num1);
            return number1 == null ? 0 : number1;
        }

        /// <summary>
        /// check empNo
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="emps"></param>
        /// <returns></returns>
        private bool checkExistEmployee(WorkingTimeChangeReferDto dto, List<KYEmployeeDto> emps)
        {
            foreach(KYEmployeeDto emp in emps)
            {
                if(emp.EmployeeNoPE.Equals(dto.EmployeeNo))
                {
                    dto.EmployeeNoPe = emp.EmployeeNoPE;
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// check WkDateTypeFileExcel
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="emps"></param>
        /// <returns></returns>
        private bool checkExistWkDateTypeFileExcel(WorkingTimeChangeReferDto dto, List<TBMSystemDto> workingTypes)
        {
            foreach (TBMSystemDto tbm in workingTypes)
            {
                if (tbm.Value.Equals(dto.WkDateTypeFileExcel))
                {
                    return true;
                }
            }
            return false;
        }
    }
}