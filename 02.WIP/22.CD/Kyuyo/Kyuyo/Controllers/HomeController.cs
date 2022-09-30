using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc]
    public class HomeController : BaseController
    {
        [HttpGet]
        public ActionResult Download(string patch)
        {
            string fullPath = HttpRuntime.AppDomainAppPath + patch;
            MemoryStream ms = new MemoryStream();
            using (FileStream fileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read))
            {
                fileStream.CopyTo(ms);
                fileStream.Close();
            }
            //delete the saved file
            System.IO.File.Delete(fullPath);
            ms.Position = 0;
            return File(ms, "application/vnd.ms-excel", Path.GetFileName(fullPath));
        }

        [HttpGet]
        [Route("template/{root}/{view}")]
        public ActionResult Template(string root, string view)
        {
            if (root == null || !Regex.IsMatch(root, @"^[-\w]+$"))
            {
                return HttpNotFound();
            }

            if ("home".Equals(root.ToLower()))
            {
                return HttpNotFound();
            }

            if (view == null)
            {
                view = "Index";
            }
            else if (!Regex.IsMatch(view, @"^[-\w]+$"))
            {
                return HttpNotFound();
            }

            string relativeViewPath = string.Format("~/Views/Templates/{0}/{1}.cshtml", root, view);

            return View(relativeViewPath);
        }
    }
}
