using Microsoft.AspNetCore.Mvc;
using Boardgames.Data.Repositories;
using Boardgames.Data.Entities;
using Boardgames.Data.Dtos.Questions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Boardgames.Auth.Model;
using System.Security.Claims;

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
        private readonly IAuthorizationService _authorizationService;

        public QuestionsController(IAdsRepository adsRepository, IMapper mapper, IGameRepository gameRepository, IQuestionsRepository questionsRepository, IAuthorizationService authorizationService)
        {
            _adsRepository = adsRepository;
            _mapper = mapper;
            _gameRepository = gameRepository;
            _questionsRepository = questionsRepository;
            _authorizationService = authorizationService;
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
        [Authorize(Roles = BoardgamesUserRoles.SimpleUser)]
        public async Task<ActionResult<QuestionDto>> PostAsync(int gameId, int adId, CreateQuestionDto questionDto)
        {
            var game = await _gameRepository.GetAsync(gameId);
            if (game == null) return NotFound($"Couldn't find a topic with id of '{gameId}'.");

            var ad = await _adsRepository.GetAsync(gameId, adId);
            if (ad == null) return NotFound($"Couldn't find an ad with id of '{adId}'.");

            var question = _mapper.Map<Question>(questionDto);
            question.AdId = adId;
            question.UserId = User.FindFirstValue(CustomClaims.UserId);

            await _questionsRepository.InsertAsync(question);

            return Created($"/api/games/{gameId}/ads/{adId}/questions/{question.Id}", _mapper.Map<QuestionDto>(question));
        }

        [HttpPut("{questionId}")]
        [Authorize(Roles = BoardgamesUserRoles.SimpleUser)]
        public async Task<ActionResult<QuestionDto>> PutAsync(int gameId, int adId, int questionId, UpdateQuestionDto questionDto)
        {
            var game = await _gameRepository.GetAsync(gameId);
            if (game == null) return NotFound($"Couldn't find a topic with id of '{gameId}'.");

            var ad = await _adsRepository.GetAsync(gameId, adId);
            if (ad == null) return NotFound($"Couldn't find a ad with id of '{adId}'.");

            var oldQuestion = await _questionsRepository.GetAsync(adId, questionId);
            if (oldQuestion == null) return NotFound($"Couldn't find a question with id of '{questionId}'.");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, oldQuestion, PolicyNames.SameUser);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            _mapper.Map(questionDto, oldQuestion);

            await _questionsRepository.UpdateAsync(oldQuestion);

            return Ok(_mapper.Map<QuestionDto>(oldQuestion));
        }

        [HttpDelete("{questionId}")]
        [Authorize(Roles = BoardgamesUserRoles.SimpleUser)]
        public async Task<ActionResult> DeleteAsync(int adId, int questionId)
        {

            var question = await _questionsRepository.GetAsync(adId, questionId);
            if (question == null) return NotFound($"Question with id of '{questionId}' not found.");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, question, PolicyNames.SameUser);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            await _questionsRepository.DeleteAsync(question);

            //204
            return NoContent();
        }
    }
}
