using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using school_app_backend.Features.Auth.Interfaces;
using school_app_backend.Features.Students;
using System.Security.Claims;

namespace school_app_backend.Features.Tutors
{
    [Route("api/tutors")]
    [ApiController]
    public class TutorController : ControllerBase
    {

        private readonly IStudentService _studentService;
        private readonly ITutorService _tutorService;
        private readonly ITokenService _tokenService;
        public TutorController(IStudentService studentService,
            ITokenService tokenService,
            ITutorService tutorService)
        {

            _studentService = studentService;
            _tutorService = tutorService;
            _tokenService = tokenService;

        }


        [HttpGet("{id:int}/students")]
        [Authorize(Roles = "Tutor,Admin")]
        public IActionResult GetStudentsByTutorId(int TutorId)
        {
            var students = _tutorService.GetStudentsByTutorId(TutorId);
            return Ok(new { data = students.Result  });
        }

        [HttpPost("{StudentId:int}/tutors/{TutorId:int}")]
        [Authorize(Policy = "Admin")]
        public IActionResult AssociateTutor(int StudentId, int TutorId)
        {
            ClaimsPrincipal Token = User;
            var UserIdFromToken = _tokenService.GetUserId(Token);

            _tutorService.AssignStudentToTutor(StudentId, TutorId, UserIdFromToken);
            return Ok("Asociado exitosamente");
        }

        [HttpDelete("{StudentId:int}/tutors/{TutorId:int}")]
        [Authorize(Policy = "")]
        public IActionResult DeleteTutor(int StudentId, int TutorId)
        {

            ClaimsPrincipal Token = User;
            var UserIdFromToken = _tokenService.GetUserId(Token);


            //Desvincular el tutor del estudiante
            _tutorService.RemoveStudentFromTutor(StudentId, TutorId, UserIdFromToken);
            return Ok("Eliminado con exito");
        }


    }
}
