using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Dependent;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc(Constant.SCREEN_M011)]
    public class ImportDependentController : Controller
    {
        // GET: Dependent
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M011);

            var model = new ImportDependentModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M011),
                CompanyCd = Helper.CompanyCd(),
                ListCompany = commonBL.GetCompanyByIds(companyIds),
                ListDept = commonBL.GetAllDeptByCompanyIds(companyIds),
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