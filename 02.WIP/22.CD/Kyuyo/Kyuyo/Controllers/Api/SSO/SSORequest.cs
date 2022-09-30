using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.SSO
{
    public class SSORequest : RequestBase
    {
        public SSORequest()
        {
            this.validator = new SSOValidator();
        }
        public string Param { get; set; }
    }

    public class SSORegistRequest : RequestBase
    {
        public SSORegistRequest()
        {
            this.validator = new SSORegistValidator();
        }
        public string Param1 { get; set; }
        public string Param2 { get; set; }
    }
}