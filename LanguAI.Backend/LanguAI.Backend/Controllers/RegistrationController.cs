using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Registration;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class RegistrationController : ControllerBase
{
    private readonly IRegistrationService _registrationService;

    public RegistrationController(IRegistrationService registrationService)
    {
        _registrationService = registrationService;
    }

    /// <summary>
    /// Register
    /// </summary>
    /// <param name="request">Request ViewModel</param>
    /// <returns></returns>
    [HttpPost(Name = "Register")]
    public ActionResult<bool> Register(RegisterRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_registrationService.Register(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

}