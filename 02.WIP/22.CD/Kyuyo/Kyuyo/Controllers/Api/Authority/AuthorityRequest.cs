using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Controllers.Api.Authority;

namespace Kyuyo.Controllers.Api.Authority
{
    public class AuthorityRequest : RequestBase
    {
        public AuthorityRequest()
        {
            this.validator = new AuthorityValidator();
        }

        public int? Id { get; set; }
        public string EmployeeNo { get; set; }
        public string ScreenAccess { get; set; }
        public string UpdatedDt { get; set; }
    }
    
}