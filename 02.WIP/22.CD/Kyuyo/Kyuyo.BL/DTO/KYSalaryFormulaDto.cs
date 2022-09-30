using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.DTO
{
    public class KYSalaryFormulaDto : BaseDto
    {
        public int CompanyId { get; set; }
        public string FormulaCd { get; set; }
        public string FormulaName { get; set; }
        public string FormulaValue { get; set; }
        public string FormulType { get; set; }
        public string EffectiveDt { get; set; }
        public bool DeleteFlg { get; set; }
        public string CreateDt { get; set; }
        public string CreateBy { get; set; }
        public string UpdateDt { get; set; }
        public string UpdateBy { get; set; }
        public int MainId { get; set; }
        public int HistoryNo { get; set; }

    }
}
