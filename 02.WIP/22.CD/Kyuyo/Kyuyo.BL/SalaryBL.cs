using AutoMapper;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Mappings;
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
    public class SalaryBL
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<KYSalaryFormulaDto> GetSalaryFormula(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from d in context.KY_SALARY_FORMULA_MASTER
                              where d.COMPANY_ID == companyId
                                    && d.DELETE_FLAG == Constant.FLAG_NO
                                    && d.MAIN_ID == null
                                    && d.EFFECTIVE_DT ==
                                    (from t in context.KY_SALARY_FORMULA_MASTER
                                     where t.DELETE_FLAG == Constant.FLAG_NO
                                     && t.MAIN_ID == null
                                     && t.FORMULA_CD == d.FORMULA_CD
                                     select t.EFFECTIVE_DT).Max()
                              select d).ToList();
                return Mapper.Map<List<KYSalaryFormulaDto>>(result);
            }
        }

        /// <summary>
        /// 
        /// 
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public List<KYSalaryDto> GetSalaryMaster(int companyId, string deptCd, string employeeNo,string employeeName, Nullable<DateTime> effectDtFrom, Nullable<DateTime> effectDtTo )
        {
            using (var context = new KyuyoEntities())
            {
                var result = context.SearchSalaryMaster(companyId, deptCd, employeeNo, employeeName,  effectDtFrom, effectDtTo);
                return Mapper.Map<List<KYSalaryDto>>(result);
            }
            
        }

        /// <summary>
        /// Get all Salary master by CompanyId
        /// thanhtv
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public List<KYSalaryDto> GetAllByCompanyId(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from s in context.KY_SALARY_MASTER
                              from e in context.KY_EMPLOYEE_MASTER
                              where s.EMPLOYEE_NO == e.EMPLOYEE_NO
                                 && e.COMPANY_ID == companyId
                                 && s.DELETE_FLAG == Constant.FLAG_NO
                                 && s.MAIN_ID == null
                              select s).ToList();
                return Mapper.Map<List<KYSalaryDto>>(result);
            }
        }

        /// <summary>
        /// Gets the salary max EffectiveDt by employeeNo.
        /// thanthv
        /// </summary>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="effectiveDt">The effective dt.</param>
        /// <returns></returns>
        public KYSalaryDto GetSalaryByEmployeeNo(string employeeNo, DateTime effectiveDt)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from s in context.KY_SALARY_MASTER
                              where s.EMPLOYEE_NO == employeeNo
                                 && s.DELETE_FLAG == Constant.FLAG_NO
                                 && s.MAIN_ID == null
                                 && s.EFFECTIVE_DT <= effectiveDt
                              orderby s.EFFECTIVE_DT descending
                              select s).FirstOrDefault();
                return Mapper.Map<KYSalaryDto>(result);
            }
        }

        public void InsertDataImport(List<KYSalaryDto> listInsert, List<KYSalaryDto> listUpdate, string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var listEntityInsert = Mapper.Map<List<KY_SALARY_MASTER>>(listInsert);
                var listEntityUpdate = Mapper.Map<List<KY_SALARY_MASTER>>(listUpdate);

                using(var trans = context.Database.BeginTransaction())
                {
                    try
                    {
                        listEntityInsert.ForEach(entity =>
                        {
                            entity.CREATED_DT = entity.UPDATED_DT = DateTime.Now;
                            entity.CREATED_BY = entity.UPDATED_BY = employeeNo;

                            context.KY_SALARY_MASTER.Add(entity);
                            context.Entry(entity).State = EntityState.Added;

                            // commit
                            context.SaveChanges();
                        });

                        listEntityUpdate.ForEach(entity =>
                        {
                            entity.UPDATED_DT = DateTime.Now;
                            entity.UPDATED_BY = employeeNo;

                            context.KY_SALARY_MASTER.Attach(entity);
                            var entry = context.Entry(entity);
                            context.Entry(entity).State = EntityState.Modified;

                            entry.Property(e => e.EMPLOYEE_NO).IsModified = false;
                            entry.Property(e => e.CREATED_DT).IsModified = false;
                            entry.Property(e => e.CREATED_BY).IsModified = false;

                            // commit
                            context.SaveChanges();
                        });

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
        /// 
        /// </summary>
        /// <param name="dto"></param>
        public void Insert(KYSalaryDto dto)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = Mapper.Map<KY_SALARY_MASTER>(dto);
                try
                {
                    context.Entry(entity).State = EntityState.Added;
                    // commit
                    context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }

               
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dto"></param>
        public void Update(KYSalaryDto dto)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = Mapper.Map<KY_SALARY_MASTER>(dto);
                entity.ID = dto.Id;
                context.Entry(entity).State = EntityState.Modified;

                context.SaveChanges();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dto"></param>
        public void Delete(KYSalaryDto dto)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = Mapper.Map<KY_SALARY_MASTER>(dto);
                entity.ID = dto.Id;
                entity.DELETE_FLAG = Constant.FLAG_YES;
                context.Entry(entity).State = EntityState.Modified;
                context.SaveChanges();
            }
        }


        /// <summary>
        /// Get all Salary master by CompanyId
        /// thanhtv
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public KYSalaryDto GetAllById(int Id)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from s in context.KY_SALARY_MASTER

                              where
                                  s.ID == Id
                                 && s.DELETE_FLAG == Constant.FLAG_NO
                                 && s.MAIN_ID == null
                              select s).FirstOrDefault();

                return Mapper.Map<KYSalaryDto>(result);
            }
        }

    }

}
