using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cwel.Web
{
    /// <summary>
    /// 
    /// </summary>
    public static class IconHelper
    {
        private static readonly Func<string, string> ReadFile =
            path => System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath(ComponentHelper.IconPath(path)));

        static IconHelper()
        {
            // Unit testing doesn't work well with HttpContext and we are in a static context so IoC can't save us. Here be dragons.
            if(HttpContext.Current == null)
            {
                ReadFile = s => "<svg></svg>";
            }    
        }

        /// <summary>
        /// Helper method to render an svg icon inline with the HTML 
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public static MvcHtmlString Icon(this HtmlHelper helper, string path)
        {
            return Icon(helper, path, new Dictionary<string, object>());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="path"></param>
        /// <param name="attrs"></param>
        /// <returns></returns>
        public static MvcHtmlString Icon(this HtmlHelper helper, string path, object attrs)
        {
            return Icon(helper, path, HtmlHelper.AnonymousObjectToHtmlAttributes(attrs));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="path"></param>
        /// <param name="attrs"></param>
        /// <returns></returns>
        public static MvcHtmlString Icon(this HtmlHelper helper, string path, IDictionary<string, object> attrs)
        {
            var svgContents = ReadFile(path);
            return RenderIcon(svgContents, attrs);
        }

        /// <summary>
        /// Svg inline with the HTML
        /// </summary>
        /// <param name="svgContent">Contents of the SVG to inline</param>
        /// <param name="attrs"></param>
        /// <returns>MvcHtmlString containing the rendered pattern</returns>
        public static MvcHtmlString RenderIcon(string svgContent, IDictionary<string, object> attrs)
        {
            if (attrs == null) throw new ArgumentNullException(nameof(attrs));

            if (attrs.ContainsKey("class"))
            {
                attrs["class"] = "cwel-icon " + attrs["class"];
            }
            else
            {
                attrs.Add("class", "cwel-icon");
            }
            var attributes = string.Join(" ", attrs.Select(attr => $@"{attr.Key}=""{attr.Value}"""));
            return new MvcHtmlString($"<div {attributes}>{svgContent}</div>");
        }

    }
}
