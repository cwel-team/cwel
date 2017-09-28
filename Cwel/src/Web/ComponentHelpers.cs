using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Cwel.Web
{
    /// <summary>
    /// HtmlHelpers for Cwomponents
    /// </summary>
    public static class ComponentHelpers
    {
        /// <summary>
        /// Helper method to render a component encapsulating the path to the Razor
        /// </summary>
        /// <param name="helper">HtmlHelper</param>
        /// <param name="name">Name of the Component</param>
        /// <param name="model">Model of the Component</param>
        /// <returns>MvcHtmlString containing the rendered Component</returns>
        public static MvcHtmlString Component(this HtmlHelper helper, string name, object model)
        {
            return helper.Partial(ComponentViewPath(name), model);
        }

        /// <summary>
        /// Helper method to render a pattern encapsulating the path to the Razor
        /// </summary>
        /// <param name="helper">HtmlHelper</param>
        /// <param name="name">Name of the Pattern</param>
        /// <param name="model">Model of the Pattern</param>
        /// <returns>MvcHtmlString containing the rendered pattern</returns>
        public static MvcHtmlString Pattern(this HtmlHelper helper, string name, object model)
        {
            return helper.Partial(PatternViewPath(name), model);
        }

        /// <summary>
        /// Returns the path for a components view
        /// </summary>
        /// <param name="name">Name of the component</param>
        /// <returns>The tilde prefixed path to a components view</returns>
        public static string ComponentViewPath(string name)
        {
            return $"~/Cwel/component/{name}/{name}.cshtml";
        }

        /// <summary>
        /// Returns the path for a patterns view
        /// </summary>
        /// <param name="name">Name of the pattern</param>
        /// <returns>The tilde prefixed path to a patterns view</returns>
        public static string PatternViewPath(string name)
        {
            return $"~/Cwel/pattern/{name}/{name}.cshtml";
        }
    }
}
