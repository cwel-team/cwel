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
    }
}
