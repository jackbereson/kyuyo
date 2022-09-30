using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class BaseDto
    {
        public int Id { get; set; }

        //public DateTime? CreateDt { get; set; }
        //public string CreatedBy { get; set; }

        public string UpdatedDt { get; set; }
        //public string UpdateBy { get; set; }
    }
}
