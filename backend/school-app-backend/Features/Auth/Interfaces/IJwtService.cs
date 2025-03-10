namespace school_app_backend.Features.Auth.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(int UserId,string username);
    }
}
