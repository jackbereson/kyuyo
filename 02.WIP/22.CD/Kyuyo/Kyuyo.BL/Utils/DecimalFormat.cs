using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Utils
{
    /// <summary>
    /// 
    /// </summary>
    public class DecimalFormat
    {
        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <param name="dec">The decimal.</param>
        /// <returns>
        /// A <see cref="System.String" /> that represents this instance.
        /// </returns>
        public static string ToStrings(decimal dec)
        {
            return dec.ToString(CultureInfo.CreateSpecificCulture("en-US"));
        }

        /// <summary>
        /// Parses the specified value.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public static decimal? Parse(string value)
        {
            decimal dec;
            NumberStyles style = NumberStyles.AllowDecimalPoint;
            CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US");
            if (decimal.TryParse(value, style, culture, out dec))
            {
                return dec;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Determines whether the specified value is decimal.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns>
        ///   <c>true</c> if the specified value is decimal; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsDecimal(string value)
        {
            decimal dec;
            NumberStyles style = NumberStyles.AllowDecimalPoint;
            CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US");
            if (decimal.TryParse(value, style, culture, out dec))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }

}
