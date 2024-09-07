using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Message;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;

    private readonly ILogger<UserController> _logger;

    public MessageController(ILogger<UserController> logger, IMessageService messageService)
    {
        _logger = logger;
        _messageService = messageService;
    }

    /// <summary>
    /// Send message
    /// </summary>
    /// <param name="request">MessageViewModel sending request</param>
    /// <returns></returns>
    [HttpPost(Name = "SendMessage")]
    public ActionResult<bool> SendMessage(MessageViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_messageService.SendMessage(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get the messages by the Friend Id
    /// </summary>
    /// <param name="friendId">Friend's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetMessageListByUserId")]
    public ActionResult<List<MessageViewModel>> GetMessageListByUserId(int friendId)
    {
        ArgumentNullException.ThrowIfNull(friendId);

        var userId = 7;

        try
        {
            return Ok(_messageService.GetMessageListByUserId(userId, friendId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}