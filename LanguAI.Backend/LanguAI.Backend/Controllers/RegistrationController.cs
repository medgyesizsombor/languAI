using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Registration;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class RegistrationController
{
    private readonly IRegistrationService _registrationService;

    public RegistrationController(IRegistrationService registrationService)
    {
        _registrationService = registrationService;
    }

    [HttpPost(Name = "Register")]
    public ActionResult<bool> Register(RegisterRequestViewModel request)
    {
        if (request == null)
        {
            return false;
        }
        
        return _registrationService.Register(request);
    }

}