using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace school_app_backend.Features.Tutor
{
    [Route("api/tutor")]
    [ApiController]
    public class TutorController : ControllerBase
    {
          public TutorController() { }

        [HttpGet("my-students/{id:int}")]
        public IActionResult GetStudentsByTutorId(int TutorId)
        {
            return Ok();
        }

    }
}
