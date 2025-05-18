using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.SelectorModel;
using LanguAI.Backend.ViewModels.Topic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class CardController : ControllerBase
{
    private readonly ICardService _cardService;
    private readonly ILogger<CardController> _logger;
    private readonly IAuthenticationService _authenticationService;

    public CardController(ILogger<CardController> logger, ICardService cardService, IAuthenticationService authenticationService)
    {
        _logger = logger;
        _cardService = cardService;
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Get 50 words for the cards
    /// </summary>
    /// <param name="cardListId">Id of the cardlist</param>
    /// <returns></returns>
    [HttpPost(Name = "GenerateWordList")]
    public async Task<ActionResult<List<CardViewModel>>> GenerateWordList(int cardListId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);

        if (currentUserId == null) return Unauthorized();

        try
        {
            return Ok(await _cardService.GenerateWordList(cardListId, (int)currentUserId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Save cards to card list
    /// </summary>
    /// <param name="request">SaveCardRequest</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveCards")]
    public ActionResult<bool> SaveCards(SaveCardRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);
        if (request.CardListId == 0) throw new ArgumentNullException();

        try
        {
            return Ok(_cardService.SaveCards(request));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(false);
        }
    }

    /// <summary>
    /// Save a list of cards
    /// </summary>
    /// <param name="request">Request of saving list of cards</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveCardList")]
    public ActionResult<int?> SaveCardList(SaveCardListRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_cardService.SaveCardList(request));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Get all the cards by the cardListId
    /// </summary>
    /// <param name="cardListId">cardList Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetCardsOfCardList")]
    public ActionResult<List<CardViewModel>> GetCardsOfCardList(int cardListId)
    {
        try
        {
            return Ok(_cardService.GetCardsOfCardList(cardListId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Get cardList by Id
    /// </summary>
    /// <param name="cardListId">Id of the cardList</param>
    /// <returns></returns>
    [HttpGet(Name = "GetCardListById")]
    public ActionResult<CardListViewModel> GetCardListById(int cardListId)
    {
        try
        {
            return Ok(_cardService.GetCardListById(cardListId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Get all the CardList that the user has and is not deleted
    /// </summary>
    /// <param name="userId">Current User's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetCardListsOfCurrentUser")]
    public ActionResult<List<CardListViewModel>> GetCardListsOfCurrentUser(int userId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);

        if (!currentUserId.HasValue)
        {
            throw new ArgumentNullException(nameof(currentUserId));
        };

        if (userId != currentUserId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_cardService.GetCardListsOfCurrentUser(userId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Get other users' card lists.
    /// All the public and the friends' protected cardlists.
    /// </summary>
    /// <param name="otherUserId">Other user's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetCardListsOfOtherUserByUserId")]
    public ActionResult<List<CardListViewModel>> GetCardListsOfOtherUserByUserId(int otherUserId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_cardService.GetCardListsOfOtherUserByUserId((int)currentUserId, otherUserId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Copy other user's cardlist
    /// </summary>
    /// <param name="cardListId">If of Card list to copy</param>
    /// <returns></returns>
    [HttpPost(Name = "CopyCardListOfOtherUser")]
    public ActionResult<bool> CopyCardListOfOtherUser(int cardListId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_cardService.CopyCardListOfOtherUser((int)currentUserId, cardListId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Change access of card list
    /// </summary>
    /// <param name="request">ChangeAccessOfCardListViewModel</param>
    /// <returns></returns>
    [HttpPost(Name = "ChangeAccessOfCardList")]
    public ActionResult<bool> ChangeAccessOfCardList(ChangeAccessOfCardListViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            if (request.UserId != currentUserId)
            {
                throw new UnauthorizedAccessException();
            }

            return Ok(_cardService.ChangeAccessOfCardList(request));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(false);
        }
    }

    /// <summary>
    /// Get the card lists of current learning
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetCardListOfCurrentLearningGroupByTopic")]
    public ActionResult<List<TopicOfCurrentLearningViewModel>> GetCardListOfCurrentLearningGroupByTopic(int userId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        if (currentUserId != userId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_cardService.GetCardListOfCurrentLearningGroupByTopic(userId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get card by id
    /// </summary>
    /// <param name="cardId">Id of the card</param>
    [HttpGet(Name = "GetCardById")]
    public ActionResult<CardViewModel> GetCardById(int cardId)
    {
        try
        {
            return Ok(_cardService.GetCardById(cardId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Delete card by id
    /// </summary>
    /// <param name="cardId">Id of the card</param>
    [HttpDelete(Name = "DeleteCardById")]
    public ActionResult DeleteCardById(int cardId)
    {
        try
        {
            _cardService.DeleteCardById(cardId);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get all topics by learning id
    /// </summary>
    /// <param name="learningId">Learning Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetAllTopicsByCurrentLearning")]
    public ActionResult<List<IntSelectorModel>> GetAllTopicsByCurrentLearning(int learningId)
    {
        try
        {
            return Ok(_cardService.GetAllTopicsByCurrentLearning(learningId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

    [HttpPost(Name = "SaveCard")]
    public ActionResult SaveCard(CardViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);
        ArgumentNullException.ThrowIfNull(request.Id);
        if (string.IsNullOrEmpty(request.WordInLearningLanguage) || string.IsNullOrEmpty(request.WordInNativeLanguage))
        {
            throw new ArgumentNullException("One of the word is missing");
        }

        try
        {
            _cardService.SaveCard(request);

            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }
}