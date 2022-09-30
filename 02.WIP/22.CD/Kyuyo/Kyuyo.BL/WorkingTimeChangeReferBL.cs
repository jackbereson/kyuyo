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
    /// Class Business Logic for WorkingTimeChangeRefer
    /// </summary>
    public class WorkingTimeChangeReferBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(WorkingTimeChangeReferBL));

        /// <summary>
        /// Get WorkingTimeChangeRefer
        /// </summary>
        /// <param name="companyCd"></param>
        /// <param name="fromWorkingDate"></param>
        /// <param name="toWorkingDate"></param>
        /// <returns></returns>
        public List<WorkingTimeChangeReferDto> GetWorkingTimeChangeRefer(string companyCd, DateTime fromWorkingDate, DateTime toWorkingDate)
        {
            using (var context = new KyuyoEntities())
            {
                var listWorkingTimeChangeRefer = (from workingTimeHis in context.TB_R_WORKING_TIME_HIS
                                                  join employee in context.KY_EMPLOYEE_MASTER
                                                    on workingTimeHis.EMPLOYEE_NO equals employee.EMPLOYEE_NO
                                                  where
                                                    employee.DELETE_FLAG == Constant.FLAG_NO
                                                    && workingTimeHis.COMPANY_CD == companyCd
                                                    && workingTimeHis.WORKING_DATE >= fromWorkingDate
                                                    && workingTimeHis.WORKING_DATE <= toWorkingDate
                                                  orderby workingTimeHis.EMPLOYEE_NO
                                                  select new WorkingTimeChangeReferDto()
                                                  {
                                                      EmployeeNoPe = employee.EMPLOYEE_NO_PE,
                                                      EmployeeNo = workingTimeHis.EMPLOYEE_NO,
                                                      EmployeeName = employee.EMPLOYEE_NAME,
                                                      WorkingDate = workingTimeHis.WORKING_DATE,
                                                      WorkingTime = workingTimeHis.WORKING_TIME,
                                                      AbsenceTime = workingTimeHis.ABSENCE_TIME,
                                                      TotalOtTime = workingTimeHis.TOTAL_OT_TIME,
                                                      LateOtTime = workingTimeHis.LATE_OT_TIME,
                                                      TotalLateTime = workingTimeHis.TOTAL_LATE_TIME,
                                                      DeductedUnpaid = workingTimeHis.DEDUCTED_UNPAID,
                                                      DeductedPaid = workingTimeHis.DEDUCTED_PAID,
                                                      WorkingType = workingTimeHis.WORKING_TYPE,
                                                      IsInExcelFile = false
                                                  });

                return listWorkingTimeChangeRefer.ToList();
            }
        }

        /// <summary>
        /// Deletes the specified identifier.
        /// </summary>
        /// <param name="yearMonth"></param>
        public void DeleteWorkingTimeHisByYearMonth(string yearMonth)
        {
            using (var context = new KyuyoEntities())
            {
                context.TB_R_WORKING_TIME_HIS.RemoveRange(context.TB_R_WORKING_TIME_HIS.Where(a => a.YEAR_MONTH == yearMonth));
                context.SaveChanges();
            }
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="dto"></param>
        public void InsertDataImport(WorkingTimeChangeReferDto dto, string yearMonth)
        {
            using (var context = new KyuyoEntities())
            {
                List<TB_R_WORKING_TIME_HIS> entitys = new List<TB_R_WORKING_TIME_HIS>();
                var entity1 = new TB_R_WORKING_TIME_HIS()
                {
                    COMPANY_CD = dto.CompanyCd,
                    EMPLOYEE_NO = dto.EmployeeNoPe,
                    WORKING_DATE = DateTimeFormat.ToDateTime(dto.WorkingDateStr).Value,
                    TOTAL_LATE_TIME = DecimalFormat.Parse(dto.TotalLateDifference),
                    DEDUCTED_UNPAID = DecimalFormat.Parse(dto.NoSalaryHourDifference),
                    WORKING_TYPE = dto.WkDateTypeFileExcel,
                    YEAR_MONTH = yearMonth,
                    CREATED_DT = DateTime.Now,
                    UPDATED_DT = DateTime.Now
                };

                if(dto.WkDateTypeFileExcel.Equals(dto.WkDateTypeSystem))
                {
                    entity1.TOTAL_OT_TIME = DecimalFormat.Parse(dto.TotalOtDifference);
                    entity1.LATE_OT_TIME = DecimalFormat.Parse(dto.TotalOtLateDifference);
                }
                else
                {
                    entity1.TOTAL_OT_TIME = dto.TotalOtFileExcel;
                    entity1.LATE_OT_TIME = dto.TotalOtLateFileExcel;

                    var entity2 = new TB_R_WORKING_TIME_HIS()
                    {
                        COMPANY_CD = dto.CompanyCd,
                        EMPLOYEE_NO = dto.EmployeeNoPe,
                        WORKING_DATE = DateTimeFormat.ToDateTime(dto.WorkingDateStr).Value,
                        TOTAL_OT_TIME = -dto.TotalOtSystem,
                        LATE_OT_TIME = -dto.TotalLateSystem,
                        WORKING_TYPE = dto.WkDateTypeFileExcel,
                        YEAR_MONTH = yearMonth,
                        CREATED_DT = DateTime.Now,
                        UPDATED_DT = DateTime.Now
                    };

                    entitys.Add(entity2);
                }

                entitys.Add(entity1);
               

                context.TB_R_WORKING_TIME_HIS.AddRange(entitys);
                foreach (var item in entitys)
                {
                    context.Entry(item).State = EntityState.Added;
                }
                try
                {
                    context.SaveChanges();
                }
                catch (Exception e)
                {
                    int x = 2;
                }
              
                
            }

        }


    }
}