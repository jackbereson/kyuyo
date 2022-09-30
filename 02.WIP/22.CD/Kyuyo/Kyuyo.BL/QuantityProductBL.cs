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
    /// Class Business Logic for QuantityProduct
    /// </summary>
    public class QuantityProductBL
    {
        // Logger
        private readonly ILog logger = LogManager.GetLogger(typeof(QuantityProductBL));

        /// <summary>
        /// Get QuantityProduct
        /// </summary>
        /// <param name="companyCd"></param>
        /// <param name="yearMonth"></param>
        /// <returns>QuantityProductDto</returns>
        public QuantityProductDto GetQuantityProduct(string companyCd, string yearMonth)
        {
            using (var context = new KyuyoEntities())
            {
                var quantityProduct = (from quantity in context.KY_QUANTITY_PRODUCT
                                       where quantity.COMPANY_CD == companyCd
                                         && quantity.YEAR_MONTH == yearMonth
                                       select quantity).FirstOrDefault();
                return Mapper.Map<QuantityProductDto>(quantityProduct);
            }
        }
    }
}
