using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Dtos.Ads
{
    public record UpdateAdDto([Required] string Name, [Required] string Description, [Required] double Price, [Required] string Phone);
}
