using Kyuyo.Infrastructure.Utils;
using System.Threading;
using System.Web;
using System.Web.Optimization;

namespace Kyuyo
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-ui-router.min.js",
                      "~/Scripts/angular-sanitize.js",
                      "~/Scripts/angular-animate.js",
                      "~/Scripts/angular-touch.min.js",
                      "~/Scripts/angular-cookies.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/customScripts-plugins")
               .Include("~/Scripts/bootstrap-datepicker.min.js")
               .Include("~/Scripts/validation/jquery.validate.min.js",
                        "~/Scripts/validation/angular-validate.min.js",
                        "~/Scripts/validation/additional-methods.js")
               .Include("~/Scripts/angular-block-ui.min.js")
               .Include("~/Scripts/ui-bootstrap-tpls-2.1.3.min.js")
               .Include("~/Scripts/moment.min.js")
               .Include("~/Scripts/ng-file-upload-shim.min.js",
                        "~/Scripts/ng-file-upload.min.js")
               .Include("~/Scripts/angular-toastr.js")
               .Include("~/AIT-Admin/plugins/toastr/toastr.min.js")
               );

            bundles.Add(new ScriptBundle("~/bundles/angularMe")
                .IncludeDirectory("~/AppJs", "*.js", false));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/bootstrap-select.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/common.js",
                      "~/Scripts/month-range.js"
                      ));
            
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome/css/font-awesome.min.css",
                      "~/Content/nso-planning.css",
                      "~/Content/angular-block-ui.min.css",
                      "~/Content/bootstrap-datepicker3.min.css",
                      "~/Content/angular-toastr.min.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/css-temp").Include(
                      "~/AIT-Admin/bootstrap/css/bootstrap.min.css",
                      "~/AIT-Admin/dist/css/AdminLTE.css", "~/AIT-Admin/dist/css/skins/skin-blue.css",
                      "~/Content/font-awesome/css/font-awesome.min.css",
                      "~/Content/nso-planning.css",
                      "~/Content/angular-block-ui.min.css",
                      "~/Content/bootstrap-datepicker3.min.css",
                      "~/AIT-Admin/plugins/toastr/toastr.css",
                      "~/Content/site.css"));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap-temp").Include(
                      "~/AIT-Admin/bootstrap/js/bootstrap.min.js",
                      "~/Scripts/bootstrap-select.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/common.js",
                      "~/Scripts/month-range.js"
                      ));

        }
    }
}
