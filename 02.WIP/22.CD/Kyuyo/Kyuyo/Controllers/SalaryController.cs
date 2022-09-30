using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.BL.DTO;
using System.Collections.Generic;
using Kyuyo.Controllers.Api.Salary;

namespace Kyuyo.Controllers
{
    public class SalaryController : BaseController
    {
        [AuthenticateMvc(Constant.SCREEN_M012)]
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            var companyIds = Helper.AccessCompanys(Constant.SCREEN_M012);

            // Get List Allowance And Subsidize
            
            List<KYAllowanceDto> allowances = new List<KYAllowanceDto>();
            List<KYAllowanceDto> subsidizes = new List<KYAllowanceDto>();
            foreach(KYAllowanceDto dto in new AllowanceBL().GetAllowanceByCompanyId(Helper.CompanyId()))
            {
                if(dto.AllowanceFlg)
                {
                    allowances.Add(dto);
                }
                else
                {
                    subsidizes.Add(dto);
                }
            }

            var model = new SalaryModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M012), //&& payRollStatus,
                CompanyCd = Helper.CompanyCd(),
                // 2. List Company Combobox
                ListCompany = commonBL.GetCompanyByIds(companyIds),
                // 5. List Department
                ListDept = commonBL.GetAllDeptByCompanyIds(companyIds),
                // 3. List OT type
                OTType = commonBL.getMSystemList(Constant.OT_TYPE),
                // 6. List 
                ForeignCur = commonBL.getMSystemList(Constant.FOREIGN_CUR),
                // 
                SalaryFormula = new SalaryBL().GetSalaryFormula(Helper.CompanyId()),
                // 7. Allowance && Subsidize
                Allowance = allowances,
                Subsidize = subsidizes,
                // 
                Mode = Constant.MODE_EDIT
            };

            return View(model);
        }
    }
}