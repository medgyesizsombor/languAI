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
    private readonly ICardService _cardService;
    private readonly ITopicService _topicService;

    private readonly ILogger<ChatGPTController> _logger;

    public ChatGPTController(ILogger<ChatGPTController> logger, IChatGPTService chatGPTService, IAuthenticationService authenticationService, IMessageService messageService, ICardService cardService, ITopicService topicService)
    {
        _logger = logger;
        _chatGPTService = chatGPTService;
        _authenticationService = authenticationService;
        _messageService = messageService;
        _cardService = cardService;
        _topicService = topicService;
    }

    //TODO: REFAKT Exception
    /// <summary>
    /// Receive message from chatGPT
    /// </summary>
    /// <returns></returns>
    [HttpPost(Name = "ReceiveMessageFromChatGPT")]
    public async Task<ActionResult<MessageViewModel>> ReceiveMessageFromChatGPT()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        var response = await _chatGPTService.GetResponseToConversation((int)currentUserId);

        var successReceivingMessageFromChatGPT = _messageService.SendMessage(response);

        if (!successReceivingMessageFromChatGPT) return null; //TODO Error

        return response;
    }

    /// <summary>
    /// Receive exercises from ChatGPT
    /// </summary>
    /// <param name="request">Request for exercises</param>
    /// <returns></returns>
    [HttpGet(Name = "ReceiveExercisesFromChatGPT")]
    public async Task<ActionResult<List<ExerciseViewModel>>> ReceiveExercisesFromChatGPTAsync(int topicId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        var topic = _topicService.GetTopicById(topicId);
        var wordsInLearningLanguage = _cardService.GetLanguageWordsAsOneStringByTopicId(topicId, (int)currentUserId);
        var wordsInNativeLanguage = _cardService.GetLanguageWordsAsOneStringByTopicId(topicId, (int)currentUserId, false);

        var request = new ExerciseRequestViewModel
        {
            TopicDescription = topic.Description,
            UserId = (int)currentUserId,
            LanguageLevel = topic.LanguageLevel
        };

        var exercises = await _chatGPTService.ReceiveExercisesFromChatGPT(request, wordsInLearningLanguage, wordsInNativeLanguage);

        return Ok(exercises);
    }

    /// <summary>
    /// Get correction of the post
    /// </summary>
    /// <param name="text">Text of the post</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostCorrectionFromChatGPT")]
    public async Task<ActionResult<string>> GetPostCorrectionFromChatGPT(string text)
    {
        var response = await _chatGPTService.GetPostCorrectionFromChatGPT(text);

        return Ok(response);
    }

    /// <summary>
    /// Post phrasing about the text from param
    /// </summary>
    /// <param name="about">The text that the post should be based on</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostPhrasing")]
    public async Task<ActionResult<string>> GetPostPhrasing(string about)
    {
        var response = await _chatGPTService.GetPostPhrasing(about);

        return Ok(response);
    }

    /// <summary>
    /// Create thread id for user
    /// </summary>
    [HttpGet(Name = "CreateThreadId")]
    public void CreateThreadId()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);

        _chatGPTService.CreateThreadId((int)currentUserId);
    }
}