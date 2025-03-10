using school_app_backend.Features.Students;

namespace school_app_backend.Features.Tutors
{
    public interface ITutorService
    {
        void AssignStudentToTutor(int StudentId, int TutorId, int UserId);
        void RemoveStudentFromTutor(int StudentId, int TutorId, int UserId);
        Task<IEnumerable<Student>> GetStudentsByTutorId(int TutorId);
    }
}
