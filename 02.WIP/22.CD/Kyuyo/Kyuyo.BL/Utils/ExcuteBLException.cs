using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Utils
{
    public class ExcuteBLException : Exception
    {
        public ExcuteBLException(string message) : base(message)
        {
        }
    }
}
