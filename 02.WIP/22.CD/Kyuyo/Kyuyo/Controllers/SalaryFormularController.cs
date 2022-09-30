using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;

namespace Kyuyo.Controllers
{
    public class SalaryFormularController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();

            // get payRollStatus
           // var payRollStatus = commonBL.CheckPayrollStatus(Helper.CompanyId());

            var model = new SalaryFormularModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M008), //&& payRollStatus,
                //ListCompany = commonBL.GetAllCompany(),
                CompanyCd = Helper.CompanyCd(),
                //Validator = ValidatorService.GetValidator(new EmployeeValidator())
            };

            return View(model);
        }
    }
}