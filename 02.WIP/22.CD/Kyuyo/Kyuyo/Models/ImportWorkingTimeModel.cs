using Kyuyo.BL.DTO;
using System.Collections.Generic;

namespace Kyuyo.Models
{
    public class ImportWorkingTimeModel
    {
        public List<KYCompanyDto> ListCompany { get; set; }
        public int CompanyId { get; set; }
        public object Validator { get; set; }
        public string YearMonth { get; set; }
        public bool IsDisable { get; set; }
    }
}