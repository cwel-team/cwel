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
            type = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(type);

            switch (type)
            {
                case "Pattern":
                case "Component":
                    return View($"~/Cwel/{type}/{name}/index.cshtml");
                default:
                    return View($"~/Cwel/Docs/{type}/{name}/index.cshtml");
            }
        }
    }
}
