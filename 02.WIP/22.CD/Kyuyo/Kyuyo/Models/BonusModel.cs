using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    public class BonusModel
    {
        // Has permission
        public bool Editable { get; set; }
        // Validator, return validator of server to client jquery by validate() function ($scope.form.absenceNotPaySearchForm.validate())
        public object Validator { get; set; }
        // CompanyId
        public int CompanyId { get; set; }
        // CompanyCd
        public string CompanyCd { get; set; }
        // DefaultYearMonth
        public string DefaultYearMonth { get; set; }
        // List of Company
        public List<KYCompanyDto> ListCompanies { get; set; }
        // List of Currency
        public List<TBMSystemDto> ListCurrencies { get; set; }
        // List of OtherPay
        public IEnumerable<object> ListOtherPays { get; set; }
        // List of Description
        public IEnumerable<object> ListDescriptions { get; set; }
    }
}