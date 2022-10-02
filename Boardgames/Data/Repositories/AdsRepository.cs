using Boardgames.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Boardgames.Data.Repositories
{
    public interface IAdsRepository
    {
        Task DeleteAsync(Ad ad);
        Task<List<Ad>> GetAsync(int gameId);
        Task<Ad> GetAsync(int gameId, int adId);
        Task InsertAsync(Ad ad);
        Task UpdateAsync(Ad ad);
    }

    public class AdsRepository : IAdsRepository
    {
        private readonly BoardgameContext _boardgameContext;
        public AdsRepository(BoardgameContext boardgameContext)
        {
            _boardgameContext = boardgameContext;
        }

        public async Task<Ad> GetAsync(int gameId, int adId)
        {
            return await _boardgameContext.Ads.FirstOrDefaultAsync(o => o.GameId == gameId && o.Id == adId);
        }

        public async Task<List<Ad>> GetAsync(int gameId)
        {
            return await _boardgameContext.Ads.Where(o => o.GameId == gameId).ToListAsync();
        }

        public async Task InsertAsync(Ad ad)
        {
            _boardgameContext.Ads.Add(ad);
            await _boardgameContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Ad ad)
        {
            _boardgameContext.Ads.Update(ad);
            await _boardgameContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Ad ad)
        {
            _boardgameContext.Ads.Remove(ad);
            await _boardgameContext.SaveChangesAsync();
        }
    }
}
