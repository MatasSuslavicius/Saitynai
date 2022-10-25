using Boardgames.Auth.Model;
using Microsoft.AspNetCore.Authorization;

namespace Boardgames.Auth
{
    public class SameUserAuthorizationHandler : AuthorizationHandler<SameUserRequirment, IUserOwnedResource>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserRequirment requirement, 
            IUserOwnedResource resource)
        {
            if(context.User.IsInRole(BoardgamesUserRoles.Admin) ||context.User.FindFirst(CustomClaims.UserId).Value == resource.UserId)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
    public record SameUserRequirment : IAuthorizationRequirement;
}
