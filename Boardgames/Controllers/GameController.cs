using Microsoft.AspNetCore.Mvc;
using Boardgames.Data.Repositories;
using Boardgames.Data.Entities;
using Boardgames.Data.Dtos.Games;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Boardgames.Auth.Model;

namespace Boardgames.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private readonly IGameRepository _gameRepository;
        private readonly IMapper _mapper;
        private readonly IAuthorizationService _authorizationService;

        public GameController(IGameRepository gameRepository, IMapper mapper, IAuthorizationService authorizationService)
        {
            _gameRepository = gameRepository;
            _mapper = mapper;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<GameDto>> GetAllAsync()
        {
            var games = await _gameRepository.GetAsync();
            return games.Select(o => _mapper.Map<GameDto>(o));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetAsync(int id)
        {
            var game = await _gameRepository.GetAsync(id);
            if (game == null) return NotFound($"Game with id of '{id}' not found.");

            return Ok(_mapper.Map<GameDto>(game));
        }   

        [HttpPost]
        [Authorize(Roles = BoardgamesUserRoles.Admin)]
        public async Task<ActionResult<GameDto>> PostAsync(CreateGameDto gameDto)
        {
            var game = _mapper.Map<Game>(gameDto);

            await _gameRepository.InsertAsync(game);

            return Created($"/api/games/{game.Id}", _mapper.Map<GameDto>(game));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = BoardgamesUserRoles.Admin)]
        public async Task<ActionResult<GameDto>> PutAsync(int id, UpdateGameDto gameDto)
        {
            var oldGame = await _gameRepository.GetAsync(id);
            if (oldGame == null) return NotFound($"Couldn't find a game with id of '{id}'.");

            _mapper.Map(gameDto, oldGame);

            await _gameRepository.UpdateAsync(oldGame);

            return Ok(_mapper.Map<GameDto>(oldGame));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = BoardgamesUserRoles.Admin)]
        public async Task<ActionResult<GameDto>> DeleteAsync(int id)
        {
            var game = await _gameRepository.GetAsync(id);
            if (game == null) return NotFound($"Game with id of '{id}' not found.");
            await _gameRepository.DeleteAsync(game);

            //204
            return NoContent();
        }
    }
}
