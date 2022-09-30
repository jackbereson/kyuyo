using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    public class ImportDependentModel
    {
        public bool Editable { get; set; }
        public string CompanyCd { get; set; }
        public List<KYCompanyDto> ListCompany { get; set; }
        public List<KYDepartmentDto> ListDept { get; set; }
        public object Validator { get; set; }
    }
}