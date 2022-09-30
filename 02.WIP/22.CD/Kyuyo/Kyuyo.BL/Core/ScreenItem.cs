using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Core
{
    public class ScreenItem
    {
        public string ScreenId { get; set; }
        public string AccessLevel { get; set; }
        public string ScreenName { get; set; }
        public string Url { get; set; }
        public bool ShowFlag { get; set; }
        public bool AllowView { get; set; }
    }
}
