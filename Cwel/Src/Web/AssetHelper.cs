using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Cwel.Web
{
    /// <summary>
    /// Helper Methods for dealing with getting Assets on the page
    /// </summary>
    public static class AssetHelper
    {
        /// <summary>
        /// The string key used to store data inside the <see cref="HttpContext"/> Items
        /// </summary>
        public const string ScriptsContextKey = "Cwo.AssetHelper.Scripts";

        /// <summary>
        /// Returns the path to an asset
        /// </summary>
        /// <param name="type">Asset type</param>
        /// <param name="name">Name of the asset</param>
        /// <returns>string path</returns>
        public static string GetScriptAssetPath(AssetType type, string name)
        {
            if (type == AssetType.Vendor)
            {
                return $"/assets/js/vendor/{name}.js".ToLower();
            }

            return $"/Cwel/{Enum.GetName(typeof(AssetType), type)}/{name}/{name}.js".ToLower();
        }

        /// <summary>
        /// Request a script to be loaded via <see cref="RenderScripts"/>
        /// </summary>
        /// <param name="htmlHelper">HtmlHelper</param>
        /// <param name="type">Asset Type</param>
        /// <param name="name">Name of the asset being added, will be used as a cache key</param>
        /// <param name="context">Optional Context param can be used to mock out HttpContext.Current</param>
        public static void RequireScript(this HtmlHelper htmlHelper, AssetType type, string name, HttpContextBase context = null)
        {
            if (context == null)
            {
                context = new HttpContextWrapper(HttpContext.Current);
            }

            var cacheKey = Enum.GetName(typeof(AssetType), type) + ":" + name;
            if (context.Items[ScriptsContextKey] == null)
            {
                context.Items[ScriptsContextKey] = new Dictionary<string, string>();
            }

            var scripts = (Dictionary<string, string>)context.Items[ScriptsContextKey];
            scripts[cacheKey] = GetScriptAssetPath(type, name);
        }

        /// <summary>
        /// Html helper used to render the script tags required for the page, scripts are registered to be loaded via <see cref="RequireScript"/>
        /// </summary>
        /// <param name="htmlHelper">HtmlHelper to extend</param>
        /// <returns>HtmlString containing script tags</returns>
        public static HtmlString RenderScripts(this HtmlHelper htmlHelper)
        {
            var scripts = (Dictionary<string, string>)HttpContext.Current.Items[ScriptsContextKey];
            var result = new StringBuilder();

            if (scripts != null)
            {
                foreach (var script in scripts)
                {
                    result.AppendFormat(@"<script src=""{0}""></script>", script.Value);
                }
            }

            return new HtmlString(result.ToString());
        }

        /// <summary>
        /// Push HTTP2 Link preload headers to the CDN
        /// </summary>
        /// <param name="helper">HtmlHelper</param>
        /// <param name="context">Optional HttpContext para used for mocking during testing</param>
        public static void ServerPush(this HtmlHelper helper, HttpContextBase context = null)
        {
            var linkHeader = new StringBuilder();
            if (context == null)
            {
                context = new HttpContextWrapper(HttpContext.Current);
            }

            var scripts = (Dictionary<string, string>)context.Items[ScriptsContextKey];

            // Append each script as "<path>; rel=preload; as=script,"
            foreach (var script in scripts)
            {
                linkHeader.AppendFormat("<{0}>; rel=preload; as=script,", script.Value);
            }

            if (linkHeader.Length > 0)
            {
                // Trim last character
                linkHeader.Length--;
                context.Response.Headers["Link"] = linkHeader.ToString();
            }
        }
    }
}
