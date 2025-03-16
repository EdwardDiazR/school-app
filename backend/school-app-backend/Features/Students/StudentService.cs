using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using school_app_backend.Data;
using school_app_backend.Features.Students.DTOs;
using System.Security.Claims;
using System.Text;
using school_app_backend.Features.Tutors;
using school_app_backend.Features.DbRelationships;
using AutoMapper;
using AutoMapper.QueryableExtensions;

namespace school_app_backend.Features.Students
{
    public class StudentService : IStudentService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;

        DateTime TodaysDateTime = DateTime.Now;
        public StudentService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;

        }

        public async Task<IEnumerable<Student>> GetStudents()
        {


            IEnumerable<Student> student = await _db.Students.ToListAsync();

            ArgumentNullException.ThrowIfNull(student);

            return student;
        }
        public Student GetStudentById(int StudentId)
        {
            //_db.Students.Where(s => EF.Functions.Like(s.FullName, "Nombre"));
            //TODO: FILTRAR LOS ESTUDIANTES DE LA CLASE DE DICHO PROFESOR

            var student = _db.Students
                .Where(s => s.Id == StudentId && !s.IsDeleted)
                .FirstOrDefault();

            return student;
        }
        public static readonly Dictionary<int, string> Grados = new Dictionary<int, string>
    {
        { 1, "Preescolar" },
        { 2, "Primaria" },
        { 3, "Secundaria" },
        { 4, "Bachillerato" }
            ,{ 6, "Bachillerato" }
    };
        public async Task<StudentResponseToTutor> GetStudentByIdToTutor(int StudentId, int TutorId)
        {


            var config = new MapperConfiguration(cfg => cfg.CreateMap<Student, StudentResponseToTutor>()
            .ForMember(dest => dest.ActualGrade, opt => opt.MapFrom(src => Grados.ContainsKey(src.ActualGrade) ? Grados[src.ActualGrade] : "Desconocido")));
            var mapper = config.CreateMapper();
            //_db.Students.Where(s => EF.Functions.Like(s.FullName, "Nombre"));
            //TODO: FILTRAR LOS ESTUDIANTES DE LA CLASE DE DICHO PROFESOR

            //Chequear si el tutor solicitante es tutor del estudiante, para no devolver estudiante al NO TUTOR
            bool isTutor = _db.StudentsTutors.Any(s => s.TutorId == TutorId && s.StudentId == StudentId);

            if (!isTutor)
            {
                throw new Exception("Not authorized");
            }

            var student = await _db.Students
                .Where(student => student.Id == StudentId)
                .Select(s => mapper.Map<StudentResponseToTutor>(s))
                .FirstOrDefaultAsync();



            if (student == null)
            {
                throw new ArgumentNullException("Student not found");
            }

            return student;
        }
        public async Task<StudentResponseToTeacher> GetStudentByIdToTeacher(int StudentId, int TeacherId)
        {

            var s = new Student()
            {

                ActualGrade = 0,
                CreatedBy = 1,
                CreationDate = DateTime.Now,
                DateOfBirth = DateTime.Now,
                FirstName = "Ju",
                FullName = "Julianny Matos",
                Gender = 'M',
                IsActive = true,
                IsDeleted = false,
                LastName = "a",
                TutorQuantity = 1
            };
            _db.Students.Add(s);
            _db.SaveChanges();

            var config = new MapperConfiguration(cfg => cfg.CreateMap<Student, StudentResponseToTeacher>());
            var mapper = config.CreateMapper();
            //TODO: FILTRAR LOS ESTUDIANTES DE LA CLASE DE DICHO PROFESOR
            Console.WriteLine("Llamando techaer");
            var student = await _db.Students
                .Where(s => s.Id == StudentId && !s.IsDeleted)
                .Select(s => mapper.Map<StudentResponseToTeacher>(s))
                .FirstOrDefaultAsync();

            ArgumentNullException.ThrowIfNull(student);

            return student;
        }
        public async Task<List<Student>> GetStudentByName(string name)
        {
            var students = await _db.Students
                .Where(s => EF.Functions.Like(s.FullName, name))
                .ToListAsync();

            return students;
        }
        public async Task<Student> RegisterStudent(CreateStudentDto createStudentDto, int UserId)
        {
            string FormattedFullName = string.Join(" ", new[] { createStudentDto.FirstName, createStudentDto.MiddleName, createStudentDto.LastName, createStudentDto.SecondLastName }.Where(s => !string.IsNullOrWhiteSpace(s)));
            Student student = new()
            {
                FirstName = createStudentDto.FirstName,
                MiddleName = createStudentDto.MiddleName,
                LastName = createStudentDto.LastName,
                SecondLastName = createStudentDto.SecondLastName,
                FullName = FormattedFullName,
                Gender = createStudentDto.Gender,
                DateOfBirth = createStudentDto.Dob,
                Age = CalculateAge(createStudentDto.Dob),
                Email = createStudentDto.Email,
                Phone = createStudentDto.Phone,
                CreationDate = TodaysDateTime,
                LastUpdateDate = TodaysDateTime,
                TutorQuantity = 1,
                ActualGrade = createStudentDto.ActualGrade,
                IsDeleted = false,
                IsActive = true,
                CreatedBy = UserId
            };

            await _db.Students.AddAsync(student);
            await _db.SaveChangesAsync();
            return student;
        }
        public async Task<Student> UpdateStudent()
        {
            return await _db.Students.FirstAsync();
        }

        public async void DeleteStudent(int StudentId, int UserId)
        {

            var student = _db.Students.FirstOrDefault(s => s.Id == StudentId && !s.IsDeleted);
            ArgumentNullException.ThrowIfNull(student, "Student not found");

            _db.Students.Remove(student);
            await _db.SaveChangesAsync();
        }
        public async Task<IEnumerable<Tutor>> GetTutorsByStudentId(int StudentId)
        {
            //TODO: Implement db
            IEnumerable<Tutor> list = await _db.StudentsTutors
                .Where(s => s.StudentId == StudentId)
                .Join(_db.Tutors, studentTutor => studentTutor.TutorId, tutor => tutor.Id, (student, tutor) => tutor)
                .ToListAsync();

            return list;
        }
        private int CalculateAge(DateTime DateOfBirth)
        {
            //Subject = new ClaimsIdentity(new[]
            //   {
            //        new Claim("TeacherId", "1"), // ID del profesor
            //        new Claim(ClaimTypes.Role, "TEACHER")
            //    }),
            return 1;
        }

    }
}
