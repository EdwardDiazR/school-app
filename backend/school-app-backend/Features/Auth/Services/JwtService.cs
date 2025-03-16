using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using school_app_backend.Features.Auth.Interfaces;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace school_app_backend.Features.Auth.Services
{

    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public string GenerateToken(int UserId,string username)
        {
            string ? TokenSecret = _configuration["Jwt:SecretKey"];

            if (string.IsNullOrEmpty(TokenSecret))
            {
                throw new ArgumentNullException("No se pudo validar el token");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenSecret));
            // Clave secreta
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
            new Claim("username",username),
            new Claim("UserId",UserId.ToString()),
            new Claim(ClaimTypes.Role,"Tutor"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };


            // Usar timestamps numéricos
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = "https://localhost:7251",
                Audience = "https://localhost:7251",
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            //Console.WriteLine(jwt);
            return jwt;
        }
    }
}
