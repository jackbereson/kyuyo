using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using System.Linq;
using Kyuyo.Controllers.Api.ImportWorkingTime;
using System;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc(Constant.SCREEN_M015)]
    public class ImportWorkingTimeController : BaseController
    {
        // GET: ImportWorkingTime
        // GET: ImportWorkingTime?companyId=4&yearMonth=20160101
        public ActionResult Index(int? companyId, string yearMonth)
        {

            var commonBL = new CommonBL();
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M015);
            var lstCompany = commonBL.GetCompanyByIds(companyIds);

            var model = new ImportWorkingTimeModel()
            {
                ListCompany = lstCompany,
                Validator = ValidatorService.GetValidator(new ImportWorkingTimeValidator())
            };

            // Trường hợp di chuyển từ màn hình tính lương
            if (companyId != null)
            {
                if(!lstCompany.Exists(a => a.Id == companyId))
                {
                    return RedirectToAction("Index", "Error", new { id = 2 });
                }

                var date = DateTimeFormat.ToDateTime(yearMonth);
                if(date == null)
                {
                    return RedirectToAction("Index", "Error", new { id = 1 });
                }
                model.CompanyId = companyId ?? 0;
                model.YearMonth = DateTimeFormat.ToStringDate(date);
                model.IsDisable = true;
            }
            else
            {
                var defaultCompany = lstCompany.FirstOrDefault(c => c.Id == Helper.CompanyId());
                // get default company
                if (defaultCompany == null)
                {
                    defaultCompany = lstCompany.First();
                }
                model.CompanyId = defaultCompany.Id;
                model.YearMonth = DateTimeFormat.ToStringDate(DateTime.Now);
                model.IsDisable = false;
            }
            return View(model);
        }
    }
}