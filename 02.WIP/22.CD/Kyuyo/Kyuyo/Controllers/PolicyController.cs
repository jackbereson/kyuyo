using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using System;

namespace Kyuyo.Controllers
{
    /// <summary>
    /// Class process MVC for Policy
    /// </summary>
    public class PolicyController : BaseController
    {
        // PolicyBL
        private PolicyBL policyBL = new PolicyBL();
        // CommonBL
        private CommonBL commonBL = new CommonBL();

        // GET: Policy
        public ActionResult Index()
        {
            Nullable<System.DateTime> effectiveDtFrom = null;
            Nullable<System.DateTime> effectiveDtTo = null;
            var model = new PolicyModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M005),
                ListPolicies = policyBL.GetPolicy(null, effectiveDtFrom, effectiveDtTo),
                ListGroupNames = policyBL.GetGroupName(),
                ListCurrencies = commonBL.GetCurrency("FOREIGN_CUR"),
                ListReferences = policyBL.GetReferences()
            };

            return View(model);
        }
    }
}