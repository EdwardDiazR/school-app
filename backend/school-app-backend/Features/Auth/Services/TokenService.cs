using school_app_backend.Features.Auth.Interfaces;
using System.Security.Claims;

namespace school_app_backend.Features.Auth.Services
{
    public class TokenService : ITokenService
    {
        public TokenService() { }

        public string GetRole(ClaimsPrincipal User)
        {
            string? Role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (Role == null)
            {
                throw new ArgumentNullException("Role is required");
            }

            return Role;
        }

        public int GetUserId(ClaimsPrincipal User)
        {
            var UserIdFromToken = User.FindFirst("UserId")?.Value;

            if (int.TryParse(UserIdFromToken, out int UserId))
            {
                return UserId;
            }
            else throw new ArgumentNullException("User Id is required");


        }
    }
}
