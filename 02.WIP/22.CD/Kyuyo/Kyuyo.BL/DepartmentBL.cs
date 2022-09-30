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
    public class DepartmentBL
    {
        /// <summary>
        /// Gets all department by companyCd
        /// </summary>
        /// <param name="companyCd">The company cd.</param>
        /// <returns></returns>
        public List<KYDepartmentDto> GetAll(string companyCd)
        {
            using (var context = new KyuyoEntities())
            {
                var depts = (from d in context.TB_M_DEPARTMENT
                             where d.COMPANY_CD == companyCd
                             orderby d.DEPT_NAME
                             select d
                             ).ToList();

                return Mapper.Map<List<KYDepartmentDto>>(depts);
            }
        }

        /// <summary>
        /// Check dữ liệu đang được sử dụng
        /// </summary>
        /// <param name="deptCd">The dept cd.</param>
        /// <returns></returns>
        public bool CheckDeptCdUsed(string deptCd)
        {
            using (var context = new KyuyoEntities())
            {
                // check table TB_R_WORKING_TIME.
                var wtime = (from w in context.TB_R_WORKING_TIME
                             where w.DEPT_CD == deptCd
                             select w).FirstOrDefault();
                if (wtime != null)
                {
                    return true;
                }

                // check table TB_M_EMP_DEPT.
                var edept = (from w in context.TB_M_EMP_DEPT
                             where w.DEPT_CD == deptCd
                                && w.DELETE_FLAG == Constant.FLAG_NO
                             select w).FirstOrDefault();
                if (edept != null)
                {
                    return true;
                }

                return false;
            }
        }

        /// <summary>
        /// Checks the unique.
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="companyCd">The company cd.</param>
        /// <returns></returns>
        public bool CheckUnique(int? id, string deptCd, string companyCd)
        {
            using (var context = new KyuyoEntities())
            {
                // check table TB_R_WORKING_TIME.
                var dept = (from w in context.TB_M_DEPARTMENT
                            where w.DEPT_CD == deptCd
                               && w.COMPANY_CD == companyCd
                               && (w.ID != id || id == null)
                            select w).FirstOrDefault();

                return dept != null;
            }
        }

        /// <summary>
        /// Gets the by identifier.
        /// </summary>
        /// <param name="Id">The identifier.</param>
        /// <returns></returns>
        public KYDepartmentDto GetById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                // check table TB_R_WORKING_TIME.
                var dept = (from w in context.TB_M_DEPARTMENT
                            where w.ID == id
                            select w).FirstOrDefault();

                return Mapper.Map<KYDepartmentDto>(dept);
            }
        }

        /// <summary>
        /// Updates the specified identifier.
        /// thanhtv
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="companyCd">The company cd.</param>
        /// <param name="deptName">Name of the dept.</param>
        /// <param name="activeFlag">if set to <c>true</c> [active flag].</param>
        /// <param name="updateBy">The update by.</param>
        public void Update(int id, string deptCd, string companyCd, string deptName, bool activeFlag, string updateBy)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new TB_M_DEPARTMENT()
                {
                    ID = id,
                    DEPT_CD = deptCd,
                    DEPT_NAME = deptName,
                    COMPANY_CD = companyCd,
                    ACTIVE_FLAG = activeFlag ? Constant.FLAG_YES : Constant.FLAG_NO,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updateBy
                };

                context.TB_M_DEPARTMENT.Attach(entity);
                context.Entry(entity).State = EntityState.Modified;

                context.SaveChanges();

            }
        }

        /// <summary>
        /// Inserts the specified dept cd.
        /// thanhtv
        /// </summary>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="companyCd">The company cd.</param>
        /// <param name="deptName">Name of the dept.</param>
        /// <param name="activeFlag">if set to <c>true</c> [active flag].</param>
        /// <param name="updateBy">The update by.</param>
        public void Insert(string deptCd, string companyCd, string deptName, bool activeFlag, string updateBy)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new TB_M_DEPARTMENT()
                {
                    DEPT_CD = deptCd,
                    DEPT_NAME = deptName,
                    COMPANY_CD = companyCd,
                    ACTIVE_FLAG = activeFlag ? Constant.FLAG_YES : Constant.FLAG_NO,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = updateBy,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updateBy
                };

                context.TB_M_DEPARTMENT.Add(entity);
                context.Entry(entity).State = EntityState.Added;

                context.SaveChanges();

            }
        }

    }
}
