using Microsoft.EntityFrameworkCore;
using school_app_backend.Data;
using school_app_backend.Features.DbRelationships;
using school_app_backend.Features.Students;

namespace school_app_backend.Features.Tutors
{
    public class TutorService : ITutorService
    {
        private readonly ApplicationDbContext _db;
        public TutorService(ApplicationDbContext db) { _db = db; }
        public async Task<IEnumerable<Tutor>> GetTutors()
        {
            IEnumerable<Tutor> tutors = await _db.Tutors.ToListAsync();
            return tutors;
        }

        public async Task<Tutor> GetTutorById(int TutorId)
        {
            Tutor? tutor = await _db.Tutors.FindAsync(TutorId);
            if (tutor == null)
            {
                throw new ArgumentNullException("Tutor not found");
            }

            return tutor;
        }
        public async void CreateTutor()
        {

        }

        public void UpdateTutor()
        {

        }
        public async void DeleteTutor(int TutorId)
        {

            Tutor? tutor = _db.Tutors.Find(TutorId);

            ArgumentNullException.ThrowIfNull(tutor);

            if (tutor.IsDeleted)
            {
                throw new Exception("Ya este tutor ha sido eliminado");
            }

            tutor.IsDeleted = true;

            _db.Tutors.Update(tutor);
            await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Student>> GetStudentsByTutorId(int TutorId)
        {
            if (_db.Students.Count() <=2)
            {
                var s = new Student()
                {
                    ActualGrade = 6,
                    CreatedBy = 1,
                    CreationDate = DateTime.Now,
                    DateOfBirth = DateTime.Now,
                    FirstName = "Ju",
                    FullName = "Perla",
                    Gender = 'M',
                    IsActive = true,
                    IsDeleted = false,
                    LastName = "a",
                    TutorQuantity = 1
                };
                var ss = new Student()
                {
                    
                    ActualGrade = 6,
                    CreatedBy = 1,
                    CreationDate = DateTime.Now,
                    DateOfBirth = DateTime.Now,
                    FirstName = "Ju",
                    FullName = "Zara",
                    Gender = 'M',
                    IsActive = true,
                    IsDeleted = false,
                    LastName = "a",
                    TutorQuantity = 1
                };
                _db.Students.Add(s);


                _db.Students.Add(ss);


            }

            if (_db.StudentsTutors.Count() <= 1)
            {
                StudentTutor std = new()
                {
                    CreationDate = DateTime.Now,
                    Relation = Relations.Parent,
                    StudentId = 1,
                    TutorId = 1
                };
                StudentTutor stds = new()
                {
                    CreationDate = DateTime.Now,
                    Relation = Relations.Parent,
                    StudentId = 2,
                    TutorId = 1
                };

                _db.StudentsTutors.Add(std);
                _db.StudentsTutors.Add(stds);

            }
            _db.SaveChanges();

            IEnumerable<Student> students = await _db.StudentsTutors
                .Where(tutor => tutor.TutorId == TutorId)
                .Join(_db.Students, studentTutor => studentTutor.StudentId, student => student.Id, (tutor, et) => et)
                .ToListAsync();

            return students;
        }

        public async void AssignStudentToTutor(int StudentId, int TutorId, int UserId)
        {
            var a = new StudentTutor()
            {
                StudentId = StudentId,
                TutorId = TutorId,
                CreationDate = DateTime.Now,
                Relation = Relations.Parent,
            };
            await _db.StudentsTutors.AddAsync(a);
            await _db.SaveChangesAsync();
        }
        public async void RemoveStudentFromTutor(int StudentId, int TutorId, int UserId)
        {
            var tutor = _db.StudentsTutors.FirstOrDefault(s => s.StudentId == StudentId && s.TutorId == TutorId);
            ArgumentNullException.ThrowIfNull(tutor, "Not found");

            _db.StudentsTutors.Remove(tutor);
            await _db.SaveChangesAsync();
        }

    }
}
