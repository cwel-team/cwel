using System.Web.Mvc;
using System.Web.Mvc.Html;
#pragma warning disable SA1649, SA1204, SA1402

namespace Cwel.Web
{
    /// <summary>
    /// Image Component View Model
    /// </summary>
    public class ImageViewModel
    {
        public string PropertyDurr { get; set; }
    }

    public static partial class CwelExtensions
    {
        public static MvcHtmlString Image(this HtmlHelper helper, ImageViewModel vm)
        {
            return helper.Partial(ComponentHelpers.ComponentViewPath("Image"), vm);
        }
    }
}
#pragma warning restore SA1649, SA1204, SA140