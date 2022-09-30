using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Controllers.Api.Employee
{
    public class EmployeeResponse
    {
        public List<KYEmployeeDto> ListEmployee { get; set; }
        public List<TBMSystemDto> ListEmployeeType { get; set; }
        public List<TBMSystemDto> ListWorkingPlace { get; set; }
        public List<TBMSystemDto> ListLevel { get; set; }
        public List<TBMSystemDto> ListLevelGroup { get; set; }
        public List<TBMSystemDto> ListContractType { get; set; }

        // using in popup department
        public List<TBMSystemDto> ListTitle { get; set; }

    }
}