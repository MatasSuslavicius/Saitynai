using Boardgames.Auth.Model;
using Boardgames.Data.Dtos.Auth;
using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Entities
{
    public class Ad : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Phone { get; set; }
        public DateTime CreationDateUtc { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }

        [Required]
        public string UserId { get; set; }
        public BoardgamesUser User { get; set; }

    }
}
