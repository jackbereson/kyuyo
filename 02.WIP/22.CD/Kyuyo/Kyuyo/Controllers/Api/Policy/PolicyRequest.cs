using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.Infrastructure.Core;

namespace Kyuyo.Controllers.Api.Policy
{
    /// <summary>
    /// Class process request API for Policy
    /// </summary>
    public class PolicyRequest : RequestBase
    {
        public PolicyRequest()
        {
            this.validator = new PolicyValidator();
        }
    }

    public class PolicySearchRequest : RequestBase
    {
        public PolicySearchRequest()
        {
            this.validator = new PolicySearchValidator();
        }
        public string PolicyName { get; set; }
        public string EffectiveDtFrom { get; set; }
        public string EffectiveDtTo { get; set; }
    }
}