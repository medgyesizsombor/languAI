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
    public async Task<List<CardViewModel>> GetWordListAsync(string nativeLanguage, string learningLanguage, string level)
    {
        try
        {
            return await _cardService.GetWordListAsync(nativeLanguage, learningLanguage, level);
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Save a list of cards
    /// </summary>
    /// <param name="request">Request of saving list of cards</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveCardList")]
    public bool SaveCardList(SaveCardListRequest request)
    {
        try
        {
            return _cardService.SaveCardList(request);
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>
    /// Get all the CardList that the user has
    /// </summary>
    /// <param name="userId">User Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetListOfCardList")]
    public List<CardListViewModel> GetListOfCardList(int userId)
    {
        try
        {
            return _cardService.GetListOfCardList(userId);
        }
        catch (Exception)
        {
            return null;
        }
    }
}