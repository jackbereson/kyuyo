using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.Infrastructure.Core;

namespace Kyuyo.Controllers.Api.Bonus
{
    /// <summary>
    /// Class process request API for Bonus
    /// </summary>
    public class BonusRequest : RequestBase
    {
        public BonusRequest()
        {
            this.validator = new BonusValidator();
        }
        public int? Id { get; set; }
        public string EmployeeNo { get; set; }
        public string PayType { get; set; }
        public string PayDesc { get; set; }
        public string Value { get; set; }
        public string Unit { get; set; }
        public string YearMonth { get; set; }
        public string DistributionFlag { get; set; }
        public string DistributionMonths { get; set; }
        public string UpdatedDt { get; set; }
        public int CompanyId { get; set; }
    }

    /// <summary>
    /// BonusSearchRequest
    /// </summary>
    public class BonusSearchRequest : RequestBase
    {
        public BonusSearchRequest()
        {
            this.validator = new BonusSearchValidator();
        }
        public string YearMonth { get; set; }
        public int CompanyId { get; set; }
        public string PayDesc { get; set; }
    }
}