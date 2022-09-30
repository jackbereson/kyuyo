using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kyuyo.BL.Utils;
using System.Data;
using System.Data.OleDb;
using System.IO;
using Kyuyo.BL.DTO;
using log4net;


namespace Kyuyo.Infrastructure.Utils
{
    /// <summary>
    /// Class process Init
    /// </summary>
    public class InitCommon
    {
        // Logger
        private static readonly ILog logger = LogManager.GetLogger(typeof(InitCommon));

        // OleDbConnection
        static OleDbConnection oleDbConn;

        /// <summary>
        /// Get the folder containing the file of the client
        /// </summary>
        /// <returns></returns>
        public static string GetRootPath()
        {
            return HttpRuntime.AppDomainAppPath + Constant.FILE_UPLOAD_PATH;
        }

        /// <summary>
        /// Read data from Excel file to Dataset
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns>DataSet</returns>
        public static DataSet ReadExcel(string fileName)
        {
            DataSet ds = new DataSet();
            if (File.Exists(fileName))
            {
                if (Path.GetExtension(fileName) == ".xls")
                {
                    oleDbConn = new OleDbConnection("Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + fileName + "; Extended Properties=\"Excel 8.0;HDR=No;IMEX=1\"");
                }
                else if (Path.GetExtension(fileName) == ".xlsx")
                {
                    oleDbConn = new OleDbConnection(@"Provider=Microsoft.ACE.OLEDB.12.0; Data Source=" + fileName + "; Extended Properties='Excel 12.0;HDR=No;IMEX=1;';");
                }
                try
                {
                    oleDbConn.Open();

                    System.Data.DataTable sheetTable = new System.Data.DataTable();
                    sheetTable = oleDbConn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                    for (int sheet = 0; sheet < sheetTable.Rows.Count; sheet++)
                    {
                        System.Data.DataTable dataTable = new System.Data.DataTable();
                        OleDbCommand oleDbCommand = new OleDbCommand("SELECT * FROM [" + sheetTable.Rows[sheet][2].ToString() + "]", oleDbConn);
                        OleDbDataAdapter oleDbDataAdapter = new OleDbDataAdapter(oleDbCommand);
                        oleDbDataAdapter.Fill(dataTable);
                        ds.Tables.Add(dataTable);
                    }
                }
                catch (Exception ex)
                {
                    logger.Error("Exception", ex);
                }
                finally
                {
                    oleDbConn.Close();
                    oleDbConn.Dispose();
                    File.Delete(fileName);
                }
            }

            return ds;
        }
    }
}