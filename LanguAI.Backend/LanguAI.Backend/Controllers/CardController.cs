using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Card;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class CardController : ControllerBase
{
    private readonly ICardService _cardService;

    private readonly ILogger<UserController> _logger;

    public CardController(ILogger<UserController> logger, ICardService cardService)
    {
        _logger = logger;
        _cardService = cardService;
    }

    /// <summary>
    /// Get 50 words for the cards
    /// </summary>
    /// <param name="nativeLanguage">In which language the words are needed</param>
    /// <param name="learningLanguage">In which language the words are needed</param>
    /// <param name="level">In which language the words are needed</param>
    /// <returns></returns>
    [HttpPost(Name = "GetWordList")]
    public async Task<ActionResult<List<CardViewModel>>> GetWordList(string nativeLanguage, string learningLanguage, string level, string topic)
    {
        try
        {
            return Ok(await _cardService.GetWordList(nativeLanguage, learningLanguage, level, topic));
        }
        catch (Exception)
        {
            return BadRequest(null);
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost(Name = "SaveCards")]
    public ActionResult<bool> SaveCards(SaveCardRequest request)
    {
        try
        {
            if (request.CardListId == 0) throw new ArgumentNullException();
            
            return Ok(_cardService.SaveCards(request));
        }
        catch (Exception)
        {
            //TODO: logolás
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
        try
        {
            return Ok(_cardService.SaveCardList(request));
        }
        catch (Exception)
        {
            return BadRequest(null);
        }
    }

    /// <summary>
    /// Get all the CardList that the user has
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetListOfCardList")]
    public ActionResult<List<CardListViewModel>> GetListOfCardList(int userId)
    {
        try
        {
            return Ok(_cardService.GetListOfCardList(userId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
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
        catch (Exception)
        {
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
        catch (Exception)
        {
            return BadRequest(null);
        }
    }
}