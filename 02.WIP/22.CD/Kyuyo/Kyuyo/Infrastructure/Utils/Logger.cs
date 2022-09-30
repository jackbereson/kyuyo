using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Kyuyo.Infrastructure.Utils
{
    /// <summary>
    /// 
    /// </summary>
    public class Logger
    {
        /// <summary>
        /// The stream
        /// </summary>
        private StreamWriter Stream = null;
        private string localFile = null;

        /// <summary>
        /// Initializes a new instance of the <see cref="Logger"/> class.
        /// </summary>
        /// <param name="fileName">Name of the file.</param>
        public Logger(string screenId)
        {
            localFile =  Helper.GetLogFileName(screenId);
            var path = HttpRuntime.AppDomainAppPath + localFile;
            Stream = new StreamWriter(path, true);
        }

        /// <summary>
        /// Writes the specified text.
        /// </summary>
        /// <param name="text">The text.</param>
        public void Write(string text)
        {
            Stream.WriteLine(text);
        }


        /// <summary>
        /// Writeses the specified texts.
        /// </summary>
        /// <param name="texts">The texts.</param>
        public void Write(List<string> texts)
        {
            foreach(var text in texts)
            {
                Stream.WriteLine(text);
            }
        }

        public string Close()
        {
            Stream.Flush();
            Stream.Close();

            return localFile;
        }

    }
}