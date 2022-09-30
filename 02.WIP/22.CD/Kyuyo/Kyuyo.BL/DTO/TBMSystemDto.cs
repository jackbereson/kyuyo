using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class TBMSystemDto : BaseDto
    {
        public string CompanyCd { get; set; }
        public string Category { get; set; }
        public string Cd { get; set; }
        public string Value { get; set; }
        public string CharValue1 { get; set; }
        public string CharValue2 { get; set; }
        public string CharValue3 { get; set; }
        public decimal? NumValue1 { get; set; }
        public decimal? NumValue2 { get; set; }
        public decimal? NumValue3 { get; set; }
        public string Remark { get; set; }
        public int? ListOrder { get; set; }
        public bool ActiveFlag { get; set; }

    }
}
