using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.SpecialInsurance
{

    public class SpecialInsuranceRequest : RequestBase
    {
        public SpecialInsuranceRequest()
        {
            this.validator = new SpecialInsuranceValidator();
        }

        public int? Id { get; set; }
        public string CompanyCd { get; set; }
        public string AbsenceDescriptionSearch { get; set; }
        public string EffectiveDtFrom { get; set; }
        public string EffectiveDtTo { get; set; }
        public string AbsenceNo { get; set; }
        public string AbsenceDescription { get; set; }
        public string InsuRate { get; set; }
        public bool DeleteFlag { get; set; }
        public string EffectiveDt { get; set; }
        public string UpdateDt { get; set; }
        public string UpdateBy { get; set; }
    }
}