using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Cwel.Extensions
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString Card(this HtmlHelper helper)
        {
            return helper.Partial("~/Cwel/Components/Card/Card.cshtml");
        }       
    }
}
