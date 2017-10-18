using System.Collections.Generic;
using System.Linq;
using System.Web;
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
        /// Helper method to render an svg icon inline with the HTML
        /// </summary>
        /// <param name="helper">HtmlHelper</param>
        /// <param name="path">Relative path of the icon</param>
        /// <param name="attrs"></param>
        /// <returns>MvcHtmlString containing the rendered pattern</returns>
        public static MvcHtmlString Icon(this HtmlHelper helper, string path, Dictionary<string, string> attrs = null)
        {
            if (attrs == null) attrs = new Dictionary<string, string>();

            if (attrs.ContainsKey("class"))
            {
                attrs["class"] = "cwel-icon " + attrs["class"];
            } else
            {
                attrs.Add("class", "cwel-icon");
            }

            var svgContents = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath(IconPath(path)));
            var attributes = string.Join(" ", attrs.Select(attr => $"{attr.Key}=\"{attr.Value}\""));

            return new MvcHtmlString($"<div {attributes}>" +
                $"{svgContents}" +
                $"</div>");
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

        /// <summary>
        /// Returns the path for an svg icon
        /// </summary>
        /// <param name="path">Path of svg icon relative to assets directory</param>
        /// <returns>The tilde prefixed path to an svg icon
        public static string IconPath(string path)
        {
            return $"~/Cwel/Assets/icon/{path}.svg";
        }
    }
}
