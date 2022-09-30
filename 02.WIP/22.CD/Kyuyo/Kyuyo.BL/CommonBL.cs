using Kyuyo.BL.Utils;
using Kyuyo.DA;
using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Newtonsoft.Json;

namespace Kyuyo.BL
{
    /// <summary>
    /// 
    /// </summary>
    public class CommonBL
    {

        /// <summary>
        /// Checks the payroll status.
        /// </summary>
        /// <param name="inCompanyCd">The in company cd.</param>
        /// <returns></returns>
        public bool CheckPayrollStatus(int? inCompanyId)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_COMPANY
                              where (a.ID == inCompanyId || inCompanyId == null)
                                 && a.PAYROLL_STATUS == Constant.FLAG_YES
                                 && a.ACTIVE_FLAG == Constant.FLAG_YES
                              select a).FirstOrDefault();

                return result != null;
            }

        }

        /// <summary>
        /// Checks the payroll status.
        /// </summary>
        /// <param name="inCompanyCd">The in company cd.</param>
        /// <returns></returns>
        public bool CheckPayrollStatus(string inCompanyCd)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_COMPANY
                              where (a.COMPANY_CD == inCompanyCd || inCompanyCd == null)
                                 && a.PAYROLL_STATUS == Constant.FLAG_YES
                                 && a.ACTIVE_FLAG == Constant.FLAG_YES
                              select a).FirstOrDefault();

                return result != null;
            }

        }

        /// <summary>
        /// Gets the company by ids.
        /// </summary>
        /// <param name="companyIds">The company ids.</param>
        /// <returns></returns>
        public List<KYCompanyDto> GetCompanyByIds(int[] companyIds)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_COMPANY
                              where a.ACTIVE_FLAG == Constant.FLAG_YES
                                 && companyIds.Contains(a.ID)
                              select a).ToList();
                return Mapper.Map<List<KYCompanyDto>>(result);
            }
        }

        /// <summary>
        /// Gets all company.
        /// </summary>
        /// <returns></returns>
        public List<KYCompanyDto> GetAllCompany()
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_COMPANY
                              where a.ACTIVE_FLAG == Constant.FLAG_YES
                              select a).ToList();
                return Mapper.Map<List<KYCompanyDto>>(result);
            }
        }

        /// <summary>
        /// Gets all dept.
        /// </summary>
        /// <returns></returns>
        public List<KYDepartmentDto> GetAllDeptByCompanyIds(int[] companyIds)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_DEPARTMENT
                              from c in context.TB_M_COMPANY
                              where a.ACTIVE_FLAG == Constant.FLAG_YES
                                 && a.COMPANY_CD == c.COMPANY_CD
                                 && companyIds.Contains(c.ID)
                                 && c.ACTIVE_FLAG == Constant.FLAG_YES
                              select a).ToList();
                return Mapper.Map<List<KYDepartmentDto>>(result);
            }
        }

        /// <summary>
        /// Gets all dept by company identifier.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public List<KYDepartmentDto> GetAllDeptByCompanyCd(string companyCd)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_DEPARTMENT
                              where a.ACTIVE_FLAG == Constant.FLAG_YES
                                 && a.COMPANY_CD == companyCd
                              select a).ToList();
                return Mapper.Map<List<KYDepartmentDto>>(result);
            }
        }

        /// <summary>
        /// Gets the m system list.
        /// </summary>
        /// <param name="inCompanyCd">The in company cd.</param>
        /// <param name="inCategory">The in category.</param>
        /// <returns></returns>
        public List<TBMSystemDto> getMSystemList(string inCategory, string inCompanyCd = Constant.COMMON_COMPANYCD)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_SYSTEM
                              where a.COMPANY_CD == inCompanyCd
                                 && a.CATEGORY == inCategory
                                 && a.ACTIVE_FLAG == Constant.FLAG_YES
                              orderby a.LIST_ORDER
                              select a).ToList();
                return Mapper.Map<List<TBMSystemDto>>(result);
            }
        }

        /// <summary>
        /// Gets the m system.
        /// </summary>
        /// <param name="inCompanyCd">The in company cd.</param>
        /// <param name="inCategory">The in category.</param>
        /// <param name="inCd">The in cd.</param>
        /// <returns></returns>
        public TBMSystemDto getMSystem(string inCompanyCd, string inCategory, string inCd)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_SYSTEM
                              where a.COMPANY_CD == inCompanyCd
                                 && a.CATEGORY == inCategory
                                 && a.CD == inCd
                                 && a.ACTIVE_FLAG == Constant.FLAG_YES
                              select a).FirstOrDefault();
                return Mapper.Map<TBMSystemDto>(result);
            }
        }

        /// <summary>
        /// Get list Currency
        /// </summary>
        /// <param name="inCategory"></param>
        /// <returns></returns>
        public List<TBMSystemDto> GetCurrency(string inCategory)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.TB_M_SYSTEM
                              where a.CATEGORY == inCategory
                                 && a.ACTIVE_FLAG == Constant.FLAG_YES
                              select a).ToList();
                return Mapper.Map<List<TBMSystemDto>>(result);
            }
        }

        /// <summary>
        /// Get AbsenceDescription
        /// </summary>
        /// <returns></returns>
        public string GetAbsenceDescriptions(string category, string companyCd)
        {
            using (var context = new KyuyoEntities())
            {
                var listAbsenceDescriptions = (from system in context.TB_M_SYSTEM
                                               where
                                                 system.ACTIVE_FLAG == Constant.FLAG_YES
                                                 && system.CATEGORY == category
                                                 && system.COMPANY_CD == companyCd
                                               select new
                                               {
                                                   Id = system.ID,
                                                   Value = system.CD,
                                                   Name = system.REMARK
                                               }).ToList();

                return JsonConvert.SerializeObject(listAbsenceDescriptions);
            }
        }

        /// <summary>
        /// Check IsClosing
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <returns></returns>
        public bool IsClosing(int companyId, string yearMonth)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from c in context.KY_CLOSING_DATE
                              where c.COMPANY_ID == companyId
                                 && c.YEAR_MONTH == yearMonth
                              select c).FirstOrDefault();

                return result != null;
            }
        }

        /// <summary>
        /// Gets the date range salary.
        /// </summary>
        /// <param name="companyCd">The company cd.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <returns></returns>
        public List<DateTime> GetDateRangeSalary(string companyCd, DateTime yearMonth)
        {
            var mSystem = this.getMSystem(companyCd, Constant.START_DT_CAL_SAL, "001");
            int day = (int)mSystem.NumValue1;
            DateTime startDate;

            startDate = new DateTime(yearMonth.Year, yearMonth.Month, day);

            if (day >= 15)
            {
                startDate = startDate.AddMonths(-1);
            }

            var result = new List<DateTime>();

            result.Add(startDate);
            result.Add(startDate.AddMonths(1).AddDays(-1));
            return result;
        }


        /// <summary>
        /// Gets the last closing date.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public DateTime GetLastClosingDate(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from e in context.KY_CLOSING_DATE
                              where e.COMPANY_ID == companyId
                              select e.CLOSING_DATE).Max();

                return result ?? DateTime.MinValue;
            }
        }

        /// <summary>
        /// Check IsBeforeClosing
        /// </summary>
        /// <param name="companyId">ID of Comapny</param>
        /// <param name="effectiveDt">Effective Date</param>
        /// <returns></returns>
        public bool IsBeforeClosing(int companyId, DateTime effectiveDt)
        {
            DateTime maxEffectiveDt = GetLastClosingDate(companyId);
            if (DateTime.Compare(effectiveDt, maxEffectiveDt) <= 0)
            {
                return true;
            }
            return false;
        }
    }
}
