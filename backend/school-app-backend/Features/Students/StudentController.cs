using Microsoft.AspNetCore.Mvc;

namespace school_app_backend.Features.Students;

[ApiController]
[Route("api/student")]  
public class StudentController : Controller
{
    private readonly IStudentService _studentService;
    public StudentController(IStudentService studentService)
    {
        _studentService = studentService;
    }


    [HttpGet("{id:int}")]
    public IActionResult GetStudentById(int id)
    {
        var student = _studentService.GetStudentById(id);
        return Ok(student);
    }

    [HttpPost("register")]
    public IActionResult RegisterStudent()
    {
        return Ok();
    }
    
}