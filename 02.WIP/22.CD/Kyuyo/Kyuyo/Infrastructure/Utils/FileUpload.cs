using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.IO;
using Kyuyo.BL.Utils;

namespace Kyuyo.Infrastructure.Utils
{
    /// <summary>
    /// Class process Util for FileUpload
    /// </summary>
    public class FileUpload : MultipartFormDataStreamProvider
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="path"></param>
        public FileUpload(string path) : base(path)
        {
        }

        /// <summary>
        /// Override for file name
        /// </summary>
        /// <param name="headers"></param>
        /// <returns></returns>
        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            //Make the file name URL safe and then use it & is the only disallowed url character allowed in a windows filename
            var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName) ? headers.ContentDisposition.FileName : "NoName";
            name = name.Replace("\"", string.Empty);
            name = Path.GetFileNameWithoutExtension(name) + "_" + Helper.EmployeeNo() + "_" + DateTimeFormat.ToString(DateTime.Now) + Path.GetExtension(name);
            return name.Trim(new char[] { '"' })
                        .Replace("&", "and");
        }
    }
}