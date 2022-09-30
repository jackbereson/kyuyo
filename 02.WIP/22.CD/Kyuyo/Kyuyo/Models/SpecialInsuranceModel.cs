using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    /// <summary>
    /// Class Model of SpecialInsurance
    /// </summary>
    public class SpecialInsuranceModel
    {
        // Has permission
        public bool Editable { get; set; }
        // CompanyCd
        public string CompanyCd { get; set; }
        // Validator
        public object Validator { get; set; }
        // AbsenceNo of SpecialInsurance
        public string AbsenceNo { get; set; }
        // AbsenceDescription of SpecialInsurance
        public string AbsenceDescription { get; set; }
        // EffectiveDt of SpecialInsurance
        public string EffectiveDt { get; set; }
        // List of SpecialInsuranceDto
        public List<SpecialInsuranceDto> ListSpeIn { get; set; }
    }
}