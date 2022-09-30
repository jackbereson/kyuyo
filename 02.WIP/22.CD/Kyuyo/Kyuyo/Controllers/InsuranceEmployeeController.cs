using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;

namespace Kyuyo.Controllers
{
    public class InsuranceEmployeeController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();

            // get payRollStatus
            // var payRollStatus = commonBL.CheckPayrollStatus(Helper.CompanyId());

            var model = new InsuranceEmployeeModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M010), //&& payRollStatus,
                //Validator = ValidatorService.GetValidator(new SpecialInsuranceValidator())
            };

            return View(model);
        }
    }
}