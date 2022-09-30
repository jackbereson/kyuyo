using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Kyuyo.Infrastructure.Core;
using Kyuyo.Models;
using log4net;

namespace Kyuyo.Controllers
{
    public class SampleController : BaseController
    {
        private static readonly ILog logger = LogManager.GetLogger(typeof(SampleController));

        // GET: Sample
        public ActionResult Index()
        {
            SampleModel sampleModel = InitSampleModel();
            return View(sampleModel);
        }
        /// <summary>
        /// Init of Model
        /// </summary>
        /// <returns>SampleModel</returns>
        private SampleModel InitSampleModel()
        {
            // set session is null
            Session["sampleModel"] = null;
            SampleModel sampleModel = new SampleModel();
            try
            {
                sampleModel.CompanyID = 16;
                // set data to session
                Session["sampleModel"] = sampleModel;
            }
            catch (Exception ex)
            {
                logger.Error("Index ", ex);
                throw ex;
            }

            return sampleModel;
        }
    }
}