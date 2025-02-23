using Microsoft.AspNetCore.Mvc;

namespace school_app_backend.Features.Students;

public class StudentController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}