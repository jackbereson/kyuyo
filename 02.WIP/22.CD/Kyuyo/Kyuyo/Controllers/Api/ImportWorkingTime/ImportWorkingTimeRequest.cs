using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.ImportWorkingTime
{
    public class ImportWorkingTimeRequest : RequestBase
    {
        public ImportWorkingTimeRequest()
        {
            this.validator = new ImportWorkingTimeValidator();
        }

        public int CompanyId { get; set; }
        public string FileName { get; set; }
        public string YearMonth { get; set; }
        public int Type { get; set; }
    }
}