using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Interaction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class InteractionController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IInteractionService _interactionService;

    private readonly ILogger<UserController> _logger;

    public InteractionController(ILogger<UserController> logger, IAuthenticationService authenticationService, IInteractionService interactionService)
    {
        _logger = logger;
        _interactionService = interactionService;
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Save Interaction
    /// </summary>
    /// <param name="request">Interaction to be saved</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveInteraction")]
    public ActionResult<bool> SaveInteraction(SaveInteractionRequestViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        if (request.UserId != currentUserId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_interactionService.SaveInteraction(request));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Dislike
    /// </summary>
    /// <param name="request">Interaction to be deleted</param>
    /// <returns></returns>
    [HttpPost(Name = "Dislike")]
    public ActionResult<bool> Dislike(DislikeRequestViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        if (request.UserId != currentUserId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_interactionService.Dislike(request));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Delete Comment
    /// </summary>
    /// <param name="request">Interaction to be deleted</param>
    /// <returns></returns>
    [HttpPost(Name = "DeleteComment")]
    public ActionResult<bool> DeleteComment(DeleteCommentRequestViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        if (request.UserId != currentUserId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_interactionService.DeleteComment(request));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
