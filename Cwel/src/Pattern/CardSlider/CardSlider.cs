using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Mvc.Html;
#pragma warning disable SA1649, SA1204, SA1402

namespace Cwel.Web
{
    /// <summary>
    /// CardSlider Pattern View Model
    /// </summary>
    public class CardSliderViewModel
    {
        /// <summary>
        /// Gets or sets the collection of cards inside the card slider
        /// </summary>
        public List<CardViewModel> Cards { get; set; }

        /// <summary>
        /// Gets or sets the starting index for the Cardslider
        /// </summary>
        public int StartIndex { get; set; }
    }

    public static partial class CwelExtensions
    {
        /// <summary>
        /// Render a Cwel CardSlider Component
        /// </summary>
        /// <param name="helper">HtmlHelper</param>
        /// <param name="vm"><see cref="CardSliderViewModel"/></param>
        public static MvcHtmlString CardSlider(this HtmlHelper helper, CardSliderViewModel vm)
        {
            return helper.Partial(ComponentHelper.PatternViewPath("CardSlider"), vm);
        }
    }
}
#pragma warning restore SA1649, SA1204, SA1402
