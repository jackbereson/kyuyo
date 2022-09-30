using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.SalaryCalculate;
using Kyuyo.BL.Resources.SalaryCalculate;

namespace Kyuyo.Controllers
{
    public class SalaryCalculateController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();

            var model = new SalaryCalculateModel()
            {
                ListUnit = commonBL.getMSystemList(Constant.FOREIGN_CUR),
                AccessRoles = Helper.GetRoleAccessCompanys(Constant.SCREEN_M017),
                ListCompany = commonBL.GetCompanyByIds(Helper.AccessCompanys(Constant.SCREEN_M017)),
                ClosingTxt = StringsM017.ClosingTxt,
                SearchValidator = ValidatorService.GetValidator(new SalaryCalculateSearchValidator()),
                Validator = ValidatorService.GetValidator(new SalaryCalculateValidator())
            };

            return View(model);
        }
    }
}