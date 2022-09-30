using Kyuyo.BL.Core;
using Kyuyo.BL.DTO;
using Kyuyo.BL.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Web;

namespace Kyuyo.Infrastructure.Utils
{
    /// <summary>
    /// 
    /// </summary>
    public class Helper
    {

        /// <summary>
        /// Saves the current user information.
        /// </summary>
        /// <param name="userInfo">The user information.</param>
        public static void SaveCurrentUserInfo(UserInfo userInfo)
        {
            HttpContext.Current.Session["KYUYO_USER_INFO"] = userInfo;

            // Menu roles
            var listRole = new List<string>();
            //var accessCompany = new Dictionary<string, int[]>();
            var accessRole = new List<AccessRole>();

            listRole.AddRange(GetListRoles(userInfo.ScreenMaster, ref accessRole));
            listRole.AddRange(GetListRoles(userInfo.ScreenBusiness, ref accessRole));

            if (userInfo.IsAdmin)
            {
                listRole.Add(string.Format("{0}_EDIT", Constant.SCREEN_M004));
            }

            HttpContext.Current.Session["KYUYO_MENU_ROLES"] = listRole;
            HttpContext.Current.Session["KYUYO_ACCESS_COMPANY"] = accessRole;


        }

        /// <summary>
        /// Gets the list roles.
        /// </summary>
        /// <param name="menus">The menus.</param>
        /// <returns></returns>
        private static List<string> GetListRoles(IEnumerable<ScreenItem> menus, ref List<AccessRole> accessRole)
        {
            var listRole = new List<string>();
            
            foreach (var menu in menus)
            {
                var roles = menu.AccessLevel.Split('|');
                foreach (var role in roles)
                {
                    var items = role.Split('_');

                    var r = items[1].Split(',');
                    var c = items[2].Split(',');

                    if (r.Length == c.Length)
                    {
                        for(int i = 0; i < r.Length; i++)
                        {
                            listRole.Add(string.Format("{0}_{1}", items[0], r[i])); // add base role
                            accessRole.Add(new AccessRole()
                            {
                                ScreenId = items[0],
                                RoleCode = r[i],
                                CompanyIds = c[i].Split('#').Select(a => Int32.Parse(a)).ToList()
                            });
                            // t/h edit -> add role view
                            if (items[1].ToLower() == "edit" && menu.AllowView)
                            {
                                listRole.Add(string.Format("{0}_VIEW", items[0]));
                            }
                            else if (items[1].ToLower() != "view" && menu.AllowView && !listRole.Exists(a => a == string.Format("{0}_EDIT", items[0])))
                            {
                                listRole.Add(string.Format("{0}_EDIT", items[0]));
                            }
                        }
                    }
                }
            }
            return listRole;
        }

        /// <summary>
        /// Get current user information
        /// </summary>
        /// <returns></returns>
        public static UserInfo GetCurrentUserInfo()
        {
            UserInfo userInfo = null;
            if (HttpContext.Current.Session["KYUYO_USER_INFO"] != null)
            {
                userInfo = (UserInfo)HttpContext.Current.Session["KYUYO_USER_INFO"];
            }
            else
            {
                userInfo = new UserInfo();
            }

            return userInfo;
        }

        /// <summary>
        /// Clear session user info
        /// </summary>
        public static void ClearSessionUserInfo()
        {
            HttpContext.Current.Session.Clear();
        }

        /// <summary>
        /// Role name user
        /// </summary>
        /// <returns></returns>
        public static string EmployeeName()
        {
            return GetCurrentUserInfo().EmployeeName;
        }

        public static int[] AccessCompanys(string screenId)
        {
            int[] companyIds = null;
            if (HttpContext.Current.Session["KYUYO_ACCESS_COMPANY"] != null)
            {
                var accessRole = (List<AccessRole>)HttpContext.Current.Session["KYUYO_ACCESS_COMPANY"];
                var roles = accessRole.Where(a => a.ScreenId == screenId);
                List<int> Ids = new List<int>();
                foreach (var role in roles)
                {
                    Ids.AddRange(role.CompanyIds.Where(id => !Ids.Exists(a => a == id)));
                }
                companyIds = Ids.ToArray();
            }
            else
            {
                companyIds = new int[] { };
            }
            return companyIds;
        }

        public static Dictionary<int, string[]> GetRoleAccessCompanys(string screenId)
        {
            var result = new Dictionary<int, string[]>();
            if (HttpContext.Current.Session["KYUYO_ACCESS_COMPANY"] != null)
            {
                var accessRole = (List<AccessRole>)HttpContext.Current.Session["KYUYO_ACCESS_COMPANY"];

                var companyIds = AccessCompanys(screenId);
                foreach(var id in companyIds)
                {
                   var roles = accessRole.Where(a => a.ScreenId == screenId && a.CompanyIds.Exists(e => e == id)).Select(a => a.RoleCode).ToArray();
                   result.Add(id, roles);
                }
            }
            return result;
        }

        /// <summary>
        /// Employees the no.
        /// </summary>
        /// <returns></returns>
        public static string EmployeeNo()
        {
            return GetCurrentUserInfo().EmployeeNo;
        }

