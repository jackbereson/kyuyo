using Kyuyo.BL.Utils;
using Kyuyo.DA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL
{
    /// <summary>
    /// CompanyBL
    /// </summary>
    public class CompanyBL
    {
        /// <summary>
        /// Gets the company cd.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public string GetCompanyCd(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var company = (from c in context.TB_M_COMPANY
                              where c.ID == companyId && c.ACTIVE_FLAG == Constant.FLAG_YES
                              select c).FirstOrDefault();
                if(company != null)
                {
                    return company.COMPANY_CD;
                }
                else
                {
                    return null;
                }
            }
        }

        public void UpdatePayroll(int id, string payRoll, string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var result = context.TB_M_COMPANY.SingleOrDefault(b => b.ID == id);
                if (result != null)
                {
                    result.PAYROLL_STATUS = payRoll;
                    result.UPDATED_BY = employeeNo;
                    result.UPDATED_DT = DateTime.Now;

                    context.SaveChanges();
                }
            }
        }
    }
}
