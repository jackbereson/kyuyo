using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.Controllers.Api.Employee;
using System.Linq;
using System;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc(Constant.SCREEN_M009)]
    public class EmployeeController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            var allowanceBL = new AllowanceBL();
            var policyBL = new PolicyBL();
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M009);
            var lstCompany = commonBL.GetCompanyByIds(companyIds);
            var defaultCompany = lstCompany.FirstOrDefault(c => c.Id == Helper.CompanyId());

            // get default company
            if (defaultCompany == null)
            {
                defaultCompany = lstCompany.First();
            }

            var model = new EmployeeModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M009),
                ListCompany = commonBL.GetCompanyByIds(companyIds),
                ListDept = commonBL.GetAllDeptByCompanyIds(companyIds),
                CompanyId = defaultCompany.Id,
                ListEmployeeType = commonBL.getMSystemList(Constant.EMPLOYEE_TYPE, defaultCompany.CompanyCd),
                ListWorkingPlace = commonBL.getMSystemList(Constant.WORKING_PLACE, defaultCompany.CompanyCd),
                ListContinents = commonBL.getMSystemList(Constant.CONTINENTS),
                ListLevel = commonBL.getMSystemList(Constant.LEVEL, defaultCompany.CompanyCd),
                ListLevelGroup = commonBL.getMSystemList(Constant.LEVEL_GROUP, defaultCompany.CompanyCd),
                ListContractForm = commonBL.getMSystemList(Constant.CONTRACT_FORM),
                ListContractType = commonBL.getMSystemList(Constant.CONTRACT_TYPE, defaultCompany.CompanyCd),
                ListInsuCode = commonBL.getMSystemList(Constant.INSU_CODE),
                ListCertificate = allowanceBL.GetAllByGroupCd("0"),
                ListInsurance = policyBL.GetPolicyByType("2"),
                DateNow = DateTimeFormat.ToStringDate(DateTime.Now),
                Validator = ValidatorService.GetValidator(new EmployeeValidator()),

                ValidatorDept = ValidatorService.GetValidator(new EmployeeDeptValidator())

            };
            
            return View(model);
        }
    }
}