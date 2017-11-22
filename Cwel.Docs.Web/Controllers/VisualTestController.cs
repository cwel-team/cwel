using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cwel.Docs.Web.Controllers
{
    public class VisualTestController : Controller
    {
        [Route("VisualTest/{name}")]
        public ActionResult Index(string name)
        {
            return View($"~/Views/VisualTest/{name}/index.cshtml");
        }
    }
}
