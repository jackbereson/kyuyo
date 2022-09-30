using FluentValidation;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources.ImportWorkingTime;
using Kyuyo.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.ImportWorkingTime
{
    public class WorkingTimeDtoValidator : AbstractValidator<KYWorkingTimeDto>
    {
        public WorkingTimeDtoValidator (int index, List<TBMSystemDto> listWTType, List<TBMSystemDto> listWorkingType,
                    List<TBMSystemDto> listSpecialType, List<TBMSystemDto> listShift, List<TBMSystemDto> listConfirmStatus, List<DateTime> rangeSalary)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;

            // EMPLOYEE_NO
            //RuleFor(r => r.EmployeeNo)
            //    .NotEmpty(). WithMessage(string.Format(MessagesM015.Required, index, StringsM015.EmployeeNo));

            // WORKING_DATE
            RuleFor(r => r.WorkingDate)
                .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.WorkingDate))
                .DateFormat().WithMessage(string.Format(MessagesM015.FormatDate, index, StringsM015.WorkingDate))
                .DateRange(rangeSalary[0], rangeSalary[1]).WithMessage(string.Format(MessagesM015.DateRange, index));

            // ACT_IN_TIME
            RuleFor(r => r.ActInTime)
                .TimeFormat().WithMessage(string.Format(MessagesM015.FormatTime, index, StringsM015.ActInTime));

            RuleFor(r => r.ActOutTime)
                .TimeFormat().WithMessage(string.Format(MessagesM015.FormatTime, index, StringsM015.ActOutTime));

            RuleFor(r => r.WorkingTime)
                .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.WorkingTime))
                .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.WorkingTime));

            RuleFor(r => r.AbsenceTime)
                .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.AbsenceTime))
                .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.AbsenceTime));

            RuleFor(r => r.TotalOtTime)
                .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.TotalOtTime))
                .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.TotalOtTime));

            RuleFor(r => r.LateOtTime)
                .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.LateOtTime))
                .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.LateOtTime));

            RuleFor(r => r.TotalLateTime)
                .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.TotalLateTime))
                .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.TotalLateTime));

            RuleFor(r => r.DeductedUnpaind)
               .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.DeductedUnpaind))
               .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.DeductedUnpaind));

            RuleFor(r => r.DeductedPaid)
               .Number().WithMessage(string.Format(MessagesM015.FormatNumber, index, StringsM015.DeductedPaid))
               .NumberRange(0, 1).WithMessage(string.Format(MessagesM015.MaxDays, index, StringsM015.DeductedPaid));

            RuleFor(r => r.AttendanceType)
               .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.AttendanceType))
               .Must(value => listWTType.FirstOrDefault(a => a.Cd == value) != null).WithMessage(string.Format(MessagesM015.NotExist, index, StringsM015.AttendanceType));

            RuleFor(r => r.WorkingType)
                .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.WorkingType))
                .Must(value => listWorkingType.FirstOrDefault(a => a.Cd == value) != null).WithMessage(string.Format(MessagesM015.NotExist, index, StringsM015.WorkingType));

            RuleFor(r => r.SpecialType)
                .Must((instance, value) =>  !"S".Equals(instance.AttendanceType) || ("S".Equals(instance.AttendanceType) && !string.IsNullOrEmpty(value))).WithMessage(string.Format(MessagesM015.RequiredSpecialType, index))
                .Must(value => string.IsNullOrEmpty(value) || listSpecialType.FirstOrDefault(a => a.Cd == value) != null).WithMessage(string.Format(MessagesM015.NotExist, index, StringsM015.SpecialType));

            RuleFor(r => r.MainShift)
                .Must(value => string.IsNullOrEmpty(value) || listShift.FirstOrDefault(a => a.Cd == value) != null).WithMessage(string.Format(MessagesM015.NotExist, index, StringsM015.MainShift));

            RuleFor(r => r.StdInTime)
                 .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.StdInTime))
                 .TimeFormat().WithMessage(string.Format(MessagesM015.FormatTime, index, StringsM015.StdInTime));

            RuleFor(r => r.StdOutTime)
                 .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.StdOutTime))
                 .TimeFormat().WithMessage(string.Format(MessagesM015.FormatTime, index, StringsM015.StdOutTime));

            RuleFor(r => r.StdWorkHour)
                 .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.StdWorkHour))
                 .NumberRange(0, 24).WithMessage(string.Format(MessagesM015.MaxTimes, index, StringsM015.StdWorkHour));

            RuleFor(r => r.Status)
                 .NotEmpty().WithMessage(string.Format(MessagesM015.Required, index, StringsM015.Status))
                 .Must(value => listConfirmStatus.FirstOrDefault(a => a.Cd == value) != null).WithMessage(string.Format(MessagesM015.NotExist, index, StringsM015.Status));


        }
    }
}