using System.Web.Mvc;
using System.Web.Mvc.Html;
#pragma warning disable SA1649, SA1204, SA1402

namespace Cwel.Web
{
    /// <summary>
    /// Badge Component View Model
    /// </summary>
    public class BadgeViewModel
    {
        /// <summary>
        /// Gets or sets the starting count for the badge count
        /// </summary>
        public int Start { get; set; }
    }

    public static partial class CwelExtensions
    {
        /// <summary>
        /// Render a Badge Component
        /// </summary>
        /// <param name="helper">Helper Helper</param>
        /// <param name="vm"><see cref="BadgeViewModel"/></param>
        public static MvcHtmlString Badge(this HtmlHelper helper, BadgeViewModel vm)
        {
            return helper.Partial(ComponentHelper.ComponentViewPath("Badge"), vm);
        }
    }
}
#pragma warning restore SA1649, SA1204, SA1402
