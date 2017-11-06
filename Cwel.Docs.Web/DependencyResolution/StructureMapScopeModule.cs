using System.Web;
using Cwel.Docs.Web.App_Start;
using StructureMap.Web.Pipeline;

namespace Cwel.Docs.Web.DependencyResolution
{
    public class StructureMapScopeModule : IHttpModule
    {
        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += (sender, e) => StructuremapMvc.StructureMapDependencyScope.CreateNestedContainer();
            context.EndRequest += (sender, e) =>
            {
                HttpContextLifecycle.DisposeAndClearAll();
                StructuremapMvc.StructureMapDependencyScope.DisposeNestedContainer();
            };
        }
    }
}
