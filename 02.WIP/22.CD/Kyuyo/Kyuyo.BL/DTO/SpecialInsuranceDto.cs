using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class SpecialInsuranceDto : BaseDto
    {
        public int Id { get; set; }
        public string AbsenceNo { get; set; }
        public string AbsenceDescription { get; set; }
        //public string InsuRate { get; set; }
        public string EffectiveDt { get; set; }
    }
}
