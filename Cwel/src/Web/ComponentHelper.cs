using System;
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
    public static class ComponentHelper
    {
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
        /// <returns>The tilde prefixed path to an svg icon</returns>
        public static string IconPath(string path)
        {
            return $"~/Cwel/Asset/icon/{path}.svg";
        }
    }
}
