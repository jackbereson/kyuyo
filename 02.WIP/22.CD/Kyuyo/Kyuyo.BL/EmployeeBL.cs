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
using Newtonsoft.Json;

namespace Kyuyo.BL
{
    /// <summary>
    /// 
    /// </summary>
    public class EmployeeBL
    {

        /// <summary>
        /// Searches the employee.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="employeeName">Name of the employee.</param>
        /// <param name="includeQuitFlag">if set to <c>true</c> [include quit flag].</param>
        /// <param name="effectiveDtFrom">The effective dt from.</param>
        /// <param name="effectiveDtTo">The effective dt to.</param>
        /// <returns></returns>
        public List<KYEmployeeDto> SearchEmployee(int companyId, string deptCd, string employeeNo, string employeeName, bool includeQuitFlag = false, Nullable<System.DateTime> effectiveDtFrom = null, Nullable<System.DateTime> effectiveDtTo = null)
        {
            using (var context = new KyuyoEntities())
            {
                var result = context.SearchEmployee(companyId, deptCd, employeeNo, employeeName, includeQuitFlag ? Constant.FLAG_YES : Constant.FLAG_NO, effectiveDtFrom, effectiveDtTo);
                return Mapper.Map<List<KYEmployeeDto>>(result);
            }
        }

        /// <summary>
        /// Gets all by companyId.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public List<KYEmployeeDto> GetAllByCompanyId(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from e in context.KY_EMPLOYEE_MASTER
                              where e.COMPANY_ID == companyId && e.DELETE_FLAG == Constant.FLAG_NO
                              select e).ToList();

