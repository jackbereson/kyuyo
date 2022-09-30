using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    /// <summary>
    /// Class Model of Policy
    /// </summary>
    public class PolicyModel
    {
        // Has permission
        public bool Editable { get; set; }
        // Validator
        public object Validator { get; set; }
        // List of PolicyDto
        public List<PolicyDto> ListPolicies { get; set; }
        // Group name
        public string GroupName { get; set; }
        // List of GroupName
        public string ListGroupNames { get; set; }
        // List of Currency
        public List<TBMSystemDto> ListCurrencies { get; set; }
        // List of Reference
        public string ListReferences { get; set; }
    }
}