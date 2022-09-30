using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    public class AbsenceNotPayModel
    {
        // Has permission
        public bool Editable { get; set; }
        // Validator, return validator of server to client jquery by validate() function ($scope.form.absenceNotPaySearchForm.validate())
        public object Validator { get; set; }
        // List of Company
        public List<KYCompanyDto> ListCompanies { get; set; }
        // List of Department
        public List<KYDepartmentDto> ListDepartments { get; set; }
        // CompanyId
        public int CompanyId { get; set; }
        // List of AbsenceDescription
        public string ListAbsenceDescriptions { get; set; }
        // List of LongtermAbsence
        public IEnumerable<object> ListLongtermAbsences { get; set; }
        // CompanyCd
        public string CompanyCd { get; set; }
    }
}