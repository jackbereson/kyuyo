using Kyuyo.BL.DTO;
using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.SalaryCalculate
{
    public class SalaryCalculateRequest : RequestBase
    {
        public SalaryCalculateRequest()
        {
            this.validator = new SalaryCalculateValidator();
        }

        public int CompanyId { get; set; }
        public string YearMonth { get; set; }
        public string EmployeeNo { get; set; }
        public string Status { get; set; }
        public decimal? Other { get; set; }
        public string OtherUnit { get; set; }
        public string OtherRemark { get; set; }
        public decimal? Sabbtical100 { get; set; }
        public decimal? Sabbtical300 { get; set; }

        // check exclucive list
        public List<BaseDto> UpdatedDts { get; set; }
    }

    public class SalaryCalculateSearchRequest : RequestBase
    {
        public SalaryCalculateSearchRequest()
        {
            this.validator = new SalaryCalculateSearchValidator();
        }

        public int CompanyId { get; set; }
        public string YearMonth { get; set; }

        

    }

    public class SalaryCalculateConfirmRequest : SalaryCalculateSearchRequest
    {
        public SalaryCalculateConfirmRequest() : base()
        {
        }

        public string AppFlag { get; set; }

        // thanhtv
        // check exclucive list
        public List<BaseDto> UpdatedDts { get; set; }

    }

    /// <summary>
    /// Request of SalaryCalculateInput
    /// </summary>
    public class SalaryCalculateInputRequest : RequestBase
    {
        public int CompanyId { get; set; }
        public string CompanyCode { get; set; }
        public string YearMonth { get; set; }
        public string EmployeeNo { get; set; }
        public decimal? USDRate { get; set; }
        public decimal? JPYRate { get; set; }
        public string USDEffectiveDt { get; set; }
        public string JPYEffectiveDt { get; set; }
    }
}