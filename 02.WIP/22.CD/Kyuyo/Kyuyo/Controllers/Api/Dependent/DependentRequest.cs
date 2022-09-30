using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Dependent
{
    public class DependentRequest: RequestBase
    {
        public DependentRequest()
        {
            this.validator = new DepentdentValidator();
        }
        public int? Id { get; set; }
        public string EmployeeNo { get; set; }
        public string Dependent { get; set; }
        public string Depentdent { get; set; }
        public string BirthDt { get; set; }
        public string Number { get; set; }
        public string NumberBook { get; set; }
        public string DependentTaxCode { get; set; }
        public string IdPassport { get; set; }
        public string Relationship { get; set; }
        public string Nationality { get; set; }
        public string FromMonth { get; set; }
        public string ToMonth { get; set; }
        public string UpdatedDt { get; set; }
        public string regCountry { get; set; }
        public string regCity { get; set; }
        public string regDistrict { get; set; }
        public string regWard { get; set; }
        public bool IdPassportFlag { get; set; }
        public string CompanyCd { get; set; }
      
    }

    public class DependentSearchRequest : RequestBase
    {

        public DependentSearchRequest()
        {
            this.validator = new DependentSearchValidator();
        }

        public string CompanyCd { get; set; }
        public string DeptCd { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
    }

}