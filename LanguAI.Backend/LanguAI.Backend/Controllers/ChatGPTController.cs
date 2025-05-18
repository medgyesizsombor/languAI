using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Exercise;
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
    private readonly ILearningService _learningService;
    private readonly ICardService _cardService;

    private readonly ILogger<ChatGPTController> _logger;

    public ChatGPTController(ILogger<ChatGPTController> logger, IChatGPTService chatGPTService, IAuthenticationService authenticationService, IMessageService messageService, ICardService cardService)
    {
        _logger = logger;
        _chatGPTService = chatGPTService;
        _authenticationService = authenticationService;
        _messageService = messageService;
        _cardService = cardService;
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

    //TODO: REFAKT Exception
    /// <summary>
    /// Send message to ChatGPT
    /// </summary>
    /// <param name="message">Message request</param>
    /// <returns></returns>
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
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return null;
        }
    }

    //TODO: REFAKT Exception
    /// <summary>
    /// Receive message from chatGPT
    /// </summary>
    /// <returns></returns>
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
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return null;
        }
    }

    /// <summary>
    /// Receive exercises from ChatGPT
    /// </summary>
    /// <param name="request">Request for exercises</param>
    /// <returns></returns>
    [HttpGet(Name = "ReceiveExercisesFromChatGPT")]
    public async Task<ActionResult<List<ExerciseViewModel>>> ReceiveExercisesFromChatGPTAsync([FromQuery] ExerciseRequestViewModel request)
    {
        try
        {
            var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
            ArgumentNullException.ThrowIfNull(request);
            ArgumentNullException.ThrowIfNull(currentUserId);

            if (currentUserId != request.UserId) throw new UnauthorizedAccessException();

            var wordsInLearningLanguage = _cardService.GetLanguageWordsAsOneStringByCardListId(request.CardListId);
            var wordsInNativeLanguage = _cardService.GetLanguageWordsAsOneStringByCardListId(request.CardListId, false);

            var exercises = await _chatGPTService.ReceiveExercisesFromChatGPT(request, wordsInLearningLanguage, wordsInNativeLanguage);

            return Ok(exercises);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get correction of the post
    /// </summary>
    /// <param name="text">Text of the post</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostCorrectionFromChatGPT")]
    public async Task<ActionResult<string>> GetPostCorrectionFromChatGPT(string text)
    {
        try
        {
            var response = await _chatGPTService.GetPostCorrectionFromChatGPT(text);

            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Post phrasing about the text from param
    /// </summary>
    /// <param name="about">The text that the post should be based on</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostPhrasing")]
    public async Task<ActionResult<string>> GetPostPhrasing(string about)
    {
        try
        {
            var response = await _chatGPTService.GetPostPhrasing(about);

            return Ok(response);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }
}