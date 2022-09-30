using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.Infrastructure.Core;

namespace Kyuyo.Controllers.Api.WorkingTimeChangeRefer
{
    /// <summary>
    /// Class process request API for WorkingTimeChangeRefer
    /// </summary>
    public class WorkingTimeChangeReferRequest : RequestBase
    {
        public WorkingTimeChangeReferRequest()
        {
            this.validator = new WorkingTimeChangeReferValidator();
        }
        public string Month { get; set; }
        public string YearMonth { get; set; }
        public string CompareFile { get; set; }
        public string CompanyCode { get; set; }
        public int CompanyId { get; set; }
    }

    /// <summary>
    /// WorkingTimeChangeReferImportRequest
    /// </summary>
    public class WorkingTimeChangeReferImportRequest : RequestBase
    {
        public WorkingTimeChangeReferImportRequest()
        {
            this.validator = new WorkingTimeChangeReferImportValidator();
        }
        public string YearMonth { get; set; }
        public string ImportFile { get; set; }
    }
}