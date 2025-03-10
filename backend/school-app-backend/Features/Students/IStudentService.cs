using Microsoft.AspNetCore.Mvc;
using school_app_backend.Features.Students.DTOs;
using school_app_backend.Features.Tutors;

namespace school_app_backend.Features.Students
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetStudents();
        Task<List<Student>> GetStudentByName(string name);
        Student GetStudentById(int StudentId);
        Task<StudentResponseToTutor> GetStudentByIdToTutor(int StudentId, int TutorId);
        Task<StudentResponseToTeacher> GetStudentByIdToTeacher(int StudentId, int TeacherId);
        Task<Student> RegisterStudent(CreateStudentDto createStudentDto,int UserId);
        Task<Student> UpdateStudent();
        void DeleteStudent(int StudentId,int UserId);
  
        Task<IEnumerable<Tutor>> GetTutorsByStudentId(int StudentId);
       





    }
}
