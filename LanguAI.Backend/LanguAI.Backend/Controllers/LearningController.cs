using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Learning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class LearningController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ILearningService _learningService;

    public LearningController(IAuthenticationService authenticationService, ILearningService learningService)
    {
        _authenticationService = authenticationService;
        _learningService = learningService;
    }

    /// <summary>
    /// Save learning
    /// </summary>
    /// <param name="request">SaveLearningRequest</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveLearning")]
    public ActionResult<int> SaveLearning(SaveLearningRequestViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        if (currentUserId != request.UserId) throw new ArgumentException();

        return Ok(_learningService.SaveLearning(request));
    }

    /// <summary>
    /// Get current user's learnings
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetLearningsOfUser")]
    public ActionResult<List<LearningViewModel>> GetLearningsOfUser()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        return Ok(_learningService.GetLearningsOfUser((int)currentUserId));
    }

    /// <summary>
    /// Change Active Learning by id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <param name="learningId">Id of the activable learning</param>
    /// <returns></returns>
    [HttpPost(Name = "ChangeActiveLearning")]
    public ActionResult<bool> ChangeActiveLearning(int userId, int learningId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        if (currentUserId != userId) throw new UnauthorizedAccessException();

        return Ok(_learningService.ChangeActiveLearning(userId, learningId));
    }
}
