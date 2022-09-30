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
    /// Class Business Logic for Allowance
    /// </summary>
    public class AllowanceBL
    {
        /// <summary>
        /// Gets all by group cd.
        /// </summary>
        /// <param name="groupCd">The group cd.</param>
        /// <returns></returns>
        public List<KYAllowanceDto> GetAllByGroupCd(string groupCd)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_ALLOWANCE_MASTER
                              where a.GROUP_CD == groupCd && a.DELETE_FLAG == Constant.FLAG_NO
                              select a).ToList();
                return Mapper.Map<List<KYAllowanceDto>>(result);
            }
        }

        public List<KYAllowanceDto> GetAllowanceByCompanyId(int companyId)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from a in context.KY_ALLOWANCE_MASTER
                              where a.COMPANY_ID == companyId
                              && a.DELETE_FLAG == Constant.FLAG_NO
                              && a.MAIN_ID == null
                              && a.EFFECTIVE_DT ==
                              (
                                from t in context.KY_ALLOWANCE_MASTER
                                where t.DELETE_FLAG == Constant.FLAG_NO
                                && t.MAIN_ID == null
                                && t.ALLOWANCE_CD == a.ALLOWANCE_CD
                                select t.EFFECTIVE_DT
                              ).FirstOrDefault()
                              select a).ToList();
                return Mapper.Map<List<KYAllowanceDto>>(result);
            }
        }
    }
}
