using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Login
{
    public class LoginRequest : RequestBase
    {
        public LoginRequest()
        {
            this.validator = new LoginValidator();
        }

        public string UserCode { get; set; }
        public string Password { get; set; }
    }
}