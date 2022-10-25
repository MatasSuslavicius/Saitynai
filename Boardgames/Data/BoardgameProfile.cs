using AutoMapper;
using Boardgames.Data.Entities;
using Boardgames.Data.Dtos.Games;
using Boardgames.Data.Dtos.Ads;
using Boardgames.Data.Dtos.Questions;
using Boardgames.Data.Dtos.Auth;

namespace Boardgames.Data
{
    public class BoardgameProfile : Profile
    {
        public BoardgameProfile()
        {
            CreateMap<Game, GameDto>();
            CreateMap<CreateGameDto, Game>();
            CreateMap<UpdateGameDto, Game>();

            CreateMap<Ad, AdDto>();
            CreateMap<CreateAdDto, Ad>();
            CreateMap<UpdateAdDto, Ad>();

            CreateMap<Question, QuestionDto>();
            CreateMap<CreateQuestionDto, Question>();
            CreateMap<UpdateQuestionDto, Question>();

            CreateMap<BoardgamesUser, UserDto>();
        }
    }
}
