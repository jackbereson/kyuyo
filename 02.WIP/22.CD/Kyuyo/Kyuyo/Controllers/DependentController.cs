using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Dependent;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc(Constant.SCREEN_M011)]
    public class DependentController : BaseController
    {
        // GET: Dependent
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M013);

            var model = new DependentModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M011),
                CompanyCd = Helper.CompanyCd(),
                ListCompany = commonBL.GetCompanyByIds(companyIds),
                ListDept = commonBL.GetAllDeptByCompanyIds(companyIds),
                Validator = ValidatorService.GetValidator(new DepentdentValidator())
            };

            return View(model);
        }
    }
}