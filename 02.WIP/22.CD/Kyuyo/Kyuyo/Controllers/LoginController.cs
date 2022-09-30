using Kyuyo.Controllers.Api.Authority;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kyuyo.Controllers
{
    public class LoginController : BaseController
    {
        // GET: Login
        public ActionResult Index()
        {
            var validOpts = ValidatorService.GetValidator(new AuthorityValidator());
            return View(validOpts);
        }
    }
}