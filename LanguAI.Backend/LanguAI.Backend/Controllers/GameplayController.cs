using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Gameplay;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class GameplayController : ControllerBase
{
    private readonly IGameplayService _gameplayService;
    private readonly IAuthenticationService _authenticationService;

    public GameplayController(IGameplayService gameplayService, IAuthenticationService authenticationService)
    {
        _gameplayService = gameplayService;
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Saving gameplay
    /// </summary>
    /// <param name="request">Save Gameplay Request</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveGameplay")]
    public ActionResult<bool> SaveGameplay(SaveGameplayRequestViewModel request)
    {
        var userId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(request);
        ArgumentNullException.ThrowIfNull(userId);

        if (request.UserId != userId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_gameplayService.SaveGameplay(request));
        }
        catch
        {
            return BadRequest(null);
        }
    }
}