using System.Collections.Generic;

namespace Cwel.Docs.Web.Models
{
    public class PlaygroundPage
    {
        public string Layout { get; set; } = "~/Views/Shared/_RenderLayout.cshtml";

        public IList<PlaygroundItem> Children { get; set; }
    }
}
