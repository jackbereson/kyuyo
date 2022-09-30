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
    /// Class Business Logic for Policy
    /// </summary>
    public class PolicyBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(PolicyBL));

        /// <summary>
        /// Get Policy by search condition
        /// </summary>
        /// <param name="policyName"></param>
        /// <param name="effectiveDtFrom"></param>
        /// <param name="effectiveDtTo"></param>
        /// <returns></returns>
        public List<PolicyDto> GetPolicy(string policyName, Nullable<System.DateTime> effectiveDtFrom = null, Nullable<System.DateTime> effectiveDtTo = null)
        {
            using (var context = new KyuyoEntities())
            {
                var listPolicies = (from policy in context.KY_POLICY_MASTER
                                    where
                                       (policy.EFFECTIVE_DT >= effectiveDtFrom || effectiveDtFrom == null)
                                       && (policy.EFFECTIVE_DT <= effectiveDtTo || effectiveDtTo == null)
                                       && (policy.POLICY_NAME.Contains(policyName) || policyName == null)
                                       && (policy.DELETE_FLAG == Constant.FLAG_NO)
                                    select policy).ToList();
                return Mapper.Map<List<PolicyDto>>(listPolicies);
            }
        }

        /// <summary>
        /// Get Group Name
        /// </summary>
        /// <returns>string</returns>
        public string GetGroupName()
        {
            using (var context = new KyuyoEntities())
            {
                var listGroupNames = (from policy in context.KY_POLICY_MASTER
                                      where
                                         policy.DELETE_FLAG == Constant.FLAG_NO
                                      select new { GroupName = policy.GROUP_NAME }).Distinct().ToList();
                return JsonConvert.SerializeObject(listGroupNames);
            }
        }

        /// <summary>
        /// Get Reference
        /// </summary>
        /// <returns>string</returns>
        public string GetReferences()
        {
            using (var context = new KyuyoEntities())
            {
                var listReferences = (from policy in context.KY_POLICY_MASTER
                                      where
                                        policy.POLICY_TYPE == Constant.FLAG_NO
                                        && policy.DELETE_FLAG == Constant.FLAG_NO
                                        && policy.EFFECTIVE_DT == ((from B in context.KY_POLICY_MASTER
                                                                    where
                                                                     B.POLICY_TYPE == Constant.FLAG_NO
                                                                     && B.DELETE_FLAG == Constant.FLAG_NO
                                                                     && B.POLICY_CD == policy.POLICY_CD
                                                                    select B.EFFECTIVE_DT).Max())
                                      select new { PolicyCd = policy.POLICY_CD, PolicyName = policy.POLICY_NAME }).ToList();

                return JsonConvert.SerializeObject(listReferences);
            }
        }

        /// <summary>
        /// Gets the type of the policy by.
        /// thanhtv
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public List<PolicyDto> GetPolicyByType(string type)
        {
            using (var context = new KyuyoEntities())
            {
                var result = (from p in context.KY_POLICY_MASTER
                              where p.POLICY_TYPE == type && p.DELETE_FLAG == Constant.FLAG_NO
                              select p).ToList();
                return Mapper.Map<List<PolicyDto>>(result);
            }
        }
    }
}
