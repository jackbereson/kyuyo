using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    public class WorkingTimeChangeReferModel
    {
        // Has permission
        public bool Editable { get; set; }
        // Validator, return validator of server to client jquery by validate() function ($scope.form.absenceNotPaySearchForm.validate())
        public object Validator { get; set; }
        // CompanyId
        public int CompanyId { get; set; }
        // CompanyCd
        public string CompanyCd { get; set; }
        // FirstDay of Salary period
        public string FirstDaySalary { get; set; }
        // List of Company
        public List<KYCompanyDto> ListCompanies { get; set; }
    }
}