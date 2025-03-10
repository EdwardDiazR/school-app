using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace school_app_backend.Features.Excuses
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcusesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetExcuseDetails(long Id)
        {
            return Ok();
        }
    }
}
