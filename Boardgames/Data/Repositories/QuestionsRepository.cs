using Boardgames.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Boardgames.Data.Repositories
{
    public interface IQuestionsRepository
    {
        Task DeleteAsync(Question question);
        Task<List<Question>> GetAsync(int adId);
        Task<Question> GetAsync(int adId, int questionId);
        Task InsertAsync(Question question);
        Task UpdateAsync(Question question);
    }

    public class QuestionsRepository : IQuestionsRepository
    {
        private readonly BoardgameContext _boardgameContext;
        public QuestionsRepository(BoardgameContext boardgameContext)
        {
            _boardgameContext = boardgameContext;
        }

        public async Task<Question> GetAsync(int adId, int questionId)
        {
            return await _boardgameContext.Questions.FirstOrDefaultAsync(o => o.AdId == adId && o.Id == questionId);
        }

        public async Task<List<Question>> GetAsync(int adId)
        {
            return await _boardgameContext.Questions.Where(o => o.AdId == adId).ToListAsync();
        }

        public async Task InsertAsync(Question question)
        {
            _boardgameContext.Questions.Add(question);
            await _boardgameContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Question question)
        {
            _boardgameContext.Questions.Update(question);
            await _boardgameContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Question question)
        {
            _boardgameContext.Questions.Remove(question);
            await _boardgameContext.SaveChangesAsync();
        }
    }
}
