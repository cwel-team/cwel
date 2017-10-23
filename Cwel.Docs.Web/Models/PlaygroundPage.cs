using System.Collections.Generic;

namespace Cwel.Docs.Web.Models
{
    public class PlaygroundPage
    {
        private string _Layout = "~/Views/Shared/_RenderLayout.cshtml";
        public string Layout { get { return _Layout; } set { _Layout = value; } }
        public IList<PlaygroundItem> Children { get; set; }
    }
}
