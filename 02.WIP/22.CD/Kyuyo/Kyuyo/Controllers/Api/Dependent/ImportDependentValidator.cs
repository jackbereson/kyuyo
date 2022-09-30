using FluentValidation;
using FluentValidation.Results;
using Kyuyo.BL;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.Dependent;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Extensions;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Dependent
{

    public class ImportDependentValidator : AbstractValidator<DependentDto>
    {
        // errorTaxCodeNotMatch
        private bool errorTaxCodeNotMatch;

        public ImportDependentValidator(int index)
        {
            CascadeMode = CascadeMode.StopOnFirstFailure;
            errorTaxCodeNotMatch = true;

            //.NotEmpty().WithMessage(string.Format(Messages.Required, StringsM011.Employee))
            //.MaxLength(10).WithMessage(string.Format(Messages.Maxlength, StringsM011.Employee, 10));

            RuleFor(r => r.EmployeeName)
               .NotEmpty().WithMessage(string.Format(MessagesM011.ErrorEmployeeNameEmpty, index))
               .Must((instance, value) => checkExistEmployee(instance)).WithMessage(string.Format(MessagesM011.ErrorEmpNotExist, index))
               .Must((instance, value) => getErrorTaxCodeNotMatch()).WithMessage(string.Format(MessagesM011.ErrorTaxCodeNotMatch, index));

            RuleFor(r => r.PersonalTaxCode)
               .NotEmpty().WithMessage(string.Format(MessagesM011.ErrorTaxCodeNotExist, index));

            RuleFor(r => r.Dependent)
               .NotEmpty().WithMessage(string.Format(MessagesM011.ErrorDependentEmpty, index))
               .MaxLength(100).WithMessage(string.Format(MessagesM011.ErrorDependentTooLong, index));

            When(r => !string.IsNullOrEmpty(r.BirthDt), () =>
               RuleFor(r => r.BirthDt).Must((instance, value) => checkBirthDTFormat(instance))
              .WithMessage(string.Format(MessagesM011.ErrorBirthDtFormatNotCorrect, index))
              .Must((instance, value) => ValidateOpts.CheckFuture(instance, DateTimeFormat.formatDateSys(instance.BirthDt,
               Constant.DATE_FORMAT_VN), DateTimeFormat.ToStringDate(DateTime.Now), allowEqual: true))
              .WithMessage(string.Format(MessagesM011.ErrorBirthDtIsFutureDt, index)));

            RuleFor(r => r.DependentTaxCode)
              .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorDependentTaxCodeToLong, index));

            RuleFor(r => r.Nationality)
             .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorNationarityTaxCodeToLong, index))
             .Must((instance, value) => checkExistNationality(instance))
             .WithMessage(string.Format(MessagesM011.ErrorNationarityNotExist, index));

            // IdPassport
            RuleFor(r => r.IdPassport)
             .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorIdPassportToLong, index));

            // Relationship
            RuleFor(r => r.Relationship)
            .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorRelationshipToLong, index))
            .Must((instance, value) => checkExistRelationship(instance))
            .WithMessage(string.Format(MessagesM011.ErrorRelationshipNotExist, index));

            // Number
            RuleFor(r => r.Number)
           .MaxLength(10).WithMessage(string.Format(MessagesM011.ErrorNumberToLong, index));

            // NumberBook
            RuleFor(r => r.NumberBook)
            .MaxLength(10).WithMessage(string.Format(MessagesM011.ErrorNumberBookToLong, index));

            // reg_country
            RuleFor(r => r.regCountry)
            .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorRegCountryToLong, index))
            .Must((instance, value) => checkExistRegCountry(instance))
            .WithMessage(string.Format(MessagesM011.ErrorRegCountryNotExist, index));

            // reg_city
            RuleFor(r => r.regCity)
            .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorRegCityToLong, index))
            .Must((instance, value) => checkExistRegCity(instance))
            .WithMessage(string.Format(MessagesM011.ErrorRegCityNotExist, index));

            // reg_district
            RuleFor(r => r.regDistrict)
            .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorRegDistrictToLong, index))
            .Must((instance, value) => checkExistRegDistrict(instance))
            .WithMessage(string.Format(MessagesM011.ErrorRegDistrictNotExist, index));

            // reg_ward
            RuleFor(r => r.regWard)
           .MaxLength(20).WithMessage(string.Format(MessagesM011.ErrorRegWardToLong, index))
           .Must((instance, value) => checkExistRegWard(instance))
           .WithMessage(string.Format(MessagesM011.ErrorRegWardNotExist, index));

            // FromMonth
            RuleFor(r => r.FromMonth)
            .NotEmpty().WithMessage(string.Format(MessagesM011.ErrorFromMonthEmpty, index))
            .Must((instance, value) => checkFromMonthFormat(instance))
            .WithMessage(string.Format(MessagesM011.ErrorFromMonthFormatNotCorrect, index, "FromMonth"));

            // ToMonth
            RuleFor(r => r.ToMonth)
           .NotEmpty().WithMessage(string.Format(MessagesM011.ErrorToMonthEmpty, index))
           .Must((instance, value) => checkToMonthFormat(instance))
           .WithMessage(string.Format(MessagesM011.ErrorToMonthFormatNotCorrect, index, "ToMonth"));

            When(r => !string.IsNullOrEmpty(r.FromMonth) && !string.IsNullOrEmpty(r.ToMonth), () =>
            RuleFor(r => r.ToMonth)
            .Must((instance, value) => ValidateOpts.CheckFuture(instance, DateTimeFormat.formatDateSys(instance.FromMonth, Constant.YEARMONTH_VN_FORMAT),
             DateTimeFormat.formatDateSys(instance.ToMonth, Constant.YEARMONTH_VN_FORMAT), allowEqual: true))
            .WithMessage(string.Format(MessagesM011.ErrorFromMonthIsFutureDt, index)));



        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="srcDate"></param>
        /// <returns></returns>
        private bool checkBirthDTFormat(DependentDto dto)
        {
            DateTime date;
            return DateTime.TryParseExact(dto.BirthDt, Constant.DATE_FORMAT_VN,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None, out date);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="srcDate"></param>
        /// <returns></returns>
        private bool checkFromMonthFormat(DependentDto dto)
        {
            DateTime date;
            return DateTime.TryParseExact(dto.FromMonth, Constant.YEARMONTH_VN_FORMAT,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None, out date);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="srcDate"></param>
        /// <returns></returns>
        private bool checkToMonthFormat(DependentDto dto)
        {
            DateTime date;
            return DateTime.TryParseExact(dto.ToMonth, Constant.YEARMONTH_VN_FORMAT,
                CultureInfo.InvariantCulture,
                DateTimeStyles.None, out date);
        }

        

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <returns></returns>
        private bool getErrorTaxCodeNotMatch()
        {
            return this.errorTaxCodeNotMatch;
        }

        /// <summary>
        /// checkExistEmployee
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistEmployee(DependentDto instance)
        {
            List<KYEmployeeDto> emps = new EmployeeBL().GetEmployeeByName(instance.EmployeeName);
            if (emps == null || emps.Count == 0)
            {
                return false;
            }
            else
            {
                String employeeNo = getEmployeeNo(emps, instance);
                if (string.IsNullOrEmpty(employeeNo))
                {
                    errorTaxCodeNotMatch = false;
                }
                else
                {
                    instance.EmployeeNo = employeeNo;
                }
                return true;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="emps"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        private string getEmployeeNo(List<KYEmployeeDto> emps, DependentDto dto)
        {
            string taxNo = dto.PersonalTaxCode;
            // check PERSONAL_TAX_CODE
            foreach (KYEmployeeDto empDto in emps)
            {
                if (taxNo.Equals(empDto.PersonalTaxCode))
                {
                    return emps[0].EmployeeNo;
                }
            }
            return "";
        }

        /// <summary>
        /// checkBirthDt
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkBirthDt(DependentDto instance)
        {
            DateTime today = DateTime.Today;
            DateTime birthDt = DateTime.ParseExact(instance.BirthDt, Constant.DATE_FORMAT, System.Globalization.CultureInfo.InvariantCulture);
            if (birthDt.CompareTo(today) > 0)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// checkExistRelationship
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistRelationship(DependentDto instance)
        {
            TBMSystemDto dto = new CommonBL().getMSystem(instance.CompanyCd, Constant.RELATIONSHIP, instance.Relationship);
            if (dto == null)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// checkExistRegCountry
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistRegCountry(DependentDto instance)
        {
            TBMSystemDto dto = new CommonBL().getMSystem(instance.CompanyCd, Constant.COUNTRY, instance.regCountry);
            if (dto == null)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// checkExistRegCity
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistRegCity(DependentDto instance)
        {
            TBMSystemDto dto = new CommonBL().getMSystem(instance.CompanyCd, Constant.CITY , instance.regCity);
            if (dto == null)
            {
                return false;
            }
            return true;
        }


        /// <summary>
        /// checkExistRegDistrict
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistRegDistrict(DependentDto instance)
        {
            TBMSystemDto dto = new CommonBL().getMSystem(instance.CompanyCd, Constant.DISTRICT, instance.regDistrict);
            if (dto == null)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// checkExistRegWard
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistRegWard(DependentDto instance)
        {
            TBMSystemDto dto = new CommonBL().getMSystem(instance.CompanyCd, Constant.WARD, instance.regWard);
            if (dto == null)
            {
                return false;
            }
            return true;
        }



        /// <summary>
        /// checkExistNationality
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        private bool checkExistNationality(DependentDto instance)
        {
            TBMSystemDto dto = new CommonBL().getMSystem(instance.CompanyCd, Constant.COUNTRY, instance.Nationality);
            if (dto == null)
            {
                return false;
            }
            return true;
        }

    }


}