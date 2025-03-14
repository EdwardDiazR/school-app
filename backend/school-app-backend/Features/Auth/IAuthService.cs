using school_app_backend.Features.Auth.DTOs;

namespace school_app_backend.Features.Auth
{
    public interface IAuthService
    {
        Task<object> Login(LoginDto loginDto);
    }
}
