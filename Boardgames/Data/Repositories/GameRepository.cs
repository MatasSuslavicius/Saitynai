using Boardgames.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Boardgames.Data.Repositories
{
    public interface IGameRepository
    {
        Task DeleteAsync(Game game);
        Task<List<Game>> GetAsync();
        Task<Game> GetAsync(int gameId);
        Task InsertAsync(Game game);
        Task UpdateAsync(Game game);
    }

    public class GameRepository : IGameRepository
    {
        private readonly BoardgameContext _boardgameContext;
        public GameRepository(BoardgameContext boardgameContext)
        {
            _boardgameContext = boardgameContext;
        }
        public async Task<List<Game>> GetAsync()
        {
            return await _boardgameContext.Games.ToListAsync();
        }
        public async Task<Game> GetAsync(int gameId)
        {
            return await _boardgameContext.Games.FirstOrDefaultAsync(o => o.Id == gameId);
        }

        public async Task InsertAsync(Game game)
        {
            _boardgameContext.Games.Add(game);
            await _boardgameContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Game game)
        {
            _boardgameContext.Games.Update(game);
            await _boardgameContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Game game)
        {
            _boardgameContext.Games.Remove(game);
            await _boardgameContext.SaveChangesAsync();
        }
    }
}
