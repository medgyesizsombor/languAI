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

    public MessageController(IMessageService messageService, IAuthenticationService authenticationService)
    {
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

        return Ok(_messageService.SendMessage(request));
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

        return Ok(_messageService.GetMessageListByUserId((int)currentUserId, friendId));
    }

    /// <summary>
    /// Send message to ChatGPT
    /// </summary>
    /// <param name="message">Message request</param>
    /// <returns></returns>
    [HttpPost(Name = "SendMessageToChatGPT")]
    public async Task<ActionResult<string>> SendMessageToChatGPT(string message)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        
        if (!currentUserId.HasValue) throw new ArgumentNullException(nameof(currentUserId));

        ArgumentNullException.ThrowIfNull(message);

        if (string.IsNullOrEmpty(message))
        {
            throw new ArgumentNullException();
        }

        try
        {
            var response = await _messageService.SendMessageToChatGpt((int)currentUserId, message);

            if (string.IsNullOrEmpty(response)) throw new Exception("Didn't get response from ChatGPT");

            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}