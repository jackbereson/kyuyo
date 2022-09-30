using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kyuyo.Models;
using Kyuyo.BL;

namespace Kyuyo.Controllers
{
   //[AuthenticateMvc(Constant.SCREEN_M007)]
    public class AllowanceController : BaseController
    {
        // GET: Allowance
        public ActionResult Index()
        {
            var commonBL = new CommonBL();

            // modelView
            var model = new AllowanceModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M007),
                ListCompany = commonBL.GetAllCompany(),
                CompanyCd = Helper.CompanyCd(),
               // Validator = ValidatorService.GetValidator(new DepartmentValidator())
            };

            return View(model);
        }
    }
}