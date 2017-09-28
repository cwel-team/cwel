using System.Web.Mvc;
using System.Web.Mvc.Html;

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
        /// <returns>int</returns>
        public int Start { get; set; }
    }

    public static partial class CwelExtensions
    {
        public static MvcHtmlString Badge(this HtmlHelper helper, BadgeViewModel vm)
        {
            return helper.Partial(ComponentHelpers.ComponentViewPath("Badge"), vm);
        }
    }
}