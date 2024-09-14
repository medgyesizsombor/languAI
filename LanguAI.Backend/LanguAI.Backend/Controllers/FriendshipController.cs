using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.SelectorModel;
using LanguAI.Backend.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FriendshipController : ControllerBase
{
    private readonly IFriendshipService _friendshipService;

    private readonly ILogger<UserController> _logger;

    public FriendshipController(ILogger<UserController> logger, IFriendshipService friendshipService)
    {
        _logger = logger;
        _friendshipService = friendshipService;
    }

    /// <summary>
    /// Request a friendship
    /// </summary>
    /// <param name="requesterId">Requester's id</param>
    /// <param name="recipientId">Recipient's id</param>
    /// <returns></returns>
    [HttpPost(Name = "RequestFriendship")]
    public ActionResult<bool> RequestFriendship(int requesterId, int recipientId)
    {
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(recipientId);

        try
        {
            return Ok(_friendshipService.RequestFriendship(requesterId, recipientId));
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
    /// React the friendship request
    /// </summary>
    /// <param name="recipientId">Id of the friendship request Recipient</param>
    /// <param name="requesterId">Id of the friendship requester</param>
    /// <param name="friendshipStatus">Reacted friendship status</param>
    /// <returns></returns>
    [HttpPost(Name = "ReactFriendshipRequest")]
    public ActionResult<FriendshipStatusEnum> ReactFriendshipRequest(int recipientId, int requesterId, FriendshipStatusEnum friendshipStatus)
    {
        ArgumentNullException.ThrowIfNull(recipientId);
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(friendshipStatus);

        try
        {
            return Ok(_friendshipService.ReactFriendshipRequest(recipientId, requesterId, friendshipStatus));
        }
        catch (Exception)
        {
            return FriendshipStatusEnum.Requested;
        }
    }
}