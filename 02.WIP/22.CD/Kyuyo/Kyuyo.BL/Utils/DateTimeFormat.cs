using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Utils
{
    /// <summary>
    /// DateTimeFormat
    /// </summary>
    public class DateTimeFormat
    {
        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <param name="datetime">The datetime.</param>
        /// <returns>
        /// A <see cref="System.String" /> that represents this instance.
        /// </returns>
        public static string ToString(DateTime? datetime)
        {
            if (datetime == null)
            {
                return null;
            }
            else
            {
                DateTime format = datetime ?? DateTime.MinValue;
                return format.ToString(Constant.DATETIME_FORMAT);
            }
        }

        /// <summary>
        /// To the string date.
        /// </summary>
        /// <param name="datetime">The datetime.</param>
        /// <returns></returns>
        public static string ToStringDate(DateTime? datetime)
        {
            if (datetime == null)
            {
                return null;
            }
            else
            {
                DateTime format = datetime ?? DateTime.MinValue;
                return format.ToString(Constant.DATE_FORMAT);
            }
        }


        /// <summary>
        /// To the date time.
        /// </summary>
        /// <param name="sDateTime">The s date time.</param>
        /// <returns></returns>
        public static DateTime? ToDateTime(string sDateTime)
        {
            if (string.IsNullOrEmpty(sDateTime))
            {
                return null;
            }

            DateTime date;
            if (DateTime.TryParseExact(sDateTime, Constant.DATETIME_FORMAT,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out date))
            {
                return date;
            }
            else if (DateTime.TryParseExact(sDateTime, Constant.DATE_FORMAT,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out date))
            {
                return date;
            }
            else if (DateTime.TryParseExact(sDateTime, Constant.DATE_FORMAT_VN,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out date))
            {
                return date;
            }
            else if (DateTime.TryParseExact(sDateTime, Constant.DATE_FORMAT_BASE,
               System.Globalization.CultureInfo.InvariantCulture,
               System.Globalization.DateTimeStyles.None, out date))
            {
                return date;
            }
            else
            {
                return null;
            }

        }

        /// <summary>
        /// To the year month.
        /// </summary>
        /// <param name="sDateTime">The s date time.</param>
        /// <returns></returns>
        public static string ToYearMonth(string sDateTime)
        {
            if (string.IsNullOrEmpty(sDateTime))
            {
                return null;
            }
            DateTime date;
            if (DateTime.TryParseExact(sDateTime, Constant.DATE_FORMAT,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out date))
            {
                return date.ToString(Constant.YEARMONTH_FORMAT);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Years the month to string date.
        /// </summary>
        /// <param name="sYearMonth">The s year month.</param>
        /// <returns></returns>
        public static string YearMonthToStringDate(string sYearMonth)
        {
            if (string.IsNullOrEmpty(sYearMonth))
            {
                return null;
            }
            DateTime date;
            if (DateTime.TryParseExact(sYearMonth, Constant.YEARMONTH_FORMAT,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out date))
            {
                return date.ToString(Constant.DATE_FORMAT);
            }
            else
            {
                return null;
            }

        }

        /// <summary>
        /// formatDateSys
        /// </summary>
        /// <param name="srcTime"></param>
        /// <param name="format"></param>
        /// <returns></returns>
        public static string formatDateSys(string srcTime, string format)
        {
            try
            {
                return DateTimeFormat.ToStringDate(DateTime.ParseExact(srcTime, format, CultureInfo.InvariantCulture));
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="vnDate"></param>
        /// <returns></returns>
        public static string converVnDateToSysDate(string vnDate)
        {
            if(string.IsNullOrEmpty(vnDate))
            {
                return "";
            }

            string date = vnDate.Replace("/", "");
            return date.Substring(2, 4) + date.Substring(0, 2);
        }


        public bool IsValid(string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return true;
            }

            DateTime date;
            if (DateTime.TryParseExact(value, Constant.DATE_FORMAT,
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out date))
            {
                return true;
            }

            return false;
        }

    }
}
