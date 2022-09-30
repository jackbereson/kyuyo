using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class DependentDto : BaseDto
    {
        public string EmployeeName { get; set; }
        public string EmployeeNo { get; set; }
        public string Dependent { get; set; }
        public string BirthDt { get; set; }
        public string DependentTaxCode { get; set; }
        public string IdPassport { get; set; }
        public string Number { get; set; }
        public string NumberBook { get; set; }
        public string Relationship { get; set; }
        public string Nationality { get; set; }
        public string FromMonth { get; set; }
        public string ToMonth { get; set; }
        // MST Employee Tax Code
        public string PersonalTaxCode { get; set; }
        public string regCountry { get; set; }
        public string regCity { get; set; }
        public string regDistrict { get; set; }
        public string regWard { get; set; }
        public string updateBy { get; set; }
        public string CompanyCd { get; set; }
        public int? MainId { get; set; }
        public int? HisNo { get; set; }
    }
}
