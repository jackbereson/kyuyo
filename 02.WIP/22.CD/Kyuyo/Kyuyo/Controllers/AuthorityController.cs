using Kyuyo.Infrastructure.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kyuyo.Controllers.Api.Authority;
using Newtonsoft.Json;
using System.Net.Http;
using Kyuyo.Infrastructure.Core;
using System.Net;
using log4net;
using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.Models;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc(Constant.SCREEN_M004)]
    public class AuthorityController : BaseController
    {
        // GET: Authority
        public ActionResult Index()
        {
            var authorityBL = new AuthorityBL();
            var commonBL = new CommonBL();

            var model = new AuthorityModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M004),
                ListEmployee = authorityBL.GetAllEmployee(Helper.CompanyId()),
                ListScreen = commonBL.getMSystemList(Constant.SCREEN_ID),
                ListCompany = commonBL.GetAllCompany()
            };

            return View(model);
        }
        
    }
}
