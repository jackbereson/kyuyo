using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using System.Linq;
using Kyuyo.Controllers.Api.WorkingTimeChangeRefer;

namespace Kyuyo.Controllers
{
    /// <summary>
    /// Class process MVC for WorkingTimeChangeRefer
    /// </summary>
    [AuthenticateMvc(Constant.SCREEN_M018)]
    public class WorkingTimeChangeReferController : BaseController
    {
        // CommonBL
        private CommonBL commonBL = new CommonBL();

        // GET: WorkingTimeChangeRefer
        public ActionResult Index()
        {
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M018);
            var system = commonBL.getMSystem(Helper.CompanyCd(), Constant.KY_DATE, Constant.CD_VALUE);

            var model = new WorkingTimeChangeReferModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M018),
                ListCompanies = commonBL.GetCompanyByIds(companyIds),
                CompanyCd = Helper.CompanyCd(),
                CompanyId = Helper.CompanyId(),
                Validator = ValidatorService.GetValidator(new WorkingTimeChangeReferValidator())
            };

            // check to get FirstDay of Salary period
            if (system != null)
            {
                model.FirstDaySalary = system.Value;
            }

            // get default company
            if (model.ListCompanies.FirstOrDefault(c => c.Id == model.CompanyId) == null)
            {
                model.CompanyId = model.ListCompanies[0].Id;
            }

            return View(model);
        }
    }
}