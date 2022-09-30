namespace Kyuyo.BL
{
    using System.Collections.Generic;
    using System.Linq;
    using AutoMapper;
    using Kyuyo.BL.Utils;
    using Kyuyo.DA;
    using log4net;
    using Core;
    using DTO;
    using System;
    using System.Data.Entity;
    using Newtonsoft.Json;

    /// <summary>
    /// Class Business Logic for LongtermAbsence
    /// </summary>
    public class LongtermAbsenceBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(LongtermAbsenceBL));

        /// <summary>
        /// Get LongtermAbsence
        /// </summary>
        /// <param name="companyId"></param>
        /// <param name="deptCd"></param>
        /// <param name="employeeNo"></param>
        /// <param name="employeeName"></param>
        /// <returns>IEnumerable<object></returns>
        public IEnumerable<object> GetLongtermAbsence(string companyCd, int companyId, string deptCd, string employeeNo, string employeeName)
        {
            using (var context = new KyuyoEntities())
            {
                var listLongtermAbsence = (from longterm in context.KY_LONGTERM_ABSENCE
                                           join employee in context.KY_EMPLOYEE_MASTER on longterm.EMPLOYEE_NO equals employee.EMPLOYEE_NO
                                           join empDept in context.TB_M_EMP_DEPT on longterm.EMPLOYEE_NO equals empDept.EMPLOYEE_NO
                                           join system in context.TB_M_SYSTEM on longterm.ABSENCE_NO equals system.CD
                                           where
                                             system.COMPANY_CD == companyCd
                                             && system.CATEGORY == Constant.LONGTERM_ABSENCE
                                             && system.ACTIVE_FLAG == Constant.FLAG_YES
                                             && employee.COMPANY_ID == companyId
                                             && (empDept.DEPT_CD == deptCd || deptCd == null)
                                             && (employee.EMPLOYEE_NO.Contains(employeeNo) || employeeNo == null)
                                             && (employee.EMPLOYEE_NAME.Contains(employeeName)
                                             || employee.EMPLOYEE_NO_PE.Contains(employeeName) || employeeName == null)
                                             && employee.UPDATED_DT == ((from E in context.KY_EMPLOYEE_MASTER
                                                                         where
                                                                           E.EMPLOYEE_NO == employee.EMPLOYEE_NO
                                                                           && E.DELETE_FLAG == Constant.FLAG_NO
                                                                         select E.UPDATED_DT).Max())
                                             && (empDept.INACTIVE_DT == null || 
                                               empDept.INACTIVE_DT == ((from F in context.TB_M_EMP_DEPT
                                                                          where
                                                                            F.INACTIVE_DT > DateTime.Now
                                                                            && F.DEPT_CD == empDept.DEPT_CD
                                                                            && F.DELETE_FLAG == Constant.FLAG_NO
                                                                          select F.INACTIVE_DT).Min()))
                                            && empDept.MAIN_FLAG == Constant.FLAG_YES
                                            && longterm.DELETE_FLAG == Constant.FLAG_NO
                                            && employee.DELETE_FLAG == Constant.FLAG_NO
                                            && empDept.DELETE_FLAG == Constant.FLAG_NO
                                            && longterm.MAIN_ID == null
                                           select new
                                           {
                                               Id = longterm.ID,
                                               EmployeeNo = longterm.EMPLOYEE_NO,
                                               EmployeeName = employee.EMPLOYEE_NAME,
                                               AbsenceNo = longterm.ABSENCE_NO,
                                               AbsenceDescription = system.REMARK,
                                               FromDt = longterm.FROM_DT,
                                               ToDt = longterm.TO_DT,
                                               StartWorkDt = longterm.START_WORK_DT,
                                               DeleteFlag = longterm.DELETE_FLAG,
                                               CreatedDt = longterm.CREATED_DT,
                                               CreatedBy = longterm.CREATED_BY,
                                               UpdatedDt = longterm.UPDATED_DT,
                                               UpdatedBy = longterm.UPDATED_BY
                                           }).ToList()
                                           .Select(x => new
                                           {
                                               Id = x.Id,
                                               EmployeeNo = x.EmployeeNo,
                                               EmployeeName = x.EmployeeName,
                                               AbsenceNo = x.AbsenceNo,
                                               AbsenceDescription = x.AbsenceDescription,
                                               FromDt = x.FromDt,
                                               ToDt = x.ToDt,
                                               StartWorkDt = x.StartWorkDt,
                                               DeleteFlag = x.DeleteFlag,
                                               CreatedDt = x.CreatedDt,
                                               CreatedBy = x.CreatedBy,
                                               UpdatedDt = x.UpdatedDt.Value.ToString(Constant.DATETIME_FORMAT),
                                               UpdatedBy = x.UpdatedBy
                                           });

                return listLongtermAbsence;
            }
        }

        /// <summary>
        /// Check the holiday already exists
        /// </summary>
        /// <param name="fromDt"></param>
        /// <param name="toDt"></param>
        /// <returns>bool</returns>
        public bool CheckHolidayExists(Nullable<System.DateTime> fromDt = null, Nullable<System.DateTime> toDt = null)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from longtermAbsence in context.KY_LONGTERM_ABSENCE
                              where
                                longtermAbsence.TO_DT >= fromDt
                                && longtermAbsence.FROM_DT <= toDt
                                && longtermAbsence.DELETE_FLAG == Constant.FLAG_NO
                                && longtermAbsence.MAIN_ID == null
                              select longtermAbsence).FirstOrDefault();

                return result != null;
            }
        }

        /// <summary>
        /// Check the holiday already exists
        /// </summary>
        /// <param name="id"></param>
        /// <param name="fromDt"></param>
        /// <param name="toDt"></param>
        /// <returns>bool</returns>
        public bool CheckHolidayExists(int? id, Nullable<System.DateTime> fromDt = null, Nullable<System.DateTime> toDt = null)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from longtermAbsence in context.KY_LONGTERM_ABSENCE
                              where
                                longtermAbsence.TO_DT >= fromDt
                                && longtermAbsence.FROM_DT <= toDt
                                && (longtermAbsence.ID != id)
                                && longtermAbsence.DELETE_FLAG == Constant.FLAG_NO
                                && longtermAbsence.MAIN_ID == null
                              select longtermAbsence).FirstOrDefault();

                return result != null;
            }
        }

        /// <summary>
        /// Insert AbsenceNotPay to Database
        /// </summary>
        /// <param name="employeeNo"></param>
        /// <param name="absenceNo"></param>
        /// <param name="fromDt"></param>
        /// <param name="toDt"></param>
        /// <param name="startWorkDt"></param>
        /// <param name="updatedBy"></param>
        public void Insert(string employeeNo, string absenceNo, DateTime? fromDt, DateTime? toDt, DateTime? startWorkDt, string updatedBy,
            int? mainID, int? historyNo)
        {
            using (var context = new KyuyoEntities())
            {
                var longtermAbsence = new KY_LONGTERM_ABSENCE()
                {
                    EMPLOYEE_NO = employeeNo,
                    ABSENCE_NO = absenceNo,
                    FROM_DT = fromDt,
                    TO_DT = toDt,
                    START_WORK_DT = startWorkDt,
                    DELETE_FLAG = Constant.FLAG_NO,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = updatedBy,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy,
                    MAIN_ID = mainID,
                    HISTORY_NO = historyNo
                };

                context.KY_LONGTERM_ABSENCE.Add(longtermAbsence);
                context.Entry(longtermAbsence).State = EntityState.Added;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Update AbsenceNotPay to Database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="employeeNo"></param>
        /// <param name="absenceNo"></param>
        /// <param name="fromDt"></param>
        /// <param name="toDt"></param>
        /// <param name="startWorkDt"></param>
        /// <param name="updatedBy"></param>
        public void Update(int id, string employeeNo, string absenceNo, DateTime? fromDt, DateTime? toDt, DateTime? startWorkDt, string updatedBy)
        {
            using (var context = new KyuyoEntities())
            {
                var longtermAbsence = new KY_LONGTERM_ABSENCE()
                {
                    ID = id,
                    EMPLOYEE_NO = employeeNo,
                    ABSENCE_NO = absenceNo,
                    FROM_DT = fromDt,
                    TO_DT = toDt,
                    START_WORK_DT = startWorkDt,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_LONGTERM_ABSENCE.Attach(longtermAbsence);
                context.Entry(longtermAbsence).State = EntityState.Modified;
                context.Entry(longtermAbsence).Property(longterm => longterm.DELETE_FLAG).IsModified = false;
                context.Entry(longtermAbsence).Property(longterm => longterm.CREATED_BY).IsModified = false;
                context.Entry(longtermAbsence).Property(longterm => longterm.CREATED_DT).IsModified = false;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete AbsenceNotPay to Database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedBy"></param>
        public void Delete(int id, string updatedBy)
        {
            using (var context = new KyuyoEntities())
            {
                var longtermAbsence = new KY_LONGTERM_ABSENCE()
                {
                    ID = id,
                    DELETE_FLAG = Constant.FLAG_YES,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_LONGTERM_ABSENCE.Attach(longtermAbsence);
                context.Entry(longtermAbsence).Property(longterm => longterm.DELETE_FLAG).IsModified = true;
                context.Entry(longtermAbsence).Property(longterm => longterm.UPDATED_DT).IsModified = true;
                context.Entry(longtermAbsence).Property(longterm => longterm.UPDATED_BY).IsModified = true;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Get LongtermAbsence by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public KYLongtermAbsenceDto GetLongtermAbsenceById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var longtermAbsence = (from longterm in context.KY_LONGTERM_ABSENCE
                                       where longterm.ID == id
                                          && longterm.DELETE_FLAG == Constant.FLAG_NO
                                          && longterm.MAIN_ID == null
                                       select longterm).FirstOrDefault();

                return Mapper.Map<KYLongtermAbsenceDto>(longtermAbsence);
            }
        }

        /// <summary>
        /// Get number of HistoryNo
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int GetNumberHistoryNo(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var longtermAbsence = (from longterm in context.KY_LONGTERM_ABSENCE
                                       where longterm.MAIN_ID == id
                                       select longterm).Count();
                return longtermAbsence;
            }
        }
    }
}
