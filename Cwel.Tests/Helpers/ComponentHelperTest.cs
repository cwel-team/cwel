using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Cwel.Web;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Cwel.Tests.Helpers
{
    /// <summary>
    /// Summary description for ComponentHelperTest
    /// </summary>
    [TestClass]
    public class ComponentHelperTest
    {
        [TestInitialize]
        public void AssetHelperTestsSetup()
        {
            HttpContext.Current = new HttpContext(
                new HttpRequest(string.Empty, "http://mocktest.cwo/", string.Empty),
                new HttpResponse(new StringWriter()));
        }

        [TestMethod]
        public void ComponentHelperCanGetComponentViewPath()
        {
            var path = ComponentHelper.ComponentViewPath("Card");
            Assert.AreEqual(path, "~/Cwel/component/Card/Card.cshtml");
        }

        [TestMethod]
        public void ComponentHelperCanGetPatternViewPath()
        {
            var path = ComponentHelper.ComponentViewPath("CardSlider");
            Assert.AreEqual(path, "~/Cwel/component/CardSlider/CardSlider.cshtml");
        }

        [TestMethod]
        public void ComponentHelperCanGetIconPath()
        {
            var path = ComponentHelper.IconPath("arrow");
            Assert.AreEqual(path, "~/Cwel/Assets/icon/arrow.svg");
        }
    }
}
