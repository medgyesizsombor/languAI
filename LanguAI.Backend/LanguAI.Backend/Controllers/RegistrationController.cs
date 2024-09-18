using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Registration;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class RegistrationController : ControllerBase
{
    private readonly IRegistrationService _registrationService;
    private readonly IFriendshipService _friendshipService;

    public RegistrationController(IRegistrationService registrationService, IFriendshipService friendshipService)
    {
        _registrationService = registrationService;
        _friendshipService = friendshipService;
    }

    /// <summary>
    /// Register and create a friendship with ChatGPT
    /// </summary>
    /// <param name="request">Request ViewModel</param>
    /// <returns></returns>
    [HttpPost(Name = "Register")]
    public ActionResult<bool> Register(RegisterRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            int? userId = _registrationService.Register(request);

            if (userId == null)
            {
                return false;
            }

            bool isRegistrationSuccessful = _friendshipService.CreateFriendshipWithChatGPT((int)userId);

            return isRegistrationSuccessful;
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}