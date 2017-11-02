using System.Threading.Tasks;
using Cwel.Docs.Web.Models;

namespace Cwel.Docs.Web.Services
{
    public interface IPlayService
    {
        Task<PlayVersion> GetPlayVersion(string id, int? version);

        Task<(int, int)> SavePlay(string id, string data);
    }
}
