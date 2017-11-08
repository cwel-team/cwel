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
                model["component"] = Directory.GetDirectories(Server.MapPath("~/Cwel/Component"))
                    .Select(x => x.Replace(Server.MapPath("~/Cwel/Component") + @"\", string.Empty)).ToArray();

                model["pattern"] = Directory.GetDirectories(Server.MapPath("~/Cwel/Pattern"))
                    .Select(x => x.Replace(Server.MapPath("~/Cwel/Pattern") + @"\", string.Empty)).ToArray();

                foreach (var dir in Directory.GetDirectories(Server.MapPath("~/Cwel/Docs")))
                {
                    var group = Path.GetDirectoryName(dir);
                    var dirs = Directory.GetDirectories(dir);
                    var groupItems = dirs.Select(x => x.Replace(Server.MapPath(dir) + @"\", string.Empty)).ToArray();

                    model[group.ToLower()] = groupItems;
                }
            }
            catch
            {
                // ignored
            }

            return View("Partials/SideBar", model);
        }
    }
}
