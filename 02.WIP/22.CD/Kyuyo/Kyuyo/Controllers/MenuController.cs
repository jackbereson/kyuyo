using Kyuyo.BL;
using Kyuyo.BL.Utils;
using Kyuyo.Infrastructure.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kyuyo.Controllers
{
    [AuthenticateMvc]
    public class MenuController : BaseController
    {
        // GET: Menu
        public ActionResult Index()
        {
            var commonBL = new CommonBL();
            return View(commonBL.getMSystemList(Constant.SCREEN_ID));
        }
    }
}