using Azure.Core;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Message;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ChatGPTController : ControllerBase
{
    private readonly IChatGPTService _chatGPTService;
    private readonly IAuthenticationService _authenticationService;
    private readonly IMessageService _messageService;

    private readonly ILogger<UserController> _logger;

    public ChatGPTController(ILogger<UserController> logger, IChatGPTService chatGPTService, IAuthenticationService authenticationService, IMessageService messageService)
    {
        _logger = logger;
        _chatGPTService = chatGPTService;
        _authenticationService = authenticationService;
        _messageService = messageService;
    }

    /// <summary>
    /// Get all the post
    /// </summary>
    /// <returns></returns>
    //[HttpPost(Name = "SendRequestToChatGPTAsync")]
    //public async Task<ActionResult<ChatMessage>> SendRequestToChatGPTAsync(string message)
    //{
    //    try
    //    {
    //        return await _chatGPTService.SendRequestToChatGPTAsync(message);
    //    }
    //    catch (Exception)
    //    {
    //        return null;
    //    }
    //}

    /// <summary>
    /// Send message to ChatGPT
    /// </summary>
    /// <param name="message">Message request</param>
    /// <returns></returns>
    /// TODO Kipróbálni
    [HttpPost(Name = "SendMessageToChatGPT")]
    public async Task<ActionResult<MessageViewModel>> SendMessageToChatGPT(MessageViewModel message)
    {
        try
        {
            var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
            ArgumentNullException.ThrowIfNull(currentUserId);

            if (message == null || string.IsNullOrEmpty(message.Text))
            {
                throw new ArgumentNullException();
            }

            if (message.SenderId != currentUserId)
            {
                throw new UnauthorizedAccessException();
            }

            bool successSendingMessageToChatGPT = _messageService.SendMessage(message);

            if (!successSendingMessageToChatGPT) return null;

            var response = await _chatGPTService.GetResponseToConversation(message.SenderId);

            var successReceivingMessageFromChatGPT = _messageService.SendMessage(response);

            if (!successReceivingMessageFromChatGPT) return null;

            return response;
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Receive message from chatGPT
    /// </summary>
    /// <param name="message">Message request</param>
    /// <returns></returns>
    /// TODO Kipróbálni
    [HttpPost(Name = "ReceiveMessageFromChatGPT")]
    public async Task<ActionResult<MessageViewModel>> ReceiveMessageFromChatGPT()
    {
        try
        {
            var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
            ArgumentNullException.ThrowIfNull(currentUserId);

            var response = await _chatGPTService.GetResponseToConversation((int)currentUserId);

            var successReceivingMessageFromChatGPT = _messageService.SendMessage(response);

            if (!successReceivingMessageFromChatGPT) return null;

            return response;
        }
        catch (Exception)
        {
            return null;
        }
    }
}