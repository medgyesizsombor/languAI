using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Message;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class MessageController : ControllerBase
{
    private readonly IMessageService _messageService;
    private readonly IAuthenticationService _authenticationService;

    private readonly ILogger _logger;

    public MessageController(ILogger<MessageController> logger, IMessageService messageService, IAuthenticationService authenticationService)
    {
        _logger = logger;
        _messageService = messageService;
        _authenticationService = authenticationService;
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
            _logger.LogError(e.Message);
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
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_messageService.GetMessageListByUserId((int)currentUserId, friendId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }
}