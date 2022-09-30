using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Utils;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kyuyo.Controllers
{
    public class SSOController : Controller
    {
        private static readonly ILog logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private AuthorityBL authorityBL = new AuthorityBL();

        // GET: SSO
        public ActionResult Index(string param)
        {

            var password = Helper.GetSSOSecurity();
            var decrypt = EncryptionUtils.decrypt(param, password);

            logger.Debug(decrypt);

            string[] split = decrypt.Split('\t');

            if (split.Length != 4)
            {
                throw new ArgumentException("single sign on key is invalid");
            }
            string userId = null;
            string passwd = null;

            for (var i = 0; i < 4; i++)
            {
                if (split[i].ToLower().Equals("userid"))
                {
                    userId = split[++i];
                }

                if (split[i].ToLower().Equals("passwd"))
                {
                    passwd = split[++i];
                }
                
            }

            //Authenticate
            Helper.ClearSessionUserInfo();
            var userInfo = authorityBL.CheckAuthority(userId, passwd);

            // Login success
            if (userInfo != null)
            {
                Helper.SaveCurrentUserInfo(userInfo);
                return RedirectToAction("Index", "Menu");
            }
            else
            {
                return RedirectToAction("Index", "Error", new { id = 2 });
            }
        }
    }
}
