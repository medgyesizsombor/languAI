using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Learning;
using LanguAI.Backend.ViewModels.Topic;
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

    private readonly ILogger<UserController> _logger;

    public LearningController(ILogger<UserController> logger, IAuthenticationService authenticationService, ILearningService learningService)
    {
        _logger = logger;
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

        try
        {
            return Ok(_learningService.SaveLearning(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get current user's learnings
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetLearningsOfUsers")]
    public ActionResult<List<LearningViewModel>> GetLearningsOfUsers()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_learningService.GetLearningsOfUsers((int)currentUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
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
        ArgumentNullException.ThrowIfNull(learningId);

        if (currentUserId != userId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_learningService.ChangeActiveLearning(userId, learningId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet(Name = "GetCardListOfCurrentLearningGroupByTopic")]
    public ActionResult<List<TopicOfCurrentLearningViewModel>> GetCardListOfCurrentLearningGroupByTopic(int userId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        if (currentUserId != userId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_learningService.GetCardListOfCurrentLearningGroupByTopic(userId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
