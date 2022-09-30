using System;
using System.Collections.Generic;
using System.Linq;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Department;
using Kyuyo.Controllers.Api.SpecialInsurance;
using Kyuyo.BL.DTO;
using Kyuyo.DA;

namespace Kyuyo.Controllers
{
    /// <summary>
    /// Class process MVC for SpecialInsurance
    /// </summary>
    [AuthenticateMvc(Constant.SCREEN_M006)]
    public class SpecialInsuranceController : BaseController
    {
        // GET: Department
        KyuyoEntities db = new KyuyoEntities();
        private SpecialInsuranceBL specialInsuranceBL = new SpecialInsuranceBL();
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            Nullable<System.DateTime> effectiveDtFrom = null;
            Nullable<System.DateTime> effectiveDtTo = null;
            var model = new SpecialInsuranceModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M006),
                ListSpeIn = specialInsuranceBL.GetSpecialInsurance(null, effectiveDtFrom, effectiveDtTo),
                CompanyCd = Helper.CompanyCd(),
                Validator = ValidatorService.GetValidator(new SpecialInsuranceValidator())
            };

            return View(model);
        }
    }
}