using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class ReportListDto : BaseDto
    {
        public string title { get; set; }
        public bool isSelected { get; set; }
        public string name { get; set; }
        public bool isCalByCanlendar { get; set; }
        
        public ReportListDto(string title)
        {
            this.title = title;
            this.isSelected = false;
            this.isCalByCanlendar = false;
        }
    }
}
