using LanguAI.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API.Chat;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ChatGPTController : ControllerBase
{
    private readonly IChatGPTService _chatGPTService;

    private readonly ILogger<UserController> _logger;

    public ChatGPTController(ILogger<UserController> logger, IChatGPTService chatGPTService)
    {
        _logger = logger;
        _chatGPTService = chatGPTService;
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
}