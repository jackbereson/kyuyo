using Kyuyo.BL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Models
{
    public class AuthorityModel
    {
        public bool Editable { get; set; }
        public List<AuthorityDto> ListEmployee { get; set; }
        public List<TBMSystemDto> ListScreen { get; set; }
        public List<KYCompanyDto> ListCompany { get; set; }
        public int CompanyId { get; set; }

    }
}