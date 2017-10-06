using System;
using System.Data;
using System.Threading.Tasks;
using Cwel.Docs.Web.Helpers;
using Cwel.Docs.Web.Models;
using Dapper;

namespace Cwel.Docs.Web.Services
{
    public interface IPlayService
    {
        Task<PlayVersion> GetPlayVersion(string id, int? version);

        Task<(int, int)> SavePlay(string id, string data);
    }

    public class PlayService : IPlayService
    {
        private readonly IDbConnection _dbConnection;

        public PlayService(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<PlayVersion> GetPlayVersion(string id, int? version)
        {
            if (!string.IsNullOrEmpty(id))
            {
                var playId = CodeGenerator.GetId(id);
                return await _dbConnection.QuerySingleOrDefaultAsync<PlayVersion>(
                    $"SELECT TOP(1) * FROM [Cwel.Playground].[dbo].[PlayVersion] WHERE PlayId = @playId {(version.HasValue ? "AND [Version] = @version" : "")} ORDER BY [Version] DESC",
                    new { playId, version });
            }
            return null;
        }

        public async Task<(int, int)> SavePlay(string id, string data)
        {
            int playId;
            var version = 1;

            if (_dbConnection.State == ConnectionState.Closed)
            {
                // We need to open the connection for a transaction as we are not using dapper for it.
                _dbConnection.Open();
            }

            using (var transaction = _dbConnection.BeginTransaction())
            {
                try
                {
                    if (string.IsNullOrEmpty(id))
                    {
                        var sql =
                            @"INSERT INTO [Play] ([Created]) VALUES (@now); SELECT CAST(SCOPE_IDENTITY() as int)";
                        playId = await _dbConnection.QuerySingleAsync<int>(sql, new { now = DateTime.UtcNow }, transaction);
                    }
                    else
                    {
                        playId = CodeGenerator.GetId(id);
                        version = await _dbConnection.QuerySingleAsync<int>(
                                      @"SELECT TOP(1) [Version] FROM [dbo].[PlayVersion] WHERE PlayId = @playId ORDER BY [Version] DESC", new { playId }, transaction) + 1;
                    }

                    const string insertVersionSql = @"INSERT INTO [dbo].[PlayVersion] ([PlayId], [Version], [Data], [Created]) VALUES (@playId, @version, @data, @now)";
                    await _dbConnection.ExecuteAsync(insertVersionSql, new { playId, version, data, now = DateTime.UtcNow }, transaction);
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            return (playId, version);
        }
    }
}
