using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ILogger _logger;

    public AuthenticationController(IAuthenticationService authenticationService, ILogger<AuthenticationController> logger)
    {
        _authenticationService = authenticationService;
        _logger = logger;
    }

    /// <summary>
    /// Signing in
    /// </summary>
    /// <param name="request">AuthenticateRequest ViewModel</param>
    /// <returns></returns>
    [HttpPost(Name = "Authenticate")]
    public ActionResult<string> Authenticate(AuthenticateRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_authenticationService.Authenticate(request));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }
}

