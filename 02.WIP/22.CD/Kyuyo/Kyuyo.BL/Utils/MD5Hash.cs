using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Kyuyo.BL.Utils
{
    public static class MD5Hash
    {
        static MD5 hasher = MD5.Create();

        public static string Get(string input)
        {
            byte[] data = null;
            lock (hasher)
            {
                // Convert the input string to a byte array and compute the hash. 
                data = hasher.ComputeHash(Encoding.UTF8.GetBytes(input));
            }
            // Create a new Stringbuilder to collect the bytes 
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data  
            // and format each one as a hexadecimal string. 
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string. 
            return sBuilder.ToString();
        }
    }
}
