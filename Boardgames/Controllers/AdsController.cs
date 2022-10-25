using Microsoft.AspNetCore.Mvc;
using Boardgames.Data.Repositories;
using Boardgames.Data.Entities;
using Boardgames.Data.Dtos.Ads;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Boardgames.Auth.Model;
using System.Security.Claims;

namespace Boardgames.Controllers
{
    [ApiController]
    [Route("api/games/{gameId}/ads")]
    public class AdsController : ControllerBase
    {
        private readonly IAdsRepository _adsRepository;
        private readonly IMapper _mapper;
        private readonly IGameRepository _gameRepository;
        private readonly IAuthorizationService _authorizationService;

        public AdsController(IAdsRepository adsRepository, IMapper mapper, IGameRepository gameRepository, IAuthorizationService authorizationService)
        {
            _adsRepository = adsRepository;
            _mapper = mapper;
            _gameRepository = gameRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<AdDto>> GetAllAsync(int gameId)
        {
            var ads = await _adsRepository.GetAsync(gameId);
            return ads.Select(o => _mapper.Map<AdDto>(o));
        }

        [HttpGet("{adId}")]
        public async Task<ActionResult<AdDto>> GetAsync(int gameId, int adId)
        {
            var ad = await _adsRepository.GetAsync(gameId, adId);
            if (ad == null) return NotFound($"Ad with id of '{adId}' not found.");

            return Ok(_mapper.Map<AdDto>(ad));
        }

        [HttpPost]
        [Authorize(Roles = BoardgamesUserRoles.SimpleUser)]
        public async Task<ActionResult<AdDto>> PostAsync(int gameId, CreateAdDto adDto)
        {
            var game = await _gameRepository.GetAsync(gameId);
            if (game == null) return NotFound($"Couldn't find a topic with id of '{gameId}'.");

            var ad = _mapper.Map<Ad>(adDto);
            ad.GameId = gameId;
            ad.UserId = User.FindFirstValue(CustomClaims.UserId);

            await _adsRepository.InsertAsync(ad);

            return Created($"/api/games/{gameId}/ads/{ad.Id}", _mapper.Map<AdDto>(ad));
        }

        [HttpPut("{adId}")]
        [Authorize(Roles = BoardgamesUserRoles.SimpleUser)]
        public async Task<ActionResult<AdDto>> PutAsync(int gameId, int adId, UpdateAdDto adDto)
        {
            var game = await _gameRepository.GetAsync(gameId);
            if (game == null) return NotFound($"Couldn't find a topic with id of '{gameId}'.");

            var oldAd = await _adsRepository.GetAsync(gameId, adId);
            if (oldAd == null) return NotFound($"Couldn't find an ad with id of '{adId}'.");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, oldAd, PolicyNames.SameUser);
            if(!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            _mapper.Map(adDto, oldAd);

            await _adsRepository.UpdateAsync(oldAd);

            return Ok(_mapper.Map<AdDto>(oldAd));
        }

        [HttpDelete("{adId}")]
        [Authorize(Roles = BoardgamesUserRoles.SimpleUser)]
        public async Task<ActionResult> DeleteAsync(int gameId, int adId)
        {

            var ad = await _adsRepository.GetAsync(gameId, adId);
            if (ad == null) return NotFound($"Ad with id of '{adId}' not found.");

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, ad, PolicyNames.SameUser);
            if (!authorizationResult.Succeeded)
            {
                return Forbid();//403
            }

            await _adsRepository.DeleteAsync(ad);

            //204
            return NoContent();
        }
    }
}
