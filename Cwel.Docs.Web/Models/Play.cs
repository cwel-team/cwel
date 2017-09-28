using System;

namespace Cwel.Docs.Web.Models
{
    public class Play
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
    }

    public class PlayVersion
    {
        public int Id { get; set; }
        public int PlayId { get; set; }
        public int Version { get; set; }
        public DateTime Created { get; set; }
        public string Data { get; set; }
    }
}
