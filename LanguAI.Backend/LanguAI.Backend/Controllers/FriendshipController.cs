using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Friendship;
using LanguAI.Backend.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FriendshipController : ControllerBase
{
    private readonly IFriendshipService _friendshipService;
    private readonly IAuthenticationService _authenticationService;
    private readonly ILogger<FriendshipController> _logger;

    public FriendshipController(ILogger<FriendshipController> logger, IFriendshipService friendshipService, IAuthenticationService authenticationService)
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

        return Ok(_friendshipService.RequestFriendship((int)currentUserId, recipientId));
    }

    /// <summary>
    /// Get friendlist by user Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetFriendList")]
    public async Task<ActionResult<List<OtherUserViewModel>>> GetFriendListAsync(int userId, bool showChatGPT = false)
    {
        return Ok(await _friendshipService.GetFriendListAsync(userId, showChatGPT));
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

        return Ok(_friendshipService.GetFriendshipByUserId((int)currentUserId, otherUserId));
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

        try
        {
            return Ok(_friendshipService.ReactFriendshipRequest((int)currentUserId, requesterId, friendshipStatus));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
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

        return Ok(_friendshipService.GetFriendshipRequestList((int)currentUserId));
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

        return Ok(_friendshipService.GetNumberOfFriendshipRequest((int)currentUserId));
    }

    [HttpGet(Name = "GetListOfDiscoverableUser")]
    public async Task<ActionResult<List<UserDiscoveryViewModel>>> GetListOfDiscoverableUserAsync()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        return Ok(await _friendshipService.GetListOfDiscoverableUserAsync((int)currentUserId));
    }

    [HttpDelete(Name = "DeletePendingRequest")]
    public ActionResult DeletePendingRequest(int otherUserId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        _friendshipService.DeletePendingRequest((int)currentUserId, otherUserId);
        return Ok();
    }

    [HttpDelete(Name = "DeleteFriendship")]
    public ActionResult DeleteFriendship(int otherUserId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        _friendshipService.DeleteFriendship((int)currentUserId, otherUserId);
        return Ok();
    }
}