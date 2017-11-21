using Cwel.Docs.Web.Helpers;
using Cwel.Docs.Web.Models;
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
                    var json = System.IO.File.ReadAllText(Server.MapPath($"~/Cwel/{type}/{name}/default.json"));
                    return View($"~/Cwel/{type}/{name}/index.cshtml", new ComponentDocumentationViewModel {
                        Html = ViewRenderer.RenderViewToString(ControllerContext, $"~/Cwel/{type}/{name}/{name}.cshtml", ViewRenderer.DeserializeViewModel(type, name, json))
                    });
                default:
                    return View($"~/Cwel/Docs/{type}/{name}/index.cshtml");
            }
        }
    }
}
