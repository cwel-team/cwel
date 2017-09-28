namespace Cwel.Docs.Web.Models
{
    /// <summary>
    /// Model used when dynamically rendering a component inside the docs site
    /// </summary>
    public class DynamicModel
    {
#pragma warning disable SA1600 // Elements must be documented
        public string Name { get; set; }

        public string View { get; set; }

        public object Model { get; set; }

        public bool Layout { get; set; }
#pragma warning restore SA1600 // Elements must be documented
    }
}
