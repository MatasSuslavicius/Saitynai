using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Dtos.Games
{
    public record CreateGameDto([Required]string Name, string Description);
}
