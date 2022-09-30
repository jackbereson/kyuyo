using AutoMapper;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Utils;
using Kyuyo.DA;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Kyuyo.BL
{
    public class SalaryCalulateBL
    {
        /// <summary>
        /// Gets the salary formula.
        /// thanhtv
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="startDt">The start dt.</param>
        /// <param name="endDt">The end dt.</param>
        /// <returns></returns>
        public List<KYSalaryFormulaDto> GetSalaryFormula(int companyId, DateTime startDt, DateTime endDt)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_SALARY_MASTER
                              from b in context.KY_SALARY_FORMULA_MASTER
                              from c in context.KY_EMPLOYEE_MASTER
                              where a.FORMULA_CD == b.FORMULA_CD
                                 && a.EMPLOYEE_NO == c.EMPLOYEE_NO
                                 && c.DELETE_FLAG == Constant.FLAG_NO
                                 && c.COMPANY_ID == companyId
                                 && a.DELETE_FLAG == Constant.FLAG_NO
                                 && a.MAIN_ID == null
                                 && ((a.EFFECTIVE_DT > startDt && a.EFFECTIVE_DT <= endDt)
                                    || a.EFFECTIVE_DT == (from d in context.KY_SALARY_MASTER
                                                          where d.EMPLOYEE_NO == a.EMPLOYEE_NO
                                                          && d.DELETE_FLAG == Constant.FLAG_NO
                                                          && d.MAIN_ID == null
                                                          && d.EFFECTIVE_DT <= startDt
                                                          select d.EFFECTIVE_DT).Max())
                                 && b.MAIN_ID == null
                                 && b.DELETE_FLAG == Constant.FLAG_NO
                                 && b.EFFECTIVE_DT == (from e in context.KY_SALARY_FORMULA_MASTER
                                                       where e.FORMULA_CD == b.FORMULA_CD
                                                       && e.DELETE_FLAG == Constant.FLAG_NO
                                                       && e.MAIN_ID == null
                                                       && e.EFFECTIVE_DT <= endDt
                                                       select e.EFFECTIVE_DT).Max()
                              select b).ToList().GroupBy(a => a.FORMULA_CD).Select(a => a.First());
                return Mapper.Map<List<KYSalaryFormulaDto>>(result);
            }
        }

        /// <summary>
        /// Gets the exchange rate.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="endDt">The end dt.</param>
        /// <param name="unit">The unit.</param>
        /// <returns></returns>
        public object GetExchangeRate(int companyId, DateTime endDt, string unit)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_RATE
                              where a.MAIN_ID == null
                                 && a.COMPANY_ID == companyId
                                 && a.RATE_TYPE == unit
                                 && a.EFFECTIVE_DT == (from b in context.KY_RATE
                                                       where b.COMPANY_ID == companyId
                                                          && b.MAIN_ID == null
                                                          && b.RATE_TYPE == unit
                                                          && b.EFFECTIVE_DT <= endDt
                                                       select b.EFFECTIVE_DT).Max()
                              select a).FirstOrDefault();

                return result == null ? null : new
                {
                    Rate = result.EXCHANGE_RATE,
                    EffectiveDt = DateTimeFormat.ToStringDate(result.EFFECTIVE_DT)
                };

            }
        }

        /// <summary>
        /// Gets all salary.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="startDt">The start dt.</param>
        /// <param name="endDt">The end dt.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <returns></returns>
        public List<SalaryCalulateDto> GetAllSalary(int companyId, DateTime startDt, DateTime endDt, string yearMonth)
        {
            using (var context = new KyuyoEntities())
            {
                var result = context.SearchSalaryCalulate(companyId, startDt, endDt, yearMonth);
                return Mapper.Map<List<SalaryCalulateDto>>(result);
            }
        }

        /// <summary>
        /// Checks the exclusive.
        /// thanhtv
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <param name="UpdatedDts">The updated DTS.</param>
        /// <returns></returns>
        public bool CheckExclusive(int companyId, string yearMonth, List<BaseDto> UpdatedDts)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_SALARY_RESULT
                              where a.COMPANY_ID == companyId
                                 && a.YEAR_MONTH_RECEIVE == yearMonth
                                 && a.HISTORY_NO == 1
                              select a).ToList();

                return result.All(a => UpdatedDts.Exists(b => b.Id == a.ID && b.UpdatedDt == DateTimeFormat.ToString(a.UPDATED_DT)));
            }
        }

        /// <summary>
        /// Gets the by employee no.
        /// thanhtv
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="startDt">The start dt.</param>
        /// <param name="endDt">The end dt.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <returns></returns>
        public List<SalaryCalulateDto> GetByEmployeeNo(int companyId, DateTime startDt, DateTime endDt, string yearMonth, string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                return (from a in context.KY_EMPLOYEE_MASTER
                        from b in context.KY_SALARY_RESULT
                                  .Where(o => o.EMPLOYEE_NO == a.EMPLOYEE_NO && o.YEAR_MONTH == yearMonth && o.HISTORY_NO == 1).DefaultIfEmpty()
                        where a.COMPANY_ID == companyId
                           && a.DELETE_FLAG == Constant.FLAG_NO
                           && a.ENTRY_DT <= endDt
                           && (a.QUIT_DT == null || a.QUIT_DT >= startDt)
                           && a.EMPLOYEE_NO == employeeNo
                        orderby b.DATE_FROM descending
                        select new SalaryCalulateDto()
                        {
                            Id = (int?)b.ID ?? 0
                        }).ToList();
            }
        }


        /// <summary>
        /// Inserts the or update.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="status">The status.</param>
        /// <param name="other">The other.</param>
        /// <param name="unit">The unit.</param>
        /// <param name="remark">The remark.</param>
        /// <param name="sabbtical100">The sabbtical100.</param>
        /// <param name="sabbtical300">The sabbtical300.</param>
        /// <param name="employeeNoLogin">The employee no login.</param>
        public void InsertOrUpdate(List<SalaryCalulateDto> datas, int companyId, string yearMonth, string employeeNoLogin)
        {
            using (var context = new KyuyoEntities())
            {
                using (var trans = context.Database.BeginTransaction())
                {
                    try
                    {
                        foreach (var data in datas)
                        {
                            // insert
                            if (data.Id == 0)
                            {
                                var entity = new KY_SALARY_RESULT()
                                {
                                    COMPANY_ID = companyId,
                                    EMPLOYEE_NO = data.EmployeeNo,
                                    YEAR_MONTH = yearMonth,
                                    YEAR_MONTH_RECEIVE = yearMonth,
                                    STATUS = data.Status,
                                    OTHER = data.Other,
                                    HISTORY_NO = 1,
                                    OTHER_UNIT = data.OtherUnit,
                                    OTHER_REMARK = data.OtherRemark,
                                    SABBTICAL_100 = data.Sabbtical100,
                                    SABBTICAL_300 = data.Sabbtical300,
                                    CREATED_DT = DateTime.Now,
                                    CREATED_BY = employeeNoLogin,
                                    UPDATED_DT = DateTime.Now,
                                    UPDATED_BY = employeeNoLogin
                                };

                                context.KY_SALARY_RESULT.Add(entity);
                                context.Entry(entity).State = EntityState.Added;
                            }
                            else
                            {
                                var entity = context.KY_SALARY_RESULT.SingleOrDefault(b => b.ID == data.Id);
                                if (entity != null)
                                {
                                    entity.STATUS = data.Status;
                                    entity.OTHER = data.Other;
                                    entity.OTHER_UNIT = data.OtherUnit;
                                    entity.OTHER_REMARK = data.OtherRemark;
                                    entity.SABBTICAL_100 = data.Sabbtical100;
                                    entity.SABBTICAL_300 = data.Sabbtical300;
                                    entity.UPDATED_BY = employeeNoLogin;
                                    entity.UPDATED_DT = DateTime.Now;
                                }
                            }
                            // commit
                            context.SaveChanges();
                        }

                        trans.Commit();

                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        throw ex;
                    }
                }
            }
        }

        /// <summary>
        /// Updates APP_FLAG
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <param name="appFlag">The application flag.</param>
        /// <param name="employeeNoLogin">The employee no login.</param>
        public void UpdateAppFlag(int companyId, string yearMonth, string appFlag, string employeeNoLogin)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_SALARY_RESULT
                              where a.COMPANY_ID == companyId
                                 && a.YEAR_MONTH_RECEIVE == yearMonth
                                 && a.HISTORY_NO == 1
                              select a);
                
                foreach(var entity in result)
                {
                    entity.APP_FLG = appFlag;
                    entity.UPDATED_DT = DateTime.Now;
                    entity.UPDATED_BY = employeeNoLogin;
                }
                context.SaveChanges();
            }
        }
        /// <summary>
        /// Regists the closing date.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="yearMonth">The year month.</param>
        /// <param name="closingDate">The closing date.</param>
        /// <param name="employeeNoLogin">The employee no login.</param>
        public void RegistClosingDate(int companyId, string yearMonth, DateTime closingDate, string employeeNoLogin)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new KY_CLOSING_DATE()
                {
                    COMPANY_ID = companyId,
                    CLOSING_DATE = closingDate,
                    YEAR_MONTH = yearMonth,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = employeeNoLogin,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = employeeNoLogin
                };

                context.KY_CLOSING_DATE.Add(entity);
                context.Entry(entity).State = EntityState.Added;
                context.SaveChanges();
            }
        }

    }
}
