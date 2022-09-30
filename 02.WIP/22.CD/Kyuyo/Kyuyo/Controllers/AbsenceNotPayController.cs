using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.AbsenceNotPay;
using System.Linq;

namespace Kyuyo.Controllers
{
    /// <summary>
    /// Class process MVC for AbsenceNotPay
    /// </summary>
    [AuthenticateMvc(Constant.SCREEN_M013)]
    public class AbsenceNotPayController : BaseController
    {
        // CommonBL
        private CommonBL commonBL = new CommonBL();
        // SpecialInsuranceBL
        private SpecialInsuranceBL specialInsuranceBL = new SpecialInsuranceBL();
        // LongtermAbsenceBL
        private LongtermAbsenceBL longtermAbsenceBL = new LongtermAbsenceBL();

        // GET: Department
        public ActionResult Index()
        {
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M013);
            var model = new AbsenceNotPayModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M013),
                ListCompanies = commonBL.GetCompanyByIds(companyIds),
                ListDepartments = commonBL.GetAllDeptByCompanyIds(companyIds),
                CompanyCd = Helper.CompanyCd(),
                CompanyId = Helper.CompanyId(),
                ListAbsenceDescriptions = commonBL.GetAbsenceDescriptions(Constant.LONGTERM_ABSENCE, Helper.CompanyCd()),
                Validator = ValidatorService.GetValidator(new AbsenceNotPayValidator())
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