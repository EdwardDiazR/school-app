using System.Security.Claims;

namespace school_app_backend.Features.Auth.Interfaces
{
    public interface ITokenService
    {
        string GetRole(ClaimsPrincipal User);
        int GetUserId(ClaimsPrincipal User);
    }
}
