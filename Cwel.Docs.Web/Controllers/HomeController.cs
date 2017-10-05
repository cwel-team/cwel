using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace Cwel.Docs.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return RedirectToAction(nameof(PlaygroundController.Index), "Playground");
        }

        /// <summary>
        /// Renders the ChildAction for the SideNav based on what Cwomponents are on the filesystem
        /// </summary>
        /// <returns>ActionResult</returns>
        [ChildActionOnly]
        public ActionResult SideBar()
        {
            var model = new Dictionary<string, string[]>();
            try
            {
                model["components"] = Directory.GetDirectories(Server.MapPath("~/Cwel/Component"))
                    .Select(x => x.Replace(Server.MapPath("~/Cwel/Component") + @"\", string.Empty)).ToArray();

                model["patterns"] = Directory.GetDirectories(Server.MapPath("~/Cwel/Pattern"))
                    .Select(x => x.Replace(Server.MapPath("~/Cwel/Pattern") + @"\", string.Empty)).ToArray();
            }
            catch
            {
                // ignored
            }

            return View("Partials/SideBar", model);
        }
    }
}
