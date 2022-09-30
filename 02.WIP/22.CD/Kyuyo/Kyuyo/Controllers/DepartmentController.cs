using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Department;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc(Constant.SCREEN_M020)]
    public class DepartmentController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M020);

            var model = new DepartmentModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M020), 
                ListCompany = commonBL.GetCompanyByIds(companyIds),
                CompanyCd = Helper.CompanyCd(),
                Validator = ValidatorService.GetValidator(new DepartmentValidator())
            };

            // get default company
            if (model.ListCompany.FirstOrDefault(c => c.CompanyCd == model.CompanyCd) == null)
            {
                model.CompanyCd = model.ListCompany[0].CompanyCd;
            }

            return View(model);
        }
    }
}