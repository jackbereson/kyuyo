using System.Web.Mvc;
using Kyuyo.Infrastructure.Utils;
using Kyuyo.BL.Resources;
using Kyuyo.ServiceReference;

namespace Kyuyo.Controllers
{
    public class ErrorController : Controller
    {
        string messageTitle = string.Empty;
        string messageDetail = string.Empty;
        bool flag = true;
        //
        // GET: /Error/
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Index(int id)
        {
           // MailWSClient email = new MailWSClient();
           // employeeDto cuongnc = new employeeDto();
           //  cuongnc.corpId = "0390";
           // cuongnc.empNumber1 = "78058";

            

           // employeeDto binhlp = new employeeDto()
           // {
           //     corpId = "0390",
           //     empNumber1 = "78035"
           // };

           //resultStatus gido=  email.send(new employeeDto[] { binhlp }, null, cuongnc, "subject", "content", false, null, true);

            if (!Helper.IsCheckNumber(id.ToString()))
            {
                id = -1;
            }
            SetErrorMessage(id);
            ViewBag.MessageTitle = messageTitle;
            ViewBag.MessageDetail = messageDetail;
            ViewBag.Flag = flag;
            return View();
        }

        /// <summary>
        /// Set error message for page error
        /// </summary>
        /// <param name="type"></param>
        private void SetErrorMessage(int type)
        {
            switch (type)
            {
                case 1:
                    messageTitle = Messages.PageNotFound;
                    messageDetail = Messages.PageNotFoundMsg;
                    // Show link back to home
                    flag = true;
                    break;
                    
                case 2:
                    messageTitle = Messages.AccessDenied;
                    messageDetail = Messages.AccessDeniedMsg;
                    // Show link back to home
                    flag = false;
                    break;
                    
                default:
                    messageTitle = Messages.Exception;
                    messageDetail = Messages.ExceptionMsg;
                    // Show link back to home
                    flag = true;

                    break;
            }
        }
    }
}