using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace school_app_backend.Features.Subjetcs
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        public SubjectController() { }

        [HttpGet]
        public IActionResult GetAllSubjects()
        {
            return Ok(new
            {
                StatusCode = StatusCodes.Status200OK,
            });
        }


        [HttpPost("")]
        public IActionResult CreateSubject()
        {
            return Ok(new
            {
                StatusCode = StatusCodes.Status201Created,
                Message = "Asignatura creada exitosamente"
            });
        }

        [HttpGet("{id:int}")]
        public IActionResult GetSubject(int id)
        {

            return Ok();
        }
    }
}
