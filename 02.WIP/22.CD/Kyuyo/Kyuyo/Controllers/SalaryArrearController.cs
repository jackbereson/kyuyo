using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;

namespace Kyuyo.Controllers
{
    public class SalaryArrearController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();

            // get payRollStatus
            // var payRollStatus = commonBL.CheckPayrollStatus(Helper.CompanyId());

            var model = new SalaryArrearModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M016), //&& payRollStatus,
                //Validator = ValidatorService.GetValidator(new SpecialInsuranceValidator())
            };

            return View(model);
        }
    }
}