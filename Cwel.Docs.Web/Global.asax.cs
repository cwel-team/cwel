using System.Web.Mvc;
using System.Web.Routing;

namespace Cwel.Docs.Web
{
#pragma warning disable SA1649 // File name must match first type name
    public class MvcApplication : System.Web.HttpApplication
#pragma warning restore SA1649 // File name must match first type name
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
