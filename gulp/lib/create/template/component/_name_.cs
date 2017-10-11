using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Cwel.Web
{
    /// <summary>
    /// {{ name | pascalize }} Component View Model
    /// </summary>
    public class {{ name }}ViewModel
    {
        public string PropertyDurr { get; set; }
    }

    public static partial class CwelExtensions
    {
        public static MvcHtmlString {{ name | pascalize }}(this HtmlHelper helper, {{ name | pascalize }}ViewModel vm)
        {
            return helper.Partial(ComponentHelpers.ComponentViewPath("{{ name | pascalize }}"), vm);
        }
    }
}
