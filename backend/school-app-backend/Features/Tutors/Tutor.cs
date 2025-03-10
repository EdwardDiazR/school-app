using System.ComponentModel.DataAnnotations;

namespace school_app_backend.Features.Tutors
{
    public class Tutor
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public required string NationalId { get; set; }

        [AllowedValues(["C", "P"])]
        public string NationalIdTyple { get; set; }

        public bool IsDeleted { get; set; }

    }
}
