using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Compilation;
using System.Web.Mvc;
using Cwel.Docs.Web.Helpers;
using Cwel.Docs.Web.Models;
using Cwel.Docs.Web.Services;
using Newtonsoft.Json;

namespace Cwel.Docs.Web.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// Playground controller used during e2e tests and for the playground
    /// </summary>
    public class PlaygroundController : Controller
    {
        private readonly PlayService _playService;

        public PlaygroundController(PlayService playService)
        {
            _playService = playService;
        }

        /// <summary>
        /// Playground Index Page
        /// </summary>
        /// <param name="id">Optional Id to load from the database</param>
        /// <param name="version">Optional Version of the data to load</param>
        [HttpGet]
        public async Task<ActionResult> Index(string id, int? version)
        {
            var playVersion = await _playService.GetPlayVersion(id, version);
            if (playVersion == null && !string.IsNullOrEmpty(id))
            {
                RouteData.Values.Remove("id");
                return RedirectToAction(nameof(Index));
            }

            return View(new PlaygroundViewModel
            {
                Id = id,
                Play = playVersion
            });
        }

        [HttpPost]
        [Route("Playground/Save/{Id?}")]
        public async Task<ActionResult> Save(string id, string data)
        {
            var saved = await _playService.SavePlay(id, data);
            return RedirectToAction("Index", new { Id = CodeGenerator.GenerateCode(saved.Item1), Version = saved.Item2 });
        }

        /// <summary>
        /// Gets the default model for a Cwomponent from its default.json file
        /// </summary>
        /// <param name="type">Type of Cwomponent</param>
        /// <param name="name">Name of Cwomponent</param>
        [Route("Playground/Model")]
        public string Model(string type, string name)
        {
            var model = System.IO.File.ReadAllText(Server.MapPath($"~/Cwel/{type}/{name}/default.json"));
            Response.ContentType = "application/json";
            return model;
        }

        /// <summary>
        /// Returns a JSOn dictionary containing all the Components and Patterns on the filesystem
        /// </summary>
        [Route("Playground/Names")]
        public JsonResult Names()
        {
            var model = new Dictionary<string, string[]>();
            try
            {
                model["components"] = Directory.GetDirectories(Server.MapPath("~/Cwel/Component"))
                    .Select(x => x.Replace(Server.MapPath("~/Cwel/Component") + @"\", string.Empty)).ToArray();

                model["patterns"] = Directory.GetDirectories(Server.MapPath("~/Cwel/Pattern"))
                    .Select(x => x.Replace(Server.MapPath("~/Cwel/Pattern") + @"\", string.Empty)).ToArray();
            }
            catch
            {
                // ignored
            }

            return Json(model, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Stage IFrame
        /// </summary>
        [Route("Playground/Stage")]
        public ActionResult Stage()
        {
            return View();
        }

        /// <summary>
        /// Render a component by type and name with a given model
        /// </summary>
        /// <param name="type">Type of Cwomponent to render</param>
        /// <param name="name">Name of Cwomponent to render</param>
        /// <param name="model">Json ViewModel of the Cwomponent</param>
        /// <param name="layout">Include the Layout when rendering</param>
        /// <exception cref="Exception">Throws if we cant compile the Razor file to determine its ViewModel type</exception>
        [Route("Playground/Render")]
        public ActionResult Render(string type, string name, string model, bool layout = false)
        {
            var view = $"~/Cwel/{type}/{name}/{name}.cshtml";
            var baseType = BuildManager.GetCompiledType(view).BaseType;

            if (baseType == null || !baseType.IsGenericType)
            {
                throw new Exception("Nah");
            }

            var modelType = baseType.GetGenericArguments()[0];
            var vm = JsonConvert.DeserializeObject(model, modelType);

            return View(new DynamicModel
            {
                Model = vm,
                View = view,
                Name = name,
                Layout = layout
            });
        }

        /// <summary>
        /// Renders a full playground page
        /// </summary>
        /// <param name="page">Page model to be rendered</param>
        [HttpPost]
        [Route("Playground/RenderPage")]
        public ActionResult RenderPage(string page)
        {
            var model = JsonConvert.DeserializeObject<PlaygroundPage>(page);
            return View(model);
        }

        /// <summary>
        /// Renders a sandbox page
        /// </summary>
        /// <param name="pageName">Name of page to be rendered</param>
        [HttpGet]
        [Route("Playground/Sandbox/{pageName?}")]
        public ActionResult Sandbox(string pageName)
        {
            return pageName == string.Empty
                ? View("sandbox/index")
                : View($"sandbox/{pageName}/index");
        }

        /// <summary>
        /// Renders a sandbox sub-page
        /// </summary>
        /// <param name="pageName">Name of page to be rendered</param>
        /// <param name="subPageName">Name of page to be rendered</param>
        [HttpGet]
        [Route("Playground/Sandbox/{pageName}/{subPageName}")]
        public ActionResult Sandbox(string pageName, string subPageName)
        {
            return subPageName == ""
                ? View($"sandbox/{pageName}/index")
                : View($"sandbox/{pageName}/{subPageName}/index");
        }


        /// <summary>
        /// Render a component by type and name with a given model
        /// </summary>
        /// <param name="model">Json ViewModel of the component</param>
        [HttpPost]
        [Route("Playground/Fiddle")]
        public ActionResult Fiddle(string model)
        {
            var pageModel = JsonConvert.DeserializeObject<PlaygroundPage>(model);
            pageModel.Layout = null;
            var cssPath = Server.MapPath("~/Cwel/cwel.css");
            var scss = System.IO.File.ReadAllText(cssPath);
            var jsPath = Server.MapPath("~/Cwel/cwel.js");
            var js = System.IO.File.ReadAllText(jsPath);
            var html = $@"<div ng-app=""cwel"">{ViewRenderer.RenderViewToString(ControllerContext, "RenderPage", pageModel)}</div>";

            scss += @"
/*********************
 * SASS TO EDIT
 ********************/

";
            scss += System.IO.File.ReadAllText(Server.MapPath("~/Cwel/Core/scss/_settings.scss"));

            foreach (var component in pageModel.Children)
            {
                var scssPath = Server.MapPath($"~/Cwel/{component.Type}/{component.Name}/{component.Name}.scss");
                scss += System.IO.File.ReadAllText(scssPath);
            }

            return Json(new
            {
                script = js,
                style = scss,
                markup = html
            });
        }
    }
}