        /// <summary>
        /// Gets the access roles.
        /// </summary>
        /// <returns></returns>
        public static List<string> GetAccessRoles()
        {
            List<string> roles = null;
            if (HttpContext.Current.Session["KYUYO_MENU_ROLES"] != null)
            {
                roles = (List<string>)HttpContext.Current.Session["KYUYO_MENU_ROLES"];
            }
            else
            {
                roles = new List<string>();
            }

            return roles;
        }

        /// <summary>
        /// Get status screen view or update
        /// </summary>
        /// <param name="screenID"></param>
        /// <returns></returns>
        public static bool HasPermissionEdit(string screenId)
        {
            var roles = GetAccessRoles();
            var query = screenId + "_EDIT";
            return roles.FirstOrDefault(r => r == query) != null;
        }

        /// <summary>
        /// check screen Access
        /// </summary>
        /// <param name="screenId">The screen identifier.</param>
        /// <returns>
        ///   <c>true</c> if [has access screen] [the specified screen identifier]; otherwise, <c>false</c>.
        /// </returns>
        public static bool HasAccessScreen(string screenId)
        {
            var roles = GetAccessRoles();
            return roles.FirstOrDefault(r => r.Contains(screenId)) != null;
        }


        /// <summary>
        /// Companies the id.
        /// </summary>
        /// <returns></returns>
        public static int CompanyId()
        {
            return GetCurrentUserInfo().CompanyId;
        }

        /// <summary>
        /// Companies the cd.
        /// </summary>
        /// <returns></returns>
        public static string CompanyCd()
        {
            return GetCurrentUserInfo().CompanyCd;
        }


        /// <summary>
        /// Check number is true or false
        /// </summary>
        /// <param name="number">The number.</param>
        /// <returns>
        ///   <c>true</c> if [is check number] [the specified number]; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsCheckNumber(string number)
        {
            int n;
            return int.TryParse(number, out n);
        }

        /// <summary>
        /// Format number with comma
        /// number = 1234567890;
        /// result = 1,234,567,890
        /// </summary>
        /// <param name="number">The number.</param>
        /// <returns></returns>
        public static string ConvertNumberWithComma(int number)
        {
            if (number == 0)
            {
                return "0";
            }
            else if (number < 0)
            {
                number *= -1;
                return "(" + number.ToString("#,##") + ")";
            }
            return number.ToString("#,##");
        }


        /// <summary>
        /// Remove illegal characters of filename
        /// </summary>
        /// <param name="filename">The filename.</param>
        /// <returns></returns>
        public static string GetSafeFilename(string filename)
        {
            return string.Join("_", filename.Split(Path.GetInvalidFileNameChars()));
        }

        /// <summary>
        /// Change language
        /// </summary>
        /// <param name="lang">The language.</param>
        public static void SetCurrentCulture(string lang)
        {
            var culture = CultureInfo.GetCultureInfo(lang);
            if (culture != null)
            {
                Thread.CurrentThread.CurrentCulture = culture;
                Thread.CurrentThread.CurrentUICulture = culture;
            }
        }

        /// <summary>
        /// Get langKey
        /// </summary>
        /// <returns></returns>
        public static string GetLanguageKey()
        {
            return Thread.CurrentThread.CurrentUICulture.Name.ToLower();
        }

        public static string GetLogFileName(string screenId)
        {
            return "/Log/" + screenId + "_" + Helper.EmployeeNo() + "_" + DateTimeFormat.ToString(DateTime.Now) + ".log";
        }

        public static bool CheckExtention(string path)
        {
            var extention = Path.GetExtension(path);
            return extention == ".xls" || extention == ".xlsx";
        }

        /// <summary>
        /// Substracting of 2 strings of value
        /// </summary>
        /// <param name="str1">The STR1.</param>
        /// <param name="str2">The STR2.</param>
        /// <returns>
        /// string
        /// </returns>
        public static string SubtractingOfStringValue(string str1, string str2)
        {
            string result = string.Empty;
            string[] str1s = str1.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            string[] str2s = str2.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (str1s.Length != str2s.Length)
            {
                return result;
            }
            else
            {
                for (int i = 0; i < str1s.Length; i++)
                {
                    decimal val1 = decimal.Parse(str1s[i]);
                    decimal val2 = decimal.Parse(str2s[i]);
                    result += (val1 - val2) + ",";
                }
                // remove the last comma
                result = result.Remove(result.Length - 1);
            }
            return result;
        }

        /// <summary>
        /// SSO decrypt
        /// </summary>
        /// <returns></returns>
        public static string GetSSOSecurity()
        {
           return  ConfigurationManager.AppSettings["SSOSecurity"];
        }

        /// <summary>
        /// Saves the menus.
        /// </summary>
        /// <param name="menus">The menus.</param>
        public static void SaveMenus(List<TBMSystemDto> menus)
        {
            HttpContext.Current.Session["KYUYO_LIST_MENU"] = menus;
        }

        /// <summary>
        /// Gets the menus.
        /// </summary>
        /// <returns></returns>
        public static List<TBMSystemDto> GetMenus()
        {
            if(HttpContext.Current.Session["KYUYO_LIST_MENU"] != null)
            {
                return (List<TBMSystemDto>)HttpContext.Current.Session["KYUYO_LIST_MENU"];
            }
            else
            {
                return new List<TBMSystemDto>();
            }
        }

    }

}