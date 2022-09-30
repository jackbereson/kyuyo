using AutoMapper;
using Kyuyo.BL.DTO;
using Kyuyo.DA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kyuyo.BL.Utils;


namespace Kyuyo.BL
{
    public class WorkingTimeBL
    {
        /// <summary>
        /// Deletes the working time.
        /// </summary>
        /// <param name="companyCd">The company cd.</param>
        /// <param name="listEmployeeNo">The list employee no.</param>
        /// <param name="startDt">The start dt.</param>
        /// <param name="endDt">The end dt.</param>
        public void DeleteWorkingTime(string companyCd, List<string> listEmployeeNo, DateTime startDt, DateTime endDt, bool isUpdate)
        {
            using (var context = new KyuyoEntities())
            {
                var query = context.TB_R_WORKING_TIME.Where(
                    a => a.COMPANY_CD == companyCd
                     && (!isUpdate || listEmployeeNo.Contains(a.EMPLOYEE_NO))
                     && a.WORKING_DATE >= startDt
                     && a.WORKING_DATE <= endDt
                    );
                context.TB_R_WORKING_TIME.RemoveRange(query);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Inserts the specified list dto.
        /// </summary>
        /// <param name="listDto">The list dto.</param>
        public void Insert(List<KYWorkingTimeDto> listDto)
        {
            using (var context = new KyuyoEntities())
            {
                var entities = Mapper.Map<List<TB_R_WORKING_TIME>>(listDto);
                context.TB_R_WORKING_TIME.AddRange(entities);
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Get WorkingTime
        /// </summary>
        /// <param name="companyCd"></param>
        /// <param name="fromWorkingDate"></param>
        /// <param name="toWorkingDate"></param>
        /// <returns></returns>
        public List<KYWorkingTimeDto> GetWorkingTime(string companyCd, DateTime fromWorkingDate, DateTime toWorkingDate)
        {
            using (var context = new KyuyoEntities())
            {
                var listWorkingTime = (from workingTime in context.TB_R_WORKING_TIME
                                       where workingTime.COMPANY_CD == companyCd
                                         && workingTime.WORKING_DATE >= fromWorkingDate
                                         && workingTime.WORKING_DATE <= toWorkingDate
                                         && workingTime.STATUS == Constant.CONFIRMED
                                       select workingTime).ToList();
                return Mapper.Map<List<KYWorkingTimeDto>>(listWorkingTime);
            }
        }
    }
}
