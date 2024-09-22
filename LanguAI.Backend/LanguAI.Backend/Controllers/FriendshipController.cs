using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Friendship;
using LanguAI.Backend.ViewModels.SelectorModel;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FriendshipController : ControllerBase
{
    private readonly IFriendshipService _friendshipService;
    private readonly IAuthenticationService _authenticationService;
    private readonly ILogger<UserController> _logger;

    public FriendshipController(ILogger<UserController> logger, IFriendshipService friendshipService, IAuthenticationService authenticationService)
    {
        _logger = logger;
        _friendshipService = friendshipService;
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Request a friendship
    /// </summary>>
    /// <param name="recipientId">Recipient's id</param>
    /// <returns></returns>
    [HttpPost(Name = "RequestFriendship")]
    public ActionResult<bool> RequestFriendship(int recipientId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(recipientId);

        try
        {
            return Ok(_friendshipService.RequestFriendship((int)currentUserId, recipientId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get friendlist by user Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetFriendList")]
    public ActionResult<List<IntSelectorModel>> GetFriendList(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        try
        {
            return Ok(_friendshipService.GetFriendList(userId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get Friendship by user's Id
    /// </summary>
    /// <param name="otherUserId">Current other user's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetFriendshipByUserId")]
    public ActionResult<FriendshipViewModel> GetFriendshipByUserId(int otherUserId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(otherUserId);

        try
        {
            return Ok(_friendshipService.GetFriendshipByUserId((int)currentUserId, otherUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// React the friendship request
    /// </summary>
    /// <param name="requesterId">Id of the friendship requester</param>
    /// <param name="friendshipStatus">Reacted friendship status</param>
    /// <returns></returns>
    [HttpPost(Name = "ReactFriendshipRequest")]
    public ActionResult<FriendshipStatusEnum> ReactFriendshipRequest(int requesterId, FriendshipStatusEnum friendshipStatus)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(friendshipStatus);

        try
        {
            return Ok(_friendshipService.ReactFriendshipRequest((int)currentUserId, requesterId, friendshipStatus));
        }
        catch (Exception)
        {
            return FriendshipStatusEnum.Requested;
        }
    }

    /// <summary>
    /// Get the current user's all friendship request
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetFriendshipRequestList")]
    public ActionResult<List<FriendshipRequestViewModel>> GetFriendshipRequestList()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_friendshipService.GetFriendshipRequestList((int)currentUserId));
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Get the current user's number of friendship request
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetNumberOfFriendshipRequest")]
    public ActionResult<int?> GetNumberOfFriendshipRequest()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_friendshipService.GetNumberOfFriendshipRequest((int)currentUserId));
        }
        catch (Exception)
        {
            return BadRequest(null);
        }
    }
}