using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Dtos.Games
{
    public record UpdateGameDto([Required]string Name, string Description);
}
