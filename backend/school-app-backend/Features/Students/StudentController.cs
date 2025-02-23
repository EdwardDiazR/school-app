using Microsoft.AspNetCore.Mvc;

namespace school_app_backend.Features.Students;

[ApiController]
[Route("api/student")]  
public class StudentController : Controller
{
    public StudentController()
    {
    }


    [HttpGet("{id:int}")]
    public IActionResult GetStudentById(int id)
    {
        return Ok();
    }

    [HttpPost("register")]
    public IActionResult RegisterStudent()
    {
        return Ok();
    }
    
}