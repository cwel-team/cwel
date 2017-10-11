using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Cwel.Web
{
    /// <summary>
    /// {{ name | pascalize }} Pattern View Model
    /// </summary>
    public class {{ name }}ViewModel
    {
        /// <summary>
        /// Gets or sets the collection of a component inside the {{ name }}
        /// </summary>
        public List<Component> Components { get; set; }
    }

    public static partial class CwelExtensions
    {
        public static MvcHtmlString {{ name | pascalize }}(this HtmlHelper helper, {{ name | pascalize }}ViewModel vm)
        {
            return helper.Partial(ComponentHelpers.PatternViewPath("{{ name | pascalize }}"), vm);
        }
    }
}
