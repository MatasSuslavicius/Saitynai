using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Dtos.Ads
{
    public record CreateAdDto([Required]string Name, string Description, [Required] double Price, [Required] string Phone);
}
