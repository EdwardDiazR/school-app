using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using school_app_backend.Features.Auth.Interfaces;
using school_app_backend.Features.Students.DTOs;
using System.Data;
using System.Security.Claims;

namespace school_app_backend.Features.Students;

[ApiController]
[Route("api/students")]
[Authorize]

public class StudentController : Controller
{
    private readonly IStudentService _studentService;
    private readonly ITokenService _tokenService;
    public StudentController(IStudentService studentService, ITokenService tokenService)
    {

        _studentService = studentService;
        _tokenService = tokenService;

    }

    [HttpGet]
    //[Authorize("Admin")]
    public IActionResult GetStudents()
    {

        var students = _studentService.GetStudents();
        return Ok(new
        {
            StatusCode = StatusCodes.Status200OK,
            Data = students,
        });
    }

    [HttpGet("{StudentId:int}")]
    [Authorize]
    public IActionResult GetStudentById(int StudentId)
    {
        ClaimsPrincipal Token = User;
        var UserIdFromToken = _tokenService.GetUserId(Token);
        var UserRole = _tokenService.GetRole(Token);

        if (UserRole == "Tutor")
        {
            var student = _studentService.GetStudentByIdToTutor(StudentId, UserIdFromToken);
            return Ok(new { StatusCode = StatusCodes.Status200OK, Data = student });

        }
        if (UserRole == "Teacher")
        {
            var student = _studentService.GetStudentByIdToTeacher(StudentId, UserIdFromToken);
            return Ok(new { StatusCode = StatusCodes.Status200OK, Data = student });
        }
        if (UserRole == "Admin")
        {
            var student = _studentService.GetStudentById(StudentId);
            return Ok(new { StatusCode = StatusCodes.Status200OK, Data = student });
        }

        //Si el rol no es valido, no devolver
        return BadRequest("No se pudo validar tu rol");
    }


    [HttpGet("search")]
    [Authorize]
    public IActionResult GetStudentByName([FromQuery] string name)
    {
        //var student = _studentService.GetStudentByName(name);
        return Ok(new { StatusCode = StatusCodes.Status200OK, /*Data = student*/ });
    }

    [HttpPost]
    [Authorize(Policy = "CanCreateStudent")]
    public IActionResult RegisterStudent(CreateStudentDto createStudentDto)
    {
        //HashSet<string> AuthorizedRoles = new HashSet<string>() { "Admin", "Director", "SubDirector", "Secretary" };
        try
        {
            ClaimsPrincipal Token = User;
            var UserIdFromToken = _tokenService.GetUserId(Token);
            var UserRole = _tokenService.GetRole(Token);

            //if (!AuthorizedRoles.Contains(UserRole))
            //{
            //    return Unauthorized("No tienes permisos para ejecutar esta accion");
            //}

            var student = _studentService.RegisterStudent(createStudentDto, UserIdFromToken);

            return Created("", new
            {
                StatusCode = StatusCodes.Status201Created,
                Message = "Estudiante creado exitosamente!!",
                Data = student
            });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{StudentId}")]
    [Authorize("CanDeleteStudent")]
    public IActionResult DeleteStudent([FromQuery] int StudentId)
    {
        ClaimsPrincipal Token = User;
        var UserIdFromToken = _tokenService.GetUserId(Token);
        string Role = _tokenService.GetRole(Token);

        if (Role != "Admin")
        {
            return Unauthorized(new
            {
                Message = "No tienes permisos para ejecutar esta accion.",
                StatusCode = StatusCodes.Status401Unauthorized
            });
        }

        _studentService.DeleteStudent(StudentId, UserIdFromToken);
        return Ok(new { StatusCode = StatusCodes.Status200OK, Message = "Student deleted!" });
    }

    [HttpPut]
    [Authorize(Policy = "CanModifyStudent")]
    public IActionResult UpdateStudent()
    {
        try
        {
            ClaimsPrincipal Token = User;
            var UserIdFromToken = _tokenService.GetUserId(Token);
            string Role = _tokenService.GetRole(Token);

            _studentService.UpdateStudent();//TODO require userid and necessary
            return Ok(new { UserId = UserIdFromToken, Role = Role });
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }


    [HttpGet("{StudentId:int}/tutors")]
    [Authorize(Policy = "Teacher,Admin")]
    public IActionResult GetTutorsByStudentId(int StudentId)
    {
        //ClaimsPrincipal Token = User;
        //var UserIdFromToken = _tokenService.GetUserId(Token);
        //string Role = _tokenService.GetRole(Token);

        var tutors = _studentService.GetTutorsByStudentId(StudentId);
        return Ok(new { StatusCode = StatusCodes.Status200OK, Data = tutors });
    }


}