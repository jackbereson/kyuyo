using System.Collections.Generic;
using Kyuyo.BL.DTO;

namespace Kyuyo.Models
{
    public class SalaryCalculateModel
    {
        public List<KYCompanyDto> ListCompany { get; set; }
        public Dictionary<int, string[]> AccessRoles { get; set; }
        public List<TBMSystemDto> ListUnit { get; set; }
        public string ClosingTxt { get; set; }
        public object SearchValidator { get; set; }
        public object Validator { get; set; }
    }
}