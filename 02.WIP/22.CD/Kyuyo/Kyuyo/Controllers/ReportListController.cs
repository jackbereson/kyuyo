using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using Kyuyo.BL;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Utils;
using Kyuyo.BL.DTO;
using System.Collections.Generic;
using Kyuyo.BL.Resources;
using Kyuyo.BL.Resources.ReportList;

namespace Kyuyo.Controllers
{
    public class ReportListController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            var commonBL = new CommonBL();

            // get payRollStatus
            // var payRollStatus = commonBL.CheckPayrollStatus(Helper.CompanyId());

            var model = new ReportListModel()
            {
                Editable = Helper.HasPermissionEdit(Constant.SCREEN_M019), //&& payRollStatus,
                ReportLists = getReportListOnScreen(),
            };

            return View(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private List<ReportListDto> getReportListOnScreen()
        {
            List<ReportListDto> dtos = new List<ReportListDto>();

            dtos.Add(new ReportListDto(StringsM019.TableGeneralSalary));
            dtos.Add(new ReportListDto(StringsM019.TableEmployeeSalaryVn));
            dtos.Add(new ReportListDto(StringsM019.TableEmployeeSalaryOther));
            dtos.Add(new ReportListDto(StringsM019.TablePartTimeEmployeeSalaryVn));
            dtos.Add(new ReportListDto(StringsM019.TablePartTimeEmployeeSalaryOther));
            dtos.Add(new ReportListDto(StringsM019.TablePayByBank));
            dtos.Add(new ReportListDto(StringsM019.TablePersonalTax));
            dtos.Add(new ReportListDto(StringsM019.TableCostSalary));
            dtos.Add(new ReportListDto(StringsM019.TableSubdizeUnEmployment));
            dtos.Add(new ReportListDto(StringsM019.EmployeeInfo));
            dtos.Add(new ReportListDto(StringsM019.PersonalTaxPerYear));
            dtos.Add(new ReportListDto(StringsM019.TableBonusMoney));
            dtos.Add(new ReportListDto(StringsM019.ReportUsingOtherEmployee));
            dtos.Add(new ReportListDto(StringsM019.ReportChangeHR));
            dtos.Add(new ReportListDto(StringsM019.TableCalRequireInsurrence));
            dtos.Add(new ReportListDto(StringsM019.TableCalCostFederation));
            dtos.Add(new ReportListDto(StringsM019.TableCollectSalaryInyear));
            dtos.Add(new ReportListDto(StringsM019.ListDependentPerson));
            dtos.Add(new ReportListDto(StringsM019.ListSubdizeCertificate));
            dtos.Add(new ReportListDto(StringsM019.NoteManageEmp));
            dtos.Add(new ReportListDto(StringsM019.TableAdjustSalary));
            dtos.Add(new ReportListDto(StringsM019.TableSubdizeInsurrence));
            dtos.Add(new ReportListDto(StringsM019.DetailEmployeeSalary));
            dtos.Add(new ReportListDto(StringsM019.MangeEmp));
            
            for(int i = 0; i < dtos.Count; i ++)
            {
                ReportListDto dto = dtos[i];
                dto.name = "chkb" + i.ToString();
            }

            return dtos;
        }
    }
    
}