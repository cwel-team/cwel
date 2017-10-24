using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Cwel.Web
{
    /// <summary>
    /// Card Component View Model
    /// </summary>
    public class CardViewModel
    {
        /// <summary>
        /// Gets or sets header text of the card
        /// </summary>
        /// <returns>String</returns>
        public string Header { get; set; }

        /// <summary>
        /// Gets or sets the main body of text for the card
        /// </summary>
        /// <returns>String</returns>
        public string Details { get; set; }
    }

    public static partial class CwelExtensions
    {
        public static MvcHtmlString Card(this HtmlHelper helper, CardViewModel vm)
        {
            return helper.Partial(ComponentHelper.ComponentViewPath("Card"), vm);
        }
    }
}
