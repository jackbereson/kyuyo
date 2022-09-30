using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.Infrastructure.Core;

namespace Kyuyo.Controllers.Api.AbsenceNotPay
{
    /// <summary>
    /// Class process request API for AbsenceNotPay
    /// </summary>
    public class AbsenceNotPayRequest : RequestBase
    {
        public AbsenceNotPayRequest()
        {
            this.validator = new AbsenceNotPayValidator();
        }
        public int? Id { get; set; }
        public string EmployeeNo { get; set; }
        public string AbsenceNo { get; set; }
        public string FromDt { get; set; }
        public string ToDt { get; set; }
        public string StartWorkDt { get; set; }
        public string UpdatedDt { get; set; }
        public int CompanyId { get; set; }
    }

    /// <summary>
    /// AbsenceNotPaySearchRequest
    /// </summary>
    public class AbsenceNotPaySearchRequest : RequestBase
    {
        public AbsenceNotPaySearchRequest()
        {
            this.validator = new AbsenceNotPaySearchValidator();
        }
        public string CompanyCd { get; set; }
        public int CompanyId { get; set; }
        public string DeptCd { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
    }
}