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
    private readonly ILogger _logger;

    public GameplayController(IGameplayService gameplayService,
        IAuthenticationService authenticationService,
        ILogger<GameplayController> logger)
    {
        _gameplayService = gameplayService;
        _authenticationService = authenticationService;
        _logger = logger;
    }

    /// <summary>
    /// Saving gameplay
    /// </summary>
    /// <param name="request">Save Gameplay Request</param>
    /// <returns>Has streak changed</returns>
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
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }
}