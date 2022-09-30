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
    /// Class Business Logic for OtherPay
    /// </summary>
    public class OtherPayBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(OtherPayBL));

        /// <summary>
        /// Get Bonus
        /// </summary>
        /// <param name="yearMonth"></param>
        /// <param name="companyId"></param>
        /// <param name="payDesc"></param>
        /// <returns></returns>
        public IEnumerable<object> GetBonus(string yearMonth, int companyId, string payDesc)
        {
            using (var context = new KyuyoEntities())
            {
                var listOtherPay = (from otherPay in context.KY_OTHER_PAY
                                    join employee in context.KY_EMPLOYEE_MASTER on otherPay.EMPLOYEE_NO equals employee.EMPLOYEE_NO
                                    where
                                      employee.UPDATED_DT == ((from E in context.KY_EMPLOYEE_MASTER
                                                               where
                                                                 E.EMPLOYEE_NO == employee.EMPLOYEE_NO
                                                                 && E.DELETE_FLAG == Constant.FLAG_NO
                                                               select E.UPDATED_DT).Max())
                                      && otherPay.YEAR_MONTH == yearMonth
                                      && employee.COMPANY_ID == companyId
                                      && (otherPay.PAY_DESC.Contains(payDesc) || payDesc == null)
                                      && otherPay.PAY_TYPE == Constant.FLAG_YES
                                      && otherPay.DELETE_FLAG == Constant.FLAG_NO
                                    select new
                                    {
                                        Id = otherPay.ID,
                                        EmployeeNo = otherPay.EMPLOYEE_NO,
                                        EmployeeName = employee.EMPLOYEE_NAME,
                                        PayType = otherPay.PAY_TYPE,
                                        PayDesc = otherPay.PAY_DESC,
                                        Value = otherPay.VALUE,
                                        Unit = otherPay.UNIT,
                                        YearMonth = otherPay.YEAR_MONTH,
                                        ArreaYearMonth = otherPay.ARREA_YEAR_MONTH,
                                        DeleteFlag = otherPay.DELETE_FLAG,
                                        DistributionFlag = otherPay.DISTRIBUTION_FLAG,
                                        DistributionMonths = otherPay.DISTRIBUTION_MONTHS,
                                        CreatedDt = otherPay.CREATED_DT,
                                        CreatedBy = otherPay.CREATED_BY,
                                        UpdatedDt = otherPay.UPDATED_DT,
                                        UpdatedBy = otherPay.UPDATED_BY
                                    }).ToList()
                                     .Select(x => new
                                     {
                                         Id = x.Id,
                                         EmployeeNo = x.EmployeeNo,
                                         EmployeeName = x.EmployeeName,
                                         PayType = x.PayType,
                                         PayDesc = x.PayDesc,
                                         Value = x.Value,
                                         Unit = x.Unit,
                                         YearMonth = x.YearMonth,
                                         ArreaYearMonth = x.ArreaYearMonth,
                                         DeleteFlag = x.DeleteFlag,
                                         DistributionFlag = x.DistributionFlag,
                                         DistributionMonths = x.DistributionMonths,
                                         CreatedDt = x.CreatedDt,
                                         CreatedBy = x.CreatedBy,
                                         UpdatedDt = x.UpdatedDt.Value.ToString(Constant.DATETIME_FORMAT),
                                         UpdatedBy = x.UpdatedBy
                                     });

                return listOtherPay;
            }
        }

        /// <summary>
        /// Get Descriptions
        /// </summary>
        /// <returns></returns>
        public IEnumerable<object> GetDescriptions()
        {
            using (var context = new KyuyoEntities())
            {
                var listOtherPay = (from otherPay in context.KY_OTHER_PAY
                                    where
                                      otherPay.PAY_TYPE == Constant.FLAG_YES
                                      && otherPay.DELETE_FLAG == Constant.FLAG_NO
                                    select new
                                    {
                                        Id = otherPay.ID,
                                        PayDesc = otherPay.PAY_DESC
                                    }).ToList();

                return listOtherPay;
            }
        }

        /// <summary>
        /// Insert OtherPay to Database
        /// </summary>
        /// <param name="employeeNo"></param>
        /// <param name="payType"></param>
        /// <param name="payDesc"></param>
        /// <param name="value"></param>
        /// <param name="unit"></param>
        /// <param name="yearMonth"></param>
        /// <param name="distributionFlag"></param>
        /// <param name="distributionMonths"></param>
        /// <param name="updatedBy"></param>
        public void Insert(string employeeNo, string payType, string payDesc, decimal value, string unit,
            string yearMonth, string distributionFlag, decimal? distributionMonths, string updatedBy)
        {
            using (var context = new KyuyoEntities())
            {
                var otherPay = new KY_OTHER_PAY()
                {
                    EMPLOYEE_NO = employeeNo,
                    PAY_TYPE = payType,
                    PAY_DESC = payDesc,
                    VALUE = value,
                    UNIT = unit,
                    YEAR_MONTH = yearMonth,
                    DISTRIBUTION_FLAG = distributionFlag,
                    DISTRIBUTION_MONTHS = distributionMonths,
                    DELETE_FLAG = Constant.FLAG_NO,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = updatedBy,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_OTHER_PAY.Add(otherPay);
                context.Entry(otherPay).State = EntityState.Added;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Update OtherPay to Database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="employeeNo"></param>
        /// <param name="payDesc"></param>
        /// <param name="value"></param>
        /// <param name="unit"></param>
        /// <param name="distributionFlag"></param>
        /// <param name="distributionMonths"></param>
        /// <param name="updatedBy"></param>
        public void Update(int id, string employeeNo, string payDesc, decimal value, string unit,
            string distributionFlag, decimal? distributionMonths, string updatedBy)
        {
            using (var context = new KyuyoEntities())
            {
                var otherPay = new KY_OTHER_PAY()
                {
                    ID = id,
                    EMPLOYEE_NO = employeeNo,
                    PAY_DESC = payDesc,
                    VALUE = value,
                    UNIT = unit,
                    DISTRIBUTION_FLAG = distributionFlag,
                    DISTRIBUTION_MONTHS = distributionMonths,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_OTHER_PAY.Attach(otherPay);
                context.Entry(otherPay).State = EntityState.Modified;
                context.Entry(otherPay).Property(other => other.PAY_TYPE).IsModified = false;
                context.Entry(otherPay).Property(other => other.YEAR_MONTH).IsModified = false;
                context.Entry(otherPay).Property(other => other.ARREA_YEAR_MONTH).IsModified = false;
                context.Entry(otherPay).Property(other => other.DELETE_FLAG).IsModified = false;
                context.Entry(otherPay).Property(other => other.CREATED_BY).IsModified = false;
                context.Entry(otherPay).Property(other => other.CREATED_DT).IsModified = false;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete OtherPay to Database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedBy"></param>
        public void Delete(int id, string updatedBy)
        {
            using (var context = new KyuyoEntities())
            {
                var otherPay = new KY_OTHER_PAY()
                {
                    ID = id,
                    DELETE_FLAG = Constant.FLAG_YES,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = updatedBy
                };

                context.KY_OTHER_PAY.Attach(otherPay);
                context.Entry(otherPay).Property(other => other.DELETE_FLAG).IsModified = true;
                context.Entry(otherPay).Property(other => other.UPDATED_DT).IsModified = true;
                context.Entry(otherPay).Property(other => other.UPDATED_BY).IsModified = true;
                context.SaveChanges();
            }
        }

        /// <summary>
        /// Get Bonus by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public OtherPayDto GetBonusById(int id)
        {
            using (var context = new KyuyoEntities())
            {
                var otherPay = (from other in context.KY_OTHER_PAY
                                where other.ID == id
                                   && other.DELETE_FLAG == Constant.FLAG_NO
                                select other).FirstOrDefault();

                return Mapper.Map<OtherPayDto>(otherPay);
            }
        }

        /// <summary>
        /// Insert OtherPay to Database by OtherPayDto
        /// </summary>
        /// <param name="otherPayDto"></param>
        public void Insert(OtherPayDto otherPayDto)
        {
            using (var context = new KyuyoEntities())
            {
                var otherPay = new KY_OTHER_PAY()
                {
                    EMPLOYEE_NO = otherPayDto.EmployeeNo,
                    PAY_TYPE = otherPayDto.PayType,
                    PAY_DESC = otherPayDto.PayDesc,
                    VALUE = Convert.ToDecimal(otherPayDto.Value),
                    UNIT = otherPayDto.Unit,
                    YEAR_MONTH = otherPayDto.YearMonth,
                    DISTRIBUTION_FLAG = otherPayDto.DistributionFlag,
                    DISTRIBUTION_MONTHS = Convert.ToDecimal(otherPayDto.DistributionMonths),
                    DELETE_FLAG = Constant.FLAG_NO,
                    CREATED_DT = DateTime.Now,
                    CREATED_BY = otherPayDto.UpdatedBy,
                    UPDATED_DT = DateTime.Now,
                    UPDATED_BY = otherPayDto.UpdatedBy
                };

                context.KY_OTHER_PAY.Add(otherPay);
                context.Entry(otherPay).State = EntityState.Added;
                context.SaveChanges();
            }
        }
    }
}
