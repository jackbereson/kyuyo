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
    /// Class Business Logic for SalaryFormula
    /// </summary>
    public class SalaryFormulaBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(SalaryFormulaBL));


        public KYSalaryFormulaDto GetSalaryFormula(int companyId, DateTime startDate, DateTime endDate)
        {
            using (var context = new KyuyoEntities())
            {
                var salaryFormula = (from salaryFor in context.KY_SALARY_FORMULA_MASTER
                                     where
                                       salaryFor.DELETE_FLAG == Constant.FLAG_NO
                                       && salaryFor.MAIN_ID == null
                                       && salaryFor.COMPANY_ID == companyId
                                       && ((salaryFor.EFFECTIVE_DT > startDate && salaryFor.EFFECTIVE_DT <= endDate)
                                        || salaryFor.EFFECTIVE_DT == (from a1 in context.KY_SALARY_FORMULA_MASTER
                                                                      where
                                                                            a1.DELETE_FLAG == Constant.FLAG_NO
                                                                            && a1.MAIN_ID == null
                                                                            && a1.COMPANY_ID == companyId
                                                                            && a1.EFFECTIVE_DT <= startDate
                                                                      select a1.EFFECTIVE_DT).Max())
                                     select salaryFor).FirstOrDefault();
                return Mapper.Map<KYSalaryFormulaDto>(salaryFormula);
            }
        }
    }
}
