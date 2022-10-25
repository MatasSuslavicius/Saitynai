using Boardgames.Data.Dtos.Auth;
using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Entities
{
    public class Game
    {
        public int Id { get; set; } 
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
