namespace school_app_backend.Middlewares
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;
        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            var request = context.Request;
            var endpoint = context.GetEndpoint()?.DisplayName ?? "Unknown Endpoint";
            try
            {
                _logger.LogInformation($"[Request]=> {request.Method} {request.Path} {request.QueryString}");

                await _next(context);
            }
            catch (Exception ex)
            {
                // Log de excepción si algo sale mal
                _logger.LogError($"An error occurred: {ex.Message}");
                throw;  // Re-lanzamos la excepción para que los demás middlewares la manejen}       
            }
        }
    }
}
