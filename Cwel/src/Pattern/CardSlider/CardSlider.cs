using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Mvc.Html;

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
        public static MvcHtmlString CardSlider(this HtmlHelper helper, CardSliderViewModel vm)
        {
            return helper.Partial(ComponentHelpers.PatternViewPath("CardSlider"), vm);
        }
    }
}
