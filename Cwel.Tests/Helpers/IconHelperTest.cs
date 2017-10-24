using System.Collections.Generic;
using Cwel.Web;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Cwel.Tests.Helpers
{
    [TestClass]
    public class IconHelperTest
    {
        [TestMethod]
        public void IconHelper_Should_RenderIcon_ToHTML()
        {
            var iconHtml = IconHelper.RenderIcon("<svg></svg>", new Dictionary<string, object>());
            Assert.AreEqual(iconHtml.ToString(), @"<div class=""cwel-icon""><svg></svg></div>");
        }

        [TestMethod]
        public void IconHelper_Should_Support_Adding_Classes()
        {
            var iconHtml = IconHelper.RenderIcon("<svg></svg>", new Dictionary<string, object>
            {
                { "class", "arrow" }
            });
            Assert.AreEqual(iconHtml.ToString(), @"<div class=""cwel-icon arrow""><svg></svg></div>");
        }

        [TestMethod]
        public void IconHelper_Shoulder_Handle_Attributes()
        {
            var iconHtml = IconHelper.RenderIcon("<svg></svg>", new Dictionary<string, object>
            {
                { "class", "arrow" },
                { "disabled", "true"}
            });
            Assert.AreEqual(iconHtml.ToString(), @"<div class=""cwel-icon arrow"" disabled=""true""><svg></svg></div>");
        }

        [TestMethod]
        public void IconHelper_Should_Add_Default_Classes()
        {
            var iconHtml = IconHelper.Icon(null, "~/Cwel/testing.svg");
            Assert.AreEqual(iconHtml.ToString(), @"<div class=""cwel-icon""><svg></svg></div>");
        }

        [TestMethod]
        public void IconHelper_Should_Allow_Anonymous_Object_For_Attributes()
        {
            var iconHtml = IconHelper.Icon(null, "~/Cwel/testing.svg", new { @class = "cwel", disabled = false });
            Assert.AreEqual(iconHtml.ToString(), @"<div class=""cwel-icon cwel"" disabled=""False""><svg></svg></div>");
        }
    }
}