                return Mapper.Map<List<KYEmployeeDto>>(result);
            }
        }

        /// <summary>
        /// Get Employee without Department
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="employeeNo"></param>
        /// <param name="employeeName"></param>
        /// <returns></returns>
        public string GetEmployeeWithOutDepartment(int companyId, string employeeNo, string employeeName)
        {
            using (var context = new KyuyoEntities())
            {
                var listEmployees = (from employee in context.KY_EMPLOYEE_MASTER
                                     where
                                      employee.COMPANY_ID == companyId
                                      && (employee.EMPLOYEE_NO.Contains(employeeNo) || employeeNo == null)
                                      && (employee.EMPLOYEE_NAME.Contains(employeeName) || employeeName == null)
                                      && employee.UPDATED_DT == (from e in context.KY_EMPLOYEE_MASTER
                                                                 where e.EMPLOYEE_NO == employee.EMPLOYEE_NO
                                                                    && e.DELETE_FLAG == Constant.FLAG_NO
                                                                 select e.UPDATED_DT).Max()
                                     && employee.DELETE_FLAG == Constant.FLAG_NO
                                     select new
                                     {
                                         Id = employee.ID,
                                         CompanyId = employee.COMPANY_ID,
                                         EmployeeNo = employee.EMPLOYEE_NO,
                                         EmployeeName = employee.EMPLOYEE_NAME
                                     }).ToList();
                return JsonConvert.SerializeObject(listEmployees);
            }
        }

        /// <summary>
        /// Gets the dept by employee no.
        /// thanhtv
        /// </summary>
        /// <param name="employeeNo">The employee no.</param>
        /// <returns></returns>
        public List<EmpDeptDto> GetDeptByEmployeeNo(string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from d in context.TB_M_EMP_DEPT
                              where d.EMPLOYEE_NO == employeeNo
                                 && d.DELETE_FLAG == Constant.FLAG_NO
                              select d).ToList();

                return Mapper.Map<List<EmpDeptDto>>(result);
            }
        }

        public EmpDeptDto GetDeptByEmpDeptId(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from d in context.TB_M_EMP_DEPT
                              where d.ID == id
                                 && d.DELETE_FLAG == Constant.FLAG_NO
                              select d).FirstOrDefault();
                return Mapper.Map<EmpDeptDto>(result);
            }
        }

        /// <summary>
        /// Gets the employee taglib.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="employeeName">Name of the employee.</param>
        /// <returns></returns>
        public List<KYEmployeeDto> GetEmployeeTaglib(int companyId, string deptCd, string employeeNo, string employeeName)
        {
            using (var context = new KyuyoEntities())
            {
                var listEmployees = (from employee in context.KY_EMPLOYEE_MASTER
                                     from empdept in context.TB_M_EMP_DEPT
                                     where
                                         employee.EMPLOYEE_NO == empdept.EMPLOYEE_NO
                                      && empdept.MAIN_FLAG == Constant.FLAG_YES
                                      && employee.COMPANY_ID == companyId
                                      && (empdept.DEPT_CD == deptCd || deptCd == null)
                                      && (employee.EMPLOYEE_NO.Contains(employeeNo) || employeeNo == null)
                                      && (employee.EMPLOYEE_NAME.Contains(employeeName) || employeeName == null)
                                      && employee.UPDATED_DT == (from e in context.KY_EMPLOYEE_MASTER
                                                                 where e.EMPLOYEE_NO == employee.EMPLOYEE_NO
                                                                    && e.DELETE_FLAG == Constant.FLAG_NO
                                                                 select e.UPDATED_DT).Max()
                                     && employee.DELETE_FLAG == Constant.FLAG_NO
                                     && empdept.DELETE_FLAG == Constant.FLAG_NO
                                     select employee).ToList();
                return Mapper.Map<List<KYEmployeeDto>>(listEmployees);
            }
        }

        /// <summary>
        /// Gets the by identifier.
        /// thanhtv
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public KYEmployeeDto GetById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from e in context.KY_EMPLOYEE_MASTER
                              where e.ID == id
                                 && e.DELETE_FLAG == Constant.FLAG_NO
                              select e).FirstOrDefault();
                return Mapper.Map<KYEmployeeDto>(result);
            }
        }

        /// <summary>
        /// Get KYEmployeeDto by employeeNo.
        /// </summary>
        /// <param name="employeeNo">The employee no.</param>
        /// <returns></returns>
        public KYEmployeeDto GetByEmployeeNo(string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from e in context.KY_EMPLOYEE_MASTER
                              where e.EMPLOYEE_NO == employeeNo
                              select e).FirstOrDefault();
                return Mapper.Map<KYEmployeeDto>(result);
            }
        }

        /// <summary>
        /// Get KYEmployeeDto by employeeName.
        /// </summary>
        /// <param name="employeeName">Name of the employee.</param>
        /// <returns></returns>
        public KYEmployeeDto GetByEmployeeName(string employeeName)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from e in context.KY_EMPLOYEE_MASTER
                              where e.EMPLOYEE_NAME == employeeName
                              select e).FirstOrDefault();
                return Mapper.Map<KYEmployeeDto>(result);
            }
        }

        /// <summary>
        /// Inserts the specified dto.
        /// </summary>
        /// <param name="dto">The dto.</param>
        /// <param name="employeeNo">The employee no.</param>
        public void Insert(KYEmployeeDto dto, string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = Mapper.Map<KY_EMPLOYEE_MASTER>(dto);

                entity.CREATED_DT = entity.UPDATED_DT = DateTime.Now;
                entity.CREATED_BY = entity.CREATED_BY = employeeNo;

                context.KY_EMPLOYEE_MASTER.Add(entity);
                context.Entry(entity).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        /// <summary>
        /// Checks the main dept.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="startDt">The start dt.</param>
        /// <param name="inactiveDate">The inactive date.</param>
        /// <returns></returns>
        public bool CheckMainDept(int? id, string employeeNo, DateTime startDt, DateTime? inactiveDate)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from d in context.TB_M_EMP_DEPT
                              where (d.ID != id || id == null)
                                  && d.EMPLOYEE_NO == employeeNo
                                  && d.MAIN_FLAG == Constant.FLAG_YES
                                  && (d.INACTIVE_DT == null || d.INACTIVE_DT >= startDt)
                                  && (d.START_DT <= inactiveDate || inactiveDate == null)
                                  && (d.DELETE_FLAG == Constant.FLAG_NO)
                              select d).FirstOrDefault();

                return result != null;
            }
        }

        /// <summary>
        /// Inserts the emp dept.
        /// </summary>
        /// <param name="companyCd">The company cd.</param>
        /// <param name="deptCd">The dept cd.</param>
        /// <param name="deptName">Name of the dept.</param>
        /// <param name="employeeNo">The employee no.</param>
        /// <param name="title">The title.</param>
        /// <param name="startDt">The start dt.</param>
        /// <param name="inactiveDate">The inactive date.</param>
        /// <param name="mainFlag">if set to <c>true</c> [main flag].</param>
        /// <param name="updateBy">The update by.</param>
        public void InsertEmpDept(string companyCd, string deptCd, string employeeNo, string title,
                            DateTime startDt, DateTime? inactiveDate, bool mainFlag, string updateBy)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new TB_M_EMP_DEPT()
                {
                    COMPANY_CD = companyCd,
                    DEPT_CD = deptCd,
                    EMPLOYEE_NO = employeeNo,
                    TITLE = title,
                    MAIN_FLAG = mainFlag ? Constant.FLAG_YES : Constant.FLAG_NO,
                    START_DT = startDt,
                    INACTIVE_DT = inactiveDate,
                    DELETE_FLAG = Constant.FLAG_NO,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = updateBy,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updateBy
                };

                context.TB_M_EMP_DEPT.Add(entity);
                context.Entry(entity).State = EntityState.Added;

                context.SaveChanges();
            }
        }

        public void UpdateEmpDept(int id, DateTime startDt, DateTime? inactiveDate, bool mainFlag, string updateBy)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new TB_M_EMP_DEPT()
                {
                    ID = id,
                    MAIN_FLAG = mainFlag ? Constant.FLAG_YES : Constant.FLAG_NO,
                    START_DT = startDt,
                    INACTIVE_DT = inactiveDate,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updateBy
                };

                context.TB_M_EMP_DEPT.Attach(entity);
                var entry = context.Entry(entity);

                entry.Property(e => e.MAIN_FLAG).IsModified = true;
                entry.Property(e => e.START_DT).IsModified = true;
                entry.Property(e => e.INACTIVE_DT).IsModified = true;
                entry.Property(e => e.UPDATED_DT).IsModified = true;
                entry.Property(e => e.UPDATED_BY).IsModified = true;

                context.SaveChanges();
            }
        }

        public void DeleteEmpDept(int id, string updateBy)
        {
            using (var context = new KyuyoEntities())
            {
                var entity = new TB_M_EMP_DEPT()
                {
                    ID = id,
                    DELETE_FLAG = Constant.FLAG_YES,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updateBy
                };

                context.TB_M_EMP_DEPT.Attach(entity);
                var entry = context.Entry(entity);

                entry.Property(e => e.DELETE_FLAG).IsModified = true;
                entry.Property(e => e.UPDATED_DT).IsModified = true;
                entry.Property(e => e.UPDATED_BY).IsModified = true;

                context.SaveChanges();
            }
        }

        /// <summary>
        /// getEmployeeByName
        /// </summary>
        /// <param name="employeeName"></param>
        /// <returns></returns>
        public List<KYEmployeeDto> GetEmployeeByName(string employeeName)
        {
            using (var context = new KyuyoEntities())
            {
                var listEmployees = (from employee in context.KY_EMPLOYEE_MASTER
                                     where
                                     employee.EMPLOYEE_NAME.Contains(employeeName)
                                     && employee.DELETE_FLAG == Constant.FLAG_NO
                                     select employee).ToList();
                return Mapper.Map<List<KYEmployeeDto>>(listEmployees);
            }
        }

        /// <summary>
        /// Gets the employee by company identifier.
        /// </summary>
        /// <param name="companyId">The company identifier.</param>
        /// <returns></returns>
        public List<KYEmployeeDto> GetEmployeeByCompanyId(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var listEmployees = (from employee in context.KY_EMPLOYEE_MASTER
                                     where
                                     employee.COMPANY_ID == companyId
                                     && employee.DELETE_FLAG == Constant.FLAG_NO
                                     select employee).ToList();
                return Mapper.Map<List<KYEmployeeDto>>(listEmployees);
            }
        }

        /// <summary>
        /// Check Employee Exists 
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="employeeNo"></param>
        /// <returns></returns>
        public bool CheckEmployeeExists(int companyId, string employeeNo)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from employee in context.KY_EMPLOYEE_MASTER
                              where
                                employee.EMPLOYEE_NO == employeeNo
                                && employee.COMPANY_ID == companyId
                                && employee.DELETE_FLAG == Constant.FLAG_NO
                              select employee).FirstOrDefault();
                return result != null;
            }
        }
    }
}
