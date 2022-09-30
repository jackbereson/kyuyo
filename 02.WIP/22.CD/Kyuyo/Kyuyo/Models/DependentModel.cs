using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;

namespace Kyuyo.Models
{
    public class DependentModel
    {
        public bool Editable { get; set; }
        public string CompanyCd { get; set; }
        public List<KYCompanyDto> ListCompany { get; set; }
        public List<KYDepartmentDto> ListDept { get; set; }
        public object Validator { get; set; }
    }
}