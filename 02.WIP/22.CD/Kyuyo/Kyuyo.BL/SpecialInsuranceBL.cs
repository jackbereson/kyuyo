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
    /// Class Business Logic for SpecialInsurance
    /// </summary>
    public class SpecialInsuranceBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(SpecialInsuranceBL));

        /// <summary>
        /// Get list of SpecialInsurance
        /// </summary>
        /// <param name="absenceDescription"></param>
        /// <param name="effectiveDtFrom"></param>
        /// <param name="effectiveDtTo"></param>
        /// <returns>List<SpecialInsuranceDto></returns>
        public List<SpecialInsuranceDto> GetSpecialInsurance(string absenceDescription, Nullable<System.DateTime> effectiveDtFrom = null, Nullable<System.DateTime> effectiveDtTo = null)
        {
            using (var context = new KyuyoEntities())
            {
                //var listSpecialInsurance = (from special in context.KY_SPECIAL_INSURANCE_MASTER
                //                            where
                //                               (special.ABSENCE_DESCIPTION.Contains(absenceDescription) || absenceDescription == null)
                //                               && (special.EFFECTIVE_DT >= effectiveDtFrom || effectiveDtFrom == null)
                //                               && (special.EFFECTIVE_DT <= effectiveDtTo || effectiveDtTo == null)
                //                               && (special.DELETE_FLAG == Constant.FLAG_NO)
                //                            orderby special.ABSENCE_NO
                //                            select special).ToList();

                //return Mapper.Map<List<SpecialInsuranceDto>>(listSpecialInsurance);
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cmdText"></param>
        /// <returns></returns>
        protected List<SpecialInsuranceDto> QueryList(string cmdText)
        {
            List<SpecialInsuranceDto> speIn = new List<SpecialInsuranceDto>();
            return speIn;
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
                             where w.DEPT_CD == deptCd// ma bo phan
                             select w).FirstOrDefault();
                if (wtime != null)
                {
                    return true;
                }

                // check table TB_M_EMP_DEPT.
                var edept = (from w in context.TB_M_EMP_DEPT
                             where w.DEPT_CD == deptCd
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
        public SpecialInsuranceDto GetById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                //var dept = (from w in context.KY_SPECIAL_INSURANCE_MASTER
                //            where w.ID == id
                //            select w).FirstOrDefault();

                //return Mapper.Map<SpecialInsuranceDto>(dept);

                return Mapper.Map<SpecialInsuranceDto>(null);
            }
        }
        /// <summary>
        /// update 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="absenceNo"></param>
        /// <param name="absenceDesciption"></param>
        /// <param name="insu_rate"></param>
        /// <param name="effecyiveDt"></param>
        /// <param name="deleteFlag"></param>
        /// <param name="updateDt"></param>
        /// <param name="updateBy"></param>
        public void Update(int id, string absenceNo, string absenceDesciption, string insu_rate, DateTime ? effecyiveDt, bool deleteFlag, string updateBy)
        {
            //using (var context = new KyuyoEntities())
            //{
            //    var entity = new KY_SPECIAL_INSURANCE_MASTER()
            //    {
            //        ID = id,
            //        ABSENCE_NO = absenceNo,
            //        ABSENCE_DESCIPTION = absenceDesciption,
            //        INSU_RATE = insu_rate,
            //        EFFECTIVE_DT = (DateTime) effecyiveDt,
            //        DELETE_FLAG = Constant.FLAG_NO,
            //        //DELETE_FLAG = deleteFlag ? Constant.FLAG_YES : Constant.FLAG_NO,
            //        UPDATED_DT = DateTime.Now,
            //        UPDATED_BY = updateBy
            //    };

            //    context.KY_SPECIAL_INSURANCE_MASTER.Attach(entity);
            //    context.Entry(entity).State = EntityState.Modified;

            //    context.SaveChanges();

            //}
        }

        /// <summary>
        /// Insert to Database
        /// </summary>
        /// <param name="absenceNo"></param>
        /// <param name="absenceDescription"></param>
        /// <param name="insu_rate"></param>
        /// <param name="effecyive_dt"></param>
        /// <param name="updateBy"></param>
        public void Insert(string absenceNo, string absenceDescription, string insu_rate, DateTime? effecyiveDt, string updateBy)
        {
            //using (var context = new KyuyoEntities())
            //{
            //    var entity = new KY_SPECIAL_INSURANCE_MASTER()
            //    {
            //        ABSENCE_NO = absenceNo,
            //        ABSENCE_DESCIPTION = absenceDescription,
            //        INSU_RATE = insu_rate,
            //        EFFECTIVE_DT = (DateTime)effecyiveDt,
            //        DELETE_FLAG = Constant.FLAG_NO,
            //        UPDATED_DT = DateTime.Now,
            //        UPDATED_BY = updateBy,
            //        CREATED_DT = DateTime.Now,
            //        CREATED_BY = updateBy
            //    };

            //    context.KY_SPECIAL_INSURANCE_MASTER.Add(entity);
            //    context.Entry(entity).State = EntityState.Added;

            //    context.SaveChanges();
            //}
        }
        /// <summary>
        /// Delete SpecialInsurance
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedBy"></param>
        public void Delete(int id, string updateBy)
        {
            //using (var context = new KyuyoEntities())
            //{
            //    var entity = new KY_SPECIAL_INSURANCE_MASTER()
            //    {
            //        ID = id,
            //        DELETE_FLAG = Constant.FLAG_YES,
            //        UPDATED_DT = DateTime.Now
            //    };

            //    context.KY_SPECIAL_INSURANCE_MASTER.Attach(entity);
            //    var entry = context.Entry(entity);

            //    entry.Property(e => e.DELETE_FLAG).IsModified = true;
            //    entry.Property(e => e.UPDATED_DT).IsModified = true;
            //    entry.Property(e => e.UPDATED_BY).IsModified = true;

            //    context.SaveChanges();
            //}
        }
        /// <summary>
        /// Get AbsenceDescription
        /// </summary>
        /// <returns>string</returns>
        public string GetAbsenceDescriptions()
        {
            using (var context = new KyuyoEntities())
            {
                //var listAbsenceDescriptions = (from specialInsurance in context.KY_SPECIAL_INSURANCE_MASTER
                //                               where
                //                                 specialInsurance.DELETE_FLAG == Constant.FLAG_NO
                //                                 && specialInsurance.EFFECTIVE_DT == ((from B in context.KY_SPECIAL_INSURANCE_MASTER
                //                                                                       where
                //                                                                         B.DELETE_FLAG == Constant.FLAG_NO
                //                                                                         && B.ABSENCE_NO == specialInsurance.ABSENCE_NO
                //                                                                       select B.EFFECTIVE_DT).Max())
                //                               select new
                //                               {
                //                                   Id = specialInsurance.ID,
                //                                   AbsenceNo = specialInsurance.ABSENCE_NO,
                //                                   AbsenceDescription = specialInsurance.ABSENCE_DESCIPTION
                //                               }).ToList();

                //return JsonConvert.SerializeObject(listAbsenceDescriptions);
                return "";
            }
        }
    }
}
