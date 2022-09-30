using Kyuyo.BL.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils
{
    public class ValidateOpts
    {
        /// <summary>
        /// Kiem tra ca 2 field cung nhap
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <param name="value1">The value1.</param>
        /// <param name="value2">The value2.</param>
        /// <returns></returns>
        public static bool CheckRequired2(object instance, string value1, string value2)
        {
            return string.IsNullOrEmpty(value1) == string.IsNullOrEmpty(value2);
        }

        /// <summary>
        /// Checks the future.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <param name="value1">The value1.</param>
        /// <param name="value2">The value2.</param>
        /// <returns></returns>
        public static bool CheckFuture(object instance, string inFrom, string inTo, string format = Constant.DATE_FORMAT, bool allowEqual = true)
        {

            if (!string.IsNullOrEmpty(inFrom) && string.IsNullOrEmpty(inTo))
            {
                return true;
            }

            if (string.IsNullOrEmpty(inFrom) && string.IsNullOrEmpty(inTo))
            {
                return true;
            }

            DateTime from;
            if (!DateTime.TryParseExact(inFrom, format,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out from))
            {
                return false;
            }

            DateTime to;
            if (!DateTime.TryParseExact(inTo, Constant.DATE_FORMAT,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out to))
            {
                return true;
            }

            if (allowEqual)
            {
                return (to.Date - from.Date).TotalDays >= 0;
            }
            else
            {
                return (to.Date - from.Date).TotalDays > 0;
            }

        }
    }
}