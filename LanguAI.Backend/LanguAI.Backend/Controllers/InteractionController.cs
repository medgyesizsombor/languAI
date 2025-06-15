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

    public InteractionController(IAuthenticationService authenticationService, IInteractionService interactionService)
    {
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

        return Ok(_interactionService.SaveInteraction(request));
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

        return Ok(_interactionService.Dislike(request));
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

        return Ok(_interactionService.DeleteComment(request));
    }
}
