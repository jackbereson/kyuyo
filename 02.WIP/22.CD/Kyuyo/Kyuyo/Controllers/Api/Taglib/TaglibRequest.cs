using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Taglib
{
    public class TaglibRequest : RequestBase
    {
        public TaglibRequest()
        {
            this.validator = new TaglibValidator();
        }

        public int CompanyId { get; set; }
        public string DeptCd { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }

    }
}