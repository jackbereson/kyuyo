using Kyuyo.BL.DTO;
using System.Collections.Generic;

namespace Kyuyo.Models
{
    public class ReportListModel
    {
        public bool Editable { get; set; }
        public object Validator { get; set; }
        public List<ReportListDto> ReportLists { get; set; }
}
}