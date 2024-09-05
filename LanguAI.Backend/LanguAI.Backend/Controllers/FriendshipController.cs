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
    /// Save a post
    /// </summary>
    /// <param name="requesterId">Requester's id</param>
    /// <param name="receiverId">Receiver's id</param>
    /// <returns></returns>
    [HttpPost(Name = "RequestFriendship")]
    public ActionResult<bool> RequestFriendship(int requesterId, int receiverId)
    {
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(receiverId);

        try
        {
            return Ok(_friendshipService.RequestFriendship(requesterId, receiverId));
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
}