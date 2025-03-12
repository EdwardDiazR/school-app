using school_app_backend.Data;
using school_app_backend.Features.Auth.DTOs;

namespace school_app_backend.Features.Auth
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _db;
        public AuthService(ApplicationDbContext db) { _db = db; }

        public async Task<object> Login(LoginDto loginDto)
        {
            var user = _db.Users.First(u => (u.Username == loginDto.Username) && u.Password == loginDto.Password);

            //if(user.UserType == "Tutor")
            //{
            //    return tutor;
            //}else
            //{
            //   //TODO: Return employee data, as tutor etc
            //    return 
            //}

            switch (user.UserType)
            {
                case "Tutor":
                    var tutor = _db.Tutors.FirstOrDefault(t => t.Id == user.OwnerId);
                    ArgumentNullException.ThrowIfNull(tutor,"No se encontro coincidencias del tutor");
                    return tutor;

                case "Teacher":
                    return new();

                case "Director":
                    return new();

            }

        }

    }
}
