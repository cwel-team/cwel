using System.Web.Mvc;
using System.Web.Mvc.Html;
#pragma warning disable SA1649, SA1204, SA1402

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
        /// <summary>
        /// Render a Card Component
        /// </summary>
        /// <param name="helper">Html helper</param>
        /// <param name="vm"><see cref="CardViewModel"/></param>
        public static MvcHtmlString Card(this HtmlHelper helper, CardViewModel vm)
        {
            return helper.Partial(ComponentHelper.ComponentViewPath("Card"), vm);
        }
    }
}
#pragma warning restore SA1649, SA1204, SA1402
