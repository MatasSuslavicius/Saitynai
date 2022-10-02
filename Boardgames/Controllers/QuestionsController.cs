using Microsoft.AspNetCore.Mvc;
using Boardgames.Data.Repositories;
using Boardgames.Data.Entities;
using Boardgames.Data.Dtos.Questions;
using AutoMapper;

namespace Boardgames.Controllers
{
    [ApiController]
    [Route("api/games/{gameId}/ads/{adId}/questions")]
    public class QuestionsController : ControllerBase
    {
        private readonly IAdsRepository _adsRepository;
        private readonly IMapper _mapper;
        private readonly IGameRepository _gameRepository;
        private readonly IQuestionsRepository _questionsRepository;

        public QuestionsController(IAdsRepository adsRepository, IMapper mapper, IGameRepository gameRepository, IQuestionsRepository questionsRepository)
        {
            _adsRepository = adsRepository;
            _mapper = mapper;
            _gameRepository = gameRepository;
            _questionsRepository = questionsRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<QuestionDto>> GetAllAsync(int adId)
        {
            var questions = await _questionsRepository.GetAsync(adId);
            return questions.Select(o => _mapper.Map<QuestionDto>(o));
        }

        [HttpGet("{questionId}")]
        public async Task<ActionResult<QuestionDto>> GetAsync(int adId, int questionId)
        {
            var question = await _questionsRepository.GetAsync(adId, questionId);
            if (question == null) return NotFound($"Question with id of '{questionId}' not found.");

            return Ok(_mapper.Map<QuestionDto>(question));
        }

        [HttpPost]
        public async Task<ActionResult<QuestionDto>> PostAsync(int gameId, int adId, CreateQuestionDto questionDto)
        {
            var game = await _gameRepository.GetAsync(gameId);
            if (game == null) return NotFound($"Couldn't find a topic with id of '{gameId}'.");

            var ad = await _adsRepository.GetAsync(gameId, adId);
            if (ad == null) return NotFound($"Couldn't find an ad with id of '{adId}'.");

            var question = _mapper.Map<Question>(questionDto);
            question.AdId = adId;

            await _questionsRepository.InsertAsync(question);

            return Created($"/api/games/{gameId}/ads/{adId}/questions/{question.Id}", _mapper.Map<QuestionDto>(question));
        }

        [HttpPut("{questionId}")]
        public async Task<ActionResult<QuestionDto>> PutAsync(int gameId, int adId, int questionId, UpdateQuestionDto questionDto)
        {
            var game = await _gameRepository.GetAsync(gameId);
            if (game == null) return NotFound($"Couldn't find a topic with id of '{gameId}'.");

            var ad = await _adsRepository.GetAsync(gameId, adId);
            if (ad == null) return NotFound($"Couldn't find a ad with id of '{adId}'.");

            var oldQuestion = await _questionsRepository.GetAsync(adId, questionId);
            if (oldQuestion == null) return NotFound($"Couldn't find a question with id of '{questionId}'.");

            _mapper.Map(questionDto, oldQuestion);

            await _questionsRepository.UpdateAsync(oldQuestion);

            return Ok(_mapper.Map<QuestionDto>(oldQuestion));
        }

        [HttpDelete("{questionId}")]
        public async Task<ActionResult> DeleteAsync(int adId, int questionId)
        {

            var question = await _questionsRepository.GetAsync(adId, questionId);
            if (question == null) return NotFound($"Question with id of '{questionId}' not found.");
            await _questionsRepository.DeleteAsync(question);

            //204
            return NoContent();
        }
    }
}
