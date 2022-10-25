using Microsoft.AspNetCore.Identity;

namespace Boardgames.Data.Dtos.Auth
{
    public class BoardgamesUser : IdentityUser
    {
        [PersonalData]
        public string? AdditionalInfo { get; set; }
    }
}
