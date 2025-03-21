using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using school_app_backend.Data;
using school_app_backend.Features.Auth.Interfaces;
using school_app_backend.Features.Auth.Services;
using school_app_backend.Features.Students;
using school_app_backend.Features.Tutors;
using school_app_backend.Middlewares;
using System;
using System.Text;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnectionString"))
//);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
          options.UseInMemoryDatabase("InMemoryDb"));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    var jwtKey = builder.Configuration["Jwt:SecretKey"];
    var jwtIssuer = builder.Configuration["Jwt:Issuer"];

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Error de autenticación: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            Console.WriteLine("Token JWT validado correctamente.");
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Teacher", policy => { policy.RequireRole("Teacher"); policy.RequireClaim("UserId"); });
    options.AddPolicy("Tutor", policy => policy.RequireRole("Tutor"));
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("Admission", policy => policy.RequireRole("Admin", "AdmissionSecretary"));
    options.AddPolicy("FullManagement", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector")
        );
    });

    //Students policies
    options.AddPolicy("CanViewStudent", policy =>
    {
        policy.RequireAuthenticatedUser();
    });
    options.AddPolicy("CanCreateStudent", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
            c.User.IsInRole("AdmissionSecretary")
        );
    });
    options.AddPolicy("CanModifyStudent", policy =>
    {
        policy.RequireAssertion(c =>
            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
            c.User.IsInRole("AdmissionSecretary")
        );
    });
    options.AddPolicy("CanDeleteStudent", policy =>
    {
        policy.RequireAssertion(c =>
            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
            c.User.IsInRole("AdmissionSecretary")
        );
    });

    //Tutors policies
    options.AddPolicy("CanViewTutors", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
            c.User.IsInRole("AdmissionSecretary") ||
            c.User.IsInRole("Teacher")
        );
    });
    options.AddPolicy("CanCreateTutors", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
            c.User.IsInRole("AdmissionSecretary")


        );
    });
    options.AddPolicy("CanManageTutors", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
            c.User.IsInRole("AdmissionSecretary")


        );
    });
    options.AddPolicy("CanModifyTutors", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector") ||
         c.User.IsInRole("AdmissionSecretary")
        );
    });
    options.AddPolicy("CanDeleteTutors", policy =>
    {
        policy.RequireAssertion(c =>

            c.User.IsInRole("Admin") ||
            c.User.IsInRole("Director") ||
            c.User.IsInRole("SubDirector")

        );
    });


    //Grades policies
    options.AddPolicy("CanCreateGrade", policy =>
    {
        policy.RequireAssertion(c =>
         c.User.IsInRole("Teacher")
        );
    });
    options.AddPolicy("CanDeleteGrade", policy =>
    {
        policy.RequireAssertion(c =>
         c.User.IsInRole("Teacher")
        );
    });
    options.AddPolicy("CanModifyGrade", policy =>
    {
        policy.RequireAssertion(c =>
         c.User.IsInRole("Teacher")
        );
    });

});

builder.Services.AddCors(CorsOptions =>
{
    CorsOptions.AddPolicy("FromMobileServer", options =>
    {
        options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddControllers().AddJsonOptions(o =>
{

    o.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Introduce el token en el formato: Bearer {token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    };
    options.AddSecurityDefinition("Bearer", securityScheme);

    var securityRequirement = new OpenApiSecurityRequirement
    {
        { securityScheme, new string[] { } }
    };

    options.AddSecurityRequirement(securityRequirement);
});
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ITutorService, TutorService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<ITokenService, TokenService>();


builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});
var app = builder.Build();
app.UseMiddleware<RequestLoggingMiddleware>(); // Agrega el middleware de logging

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(o => { o.EnablePersistAuthorization(); });
}

app.UseHttpsRedirection();
app.UseCors("FromMobileServer");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
