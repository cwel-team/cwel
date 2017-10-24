using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Cwel.Web;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Cwel.Tests.Helpers
{
    [TestClass]
    public class AssetHelperTest
    {
        [TestInitialize]
        public void Setup()
        {
            HttpContext.Current = new HttpContext(
                new HttpRequest(string.Empty, "http://mocktest.cwo/", string.Empty),
                new HttpResponse(new StringWriter()));
        }

        [TestMethod]
        public void AssetHelper_Should_Get_Component_Script_Path()
        {
            var path = AssetHelper.GetScriptAssetPath(AssetType.Component, "Card");
            Assert.AreEqual(path, "/cwel/component/card/card.js");
        }

        [TestMethod]
        public void AssetHelper_Should_Get_Pattern_Script_Path()
        {
            var path = AssetHelper.GetScriptAssetPath(AssetType.Pattern, "CardSlider");
            Assert.AreEqual(path, "/cwel/pattern/cardslider/cardslider.js");
        }

        [TestMethod]
        public void AssetHelper_Should_Get_Vendor_Pattern_Script_Path()
        {
            var path = AssetHelper.GetScriptAssetPath(AssetType.Vendor, "Howler");
            Assert.AreEqual(path, "/assets/js/vendor/howler.js");
        }

        [TestMethod]
        public void AssetHelper_Should_Require_Script_Stores_Script_Path_In_Http_Context()
        {
            // Call Helper
            ((HtmlHelper)null).RequireScript(AssetType.Component, "Card");

            var scripts = (Dictionary<string, string>)HttpContext.Current.Items[AssetHelper.ScriptsContextKey];

            Assert.IsNotNull(scripts);
            Assert.AreEqual(scripts["Component:Card"], "/cwel/component/card/card.js");
        }

        [TestMethod]
        public void AssetHelper_Should_Render_Scripts()
        {
            // Call Helper
            ((HtmlHelper)null).RequireScript(AssetType.Component, "Card");

            var htmlString = ((HtmlHelper)null).RenderScripts();

            Assert.IsNotNull(htmlString);
            Assert.IsFalse(string.IsNullOrEmpty(htmlString.ToString()));
            Assert.AreEqual(@"<script src=""/cwel/component/card/card.js""></script>", htmlString.ToString());
        }

        [TestMethod]
        public void AssetHelper_Should_Render_Multiple_Scripts()
        {
            // Call Helper
            ((HtmlHelper)null).RequireScript(AssetType.Component, "Card");
            ((HtmlHelper)null).RequireScript(AssetType.Component, "Badge");

            var htmlString = ((HtmlHelper)null).RenderScripts();

            Assert.IsNotNull(htmlString);
            Assert.IsFalse(string.IsNullOrEmpty(htmlString.ToString()));
            Assert.AreEqual(@"<script src=""/cwel/component/card/card.js""></script><script src=""/cwel/component/badge/badge.js""></script>", htmlString.ToString());
        }

        [TestMethod]
        public void AssetHelper_Should_Handle_No_Scripts()
        {
            var htmlString = ((HtmlHelper)null).RenderScripts();

            Assert.IsNotNull(htmlString);
            Assert.IsTrue(string.IsNullOrEmpty(htmlString.ToString()));
        }

        [TestMethod]
        public void AssetHelper_Should_Push_Http2Headers()
        {
            var responseMock = new Mock<HttpResponseBase>();
            var context = new Mock<HttpContextBase>();
            const string expected = "</cwel/component/card/card.js>; rel=preload; as=script,</cwel/component/badge/badge.js>; rel=preload; as=script";

            context.Setup(c => c.Items).Returns(new Dictionary<string, object>());
            context.Setup(c => c.Response).Returns(responseMock.Object);
            responseMock.Setup(c => c.Headers).Returns(new NameValueCollection());

            // Call Helper
            ((HtmlHelper)null).RequireScript(AssetType.Component, "Card", context.Object);
            ((HtmlHelper)null).RequireScript(AssetType.Component, "Badge", context.Object);

            ((HtmlHelper)null).ServerPush(context.Object);

            var headers = context.Object.Response.Headers;
            Assert.AreEqual(expected, headers["Link"]);
        }
    }
}
