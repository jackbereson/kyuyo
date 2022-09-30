using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    /// <summary>
    /// Class Data Transfer Object for QuantityProduct
    /// </summary>
    public class QuantityProductDto : BaseDto
    {
        public string CompanyCd { get; set; }
        public string EmployeeNo { get; set; }
        public string ProductType { get; set; }
        public Nullable<decimal> Quantity { get; set; }
        public string YearMonth { get; set; }
    }
}
