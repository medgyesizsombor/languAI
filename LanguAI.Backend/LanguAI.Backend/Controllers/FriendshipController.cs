using LanguAI.Backend.Services;
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
        try
        {
            return _friendshipService.RequestFriendship(requesterId, receiverId);
        }
        catch (Exception)
        {
            return false;
        }
    }
}