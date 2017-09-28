using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Compilation;
using System.Web.Mvc;
using Cwel.Docs.Web.Helpers;
using Cwel.Docs.Web.Models;
using Dapper;
using Newtonsoft.Json;

namespace Cwel.Docs.Web.Controllers
{
    /// <summary>
    /// Playground controller used during e2e tests and for the playground
    /// </summary>
    public class PlaygroundController : Controller
    {
        /// <summary>
        /// Display the playground UI
        /// </summary>
        [HttpGet]
        [Route("Playground/{id?}/{version?}")]
        public async Task<ActionResult> Index(string id, int? version)
        {
            PlayVersion play = null;
            if (!string.IsNullOrEmpty(id))
            {
                //TODO refactor this out of the controller
                var playId = CodeGenerator.GetId(id);
                using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["PlaygroundDb"].ConnectionString))
                {
                    play = await db.QuerySingleOrDefaultAsync<PlayVersion>(
                        $"SELECT TOP(1) * FROM [Cwel.Playground].[dbo].[PlayVersion] WHERE PlayId = @playId {(version.HasValue ? "AND [Version] = @version" : "")} ORDER BY [Version] DESC",
                        new { playId, version });
                }
            }

            return View(play);
        }

        [HttpPost]
        [Route("Playground/Save/{Id?}")]
        public async Task<ActionResult> Save(string id, string data)
        {
            //TODO refactor this out of the controller
            int playId;
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["PlaygroundDb"].ConnectionString))
            {
                db.Open();
                using (var transaction = db.BeginTransaction())
                {
                    try
                    {
                        var version = 0;
                        if (string.IsNullOrEmpty(id))
                        {
                            var sql =
                                @"INSERT INTO [Play] ([Created]) VALUES (@now); SELECT CAST(SCOPE_IDENTITY() as int)";
                            playId = await db.QuerySingleAsync<int>(sql, new {now = DateTime.UtcNow}, transaction);
                        }
                        else
                        {
                            playId = CodeGenerator.GetId(id);
                            version = await db.QuerySingleAsync<int>(
                                @"SELECT TOP(1) [Version] FROM [dbo].[PlayVersion] WHERE PlayId = @playId ORDER BY [Version] DESC", new { playId }, transaction);
                        }

                        var insertVersionSql =
                            @"INSERT INTO [dbo].[PlayVersion] ([PlayId], [Version], [Data], [Created]) VALUES (@playId, @version, @data, @now)";
                        await db.ExecuteAsync(insertVersionSql, new {playId, version = version + 1, data, now = DateTime.UtcNow}, transaction);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            //TODO Ajax or Post
            return RedirectToAction("Index", new { Id = CodeGenerator.GenerateCode(playId) });
        }

        /// <summary>
        /// Gets the default model for a Cwomponent from its default.json file
        /// </summary>
        /// <param name="type">Type of Cwomponent</param>
        /// <param name="name">Name of Cwomponent</param>
        public string Model(string type, string name)
        {
            var model = System.IO.File.ReadAllText(Server.MapPath($"~/Cwomponents/{type}/{name}/default.json"));
            Response.ContentType = "application/json";
            return model;
        }

        /// <summary>
        /// Returns a JSOn dictionary containing all the Components and Patterns on the filesystem
        /// </summary>
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
        public ActionResult RenderPage(string model)
        {
            var page = JsonConvert.DeserializeObject<PlaygroundPage>(model);
            return View(page);
        }
    }
}
