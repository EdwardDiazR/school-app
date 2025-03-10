

//Esta clase hace referencia a la tabla intermedia para la relacion estudiante y tutores
using school_app_backend.Features.Students;
using school_app_backend.Features.Tutors;
using System.ComponentModel.DataAnnotations.Schema;

namespace school_app_backend.Features.DbRelationships
{
    public class StudentTutor
    {
        public int Id { get; set; }
        [ForeignKey("Tutor")]
        public int TutorId { get; set; }

        [NotMapped]
        public Tutor Tutor { get; set; }

        [ForeignKey("Student")]
        public int StudentId { get; set; }

        [NotMapped]
        public Student Student { get; set; }
        public Relations Relation { get; set; }
        public DateTime CreationDate { get; set; }

    }

    public enum Relations
    {
        Parent = 0,
        GrandParent = 1,
        Aunt = 2,
        Sibling = 3,
        Cousin = 4,
    }
}
