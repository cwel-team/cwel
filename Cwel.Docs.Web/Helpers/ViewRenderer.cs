using Newtonsoft.Json;
using System;
using System.IO;
using System.Web.Compilation;
using System.Web.Mvc;

namespace Cwel.Docs.Web.Helpers
{
    public class ViewRenderer
    {

        /// <summary>
        /// Deserialize view model from model type in razor view, based on given type and name of CWEL component.
        /// </summary>
        /// <param name="type">CWEL component type</param>
        /// <param name="name">CWEL component name</param>
        /// <param name="model">CWEL component json</param>
        public static object DeserializeViewModel(string type, string name, string model)
        {
            var view = $"~/Cwel/{type}/{name}/{name}.cshtml";
            var baseType = BuildManager.GetCompiledType(view).BaseType;

            if (baseType == null || !baseType.IsGenericType)
            {
                throw new Exception("Ain't got no model, bruv.");
            }

            var modelType = baseType.GetGenericArguments()[0];
            var vm = JsonConvert.DeserializeObject(model, modelType);

            return vm;
        }

        /// <summary>
        /// Render view of a given model to a string.
        /// </summary>
        /// <param name="context">Controller context by which to render the view</param>
        /// <param name="viewPath">Path of a view to render</param>
        /// <param name="model">Model to give the razor script</param>
        public static string RenderViewToString(ControllerContext context, string viewPath, object model = null)
        {
            // first find the ViewEngine for this view
            var viewEngineResult = ViewEngines.Engines.FindView(context, viewPath, null);

            if (viewEngineResult == null)
            {
                throw new FileNotFoundException("View cannot be found.");
            }

            // get the view and attach the model to view data
            var view = viewEngineResult.View;
            context.Controller.ViewData.Model = model;

            string result;

            using (var sw = new StringWriter())
            {
                var ctx = new ViewContext(context, view, context.Controller.ViewData, context.Controller.TempData, sw);
                view.Render(ctx, sw);
                result = sw.ToString();
            }

            return result;
        }
    }
}
