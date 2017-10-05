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
        /// <param name="name">Name of the component to display documentation for</param>
        [Route("Component/{name}")]
        public ActionResult Component(string name)
        {
            return View($"~/Cwel/Component/{name}/index.cshtml");
        }

        /// <summary>
        /// Documentation page for a component
        /// </summary>
        /// <param name="name">Name of the pattern to display documentation for</param>
        [Route("Pattern/{name}")]
        public ActionResult Pattern(string name)
        {
            return View($"~/Cwel/Pattern/{name}/index.cshtml");
        }
    }
}
