using System;
﻿using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Cwo.Web
{
    public class {{ name }}ViewModel
    {
        public string PropertyDurr { get; set; }
    }

    public static partial class CwelExtensions
    {
        public static MvcHtmlString Card(this HtmlHelper helper, {{ name }}ViewModel vm)
        {
            return helper.Partial(ComponentHelpers.ComponentViewPath("{{ name }}"), vm);
        }
    }
}
