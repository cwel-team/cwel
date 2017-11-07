using System.Globalization;
using System.Web.Mvc;

namespace Cwel.Docs.Web.Controllers
{
    /// <summary>
    /// Documentation Controller
    /// </summary>
    public class DocumentationController : Controller
    {
        /// <summary>
        /// Documentation page for a component
        /// </summary>
        /// <param name="type">Type of the component to display documentation for</param>
        /// <param name="name">Name of the component to display documentation for</param>
        [Route("Page/{type}/{name}")]
        public ActionResult Component(string type, string name)
        {
            return View($"~/Cwel/{CultureInfo.CurrentCulture.TextInfo.ToTitleCase(type)}/{name}/index.cshtml");
        }
    }
}
