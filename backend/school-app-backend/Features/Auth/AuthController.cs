using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using school_app_backend.Features.Auth.DTOs;
using school_app_backend.Features.Auth.Interfaces;

namespace school_app_backend.Features.Auth
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        public AuthController(IJwtService jwtService) { _jwtService = jwtService; }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto LoginDto /*[FromQuery] int UserId*/ /*[FromQuery] LoginDto loginDto*/)
        {

            var ipAddress = Request.Headers["X-Forwarded-For"].FirstOrDefault();
            // Si no existe, usa la IP normal
            if (string.IsNullOrEmpty(ipAddress))
            {
                ipAddress = HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString();
            }

            string token = _jwtService.GenerateToken(1, LoginDto.Username);



            return Ok(new
            {
                token = token
            });

        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] LoginDto LoginDto /*[FromQuery] int UserId*/ /*[FromQuery] LoginDto loginDto*/)
        {

            var user = "";
            return Created("", new { Message = "User created successfully" });

        }
    }

}
