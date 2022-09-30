using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using System.Linq;
using System;
using Kyuyo.Controllers.Api.Bonus;

namespace Kyuyo.Controllers
{
    /// <summary>
    /// Class process MVC for Bonus
    /// </summary>
    [AuthenticateMvc(Constant.SCREEN_M014)]
    public class BonusController : Controller
    {
        // CommonBL
        private CommonBL commonBL = new CommonBL();
        // OtherPayBL
        private OtherPayBL otherPayBL = new OtherPayBL();

        // GET: Bonus
        public ActionResult Index(int? companyId = null, string yearMonth = null)
        {
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M014);
            var tmpCompanyId = Helper.CompanyId();
            var tmpYearMonth = DateTime.Now.ToString(Constant.YEARMONTH_FORMAT);

            // check parameter from Salary Calculate screen
            if (companyId != null)
            {
                tmpCompanyId = companyId.GetValueOrDefault();
            }
            if (yearMonth != null)
            {
                tmpYearMonth = yearMonth;
            }

            var model = new BonusModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M014),
                CompanyId = Helper.CompanyId(),
                CompanyCd = Helper.CompanyCd(),
                ListCompanies = commonBL.GetCompanyByIds(companyIds),
                ListCurrencies = commonBL.GetCurrency(Constant.FOREIGN_CUR),
                ListOtherPays = otherPayBL.GetBonus(tmpYearMonth, tmpCompanyId, null),
                ListDescriptions = otherPayBL.GetDescriptions(),
                DefaultYearMonth = tmpYearMonth,
                Validator = ValidatorService.GetValidator(new BonusValidator())
            };

            // get default company
            if (model.ListCompanies.FirstOrDefault(c => c.Id == model.CompanyId) == null)
            {
                model.CompanyId = model.ListCompanies[0].Id;
            }

            return View(model);
        }
    }
}