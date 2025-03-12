using school_app_backend.Features.Auth.DTOs;

namespace school_app_backend.Features.Auth
{
    public interface IAuthService
    {
        void Login(LoginDto loginDto);
    }
}
