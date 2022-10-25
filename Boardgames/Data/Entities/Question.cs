using Boardgames.Auth.Model;
using Boardgames.Data.Dtos.Auth;
using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Entities
{
    public class Question : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Body { get; set; }
        public DateTime CreationDateUtc { get; set; }
        public int AdId { get; set; }
        public Ad Ad { get; set; }

        public string? UserId { get; set; }
        public BoardgamesUser? User { get; set; }

    }
}
