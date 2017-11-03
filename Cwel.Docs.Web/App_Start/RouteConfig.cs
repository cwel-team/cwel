using System.Web.Mvc;
using System.Web.Routing;

namespace Cwel.Docs.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                name: "Playground",
                url: "Playground/{id}/{version}",
                defaults: new { controller = "Playground", action = "Index", id = UrlParameter.Optional, version = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Sandbox",
                url: "Playground/Sandbox/{page}/{sub}",
                defaults: new { controller = "Playground", action = "Sandbox", page = UrlParameter.Optional, sub = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
          }
    }
}
