using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Department
{

    public class DepartmentRequest : RequestBase
    {
        public DepartmentRequest()
        {
            this.validator = new DepartmentValidator();
        }

        public int Id { get; set; }
        public string CompanyCd { get; set; }
        public string DeptCd { get; set; }      // vung nhap
        public string OldDeptCd { get; set; }   // vung danh sach
        public string DeptName { get; set; }
        public bool ActiveFlag { get; set; }
        public string UpdatedDt { get; set; }

    }
}