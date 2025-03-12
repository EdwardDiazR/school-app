using System.ComponentModel.DataAnnotations;

namespace school_app_backend.Features.Users
{
    public class User
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string UserType { get; set; }
        public int LoginQuanity { get; set; }
        public bool IsFirstLogin { get; set; }
        public int LoginErrorAttempts { get; set; }
        public bool IsActive { get; set; }
        public DateTime LastLoginDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
    }
}
