﻿using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Card;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class CardController : ControllerBase
{
    private readonly ICardService _cardService;
    private readonly ILogger<UserController> _logger;
    private readonly IAuthenticationService _authenticationService;

    public CardController(ILogger<UserController> logger, ICardService cardService, IAuthenticationService authenticationService)
    {
        _logger = logger;
        _cardService = cardService;
        _authenticationService = authenticationService;
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
        ArgumentNullException.ThrowIfNullOrWhiteSpace(nativeLanguage);
        ArgumentNullException.ThrowIfNullOrWhiteSpace(learningLanguage);
        ArgumentNullException.ThrowIfNullOrWhiteSpace(level);
        ArgumentNullException.ThrowIfNullOrWhiteSpace(topic);

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
        ArgumentNullException.ThrowIfNull(request);

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
    /// Get all the cards by the cardListId
    /// </summary>
    /// <param name="cardListId">cardList Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetCardsOfCardList")]
    public ActionResult<List<CardViewModel>> GetCardsOfCardList(int cardListId)
    {
        ArgumentNullException.ThrowIfNull(cardListId);

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
        ArgumentNullException.ThrowIfNull(cardListId);

        try
        {
            return Ok(_cardService.GetCardListById(cardListId));
        }
        catch (Exception)
        {
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
        ArgumentNullException.ThrowIfNull(userId);

        try
        {
            var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
            ArgumentNullException.ThrowIfNull(currentUserId);

            if (userId != currentUserId) throw new UnauthorizedAccessException();

            return Ok(_cardService.GetCardListsOfCurrentUser(userId));
        }
        catch (Exception)
        {
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
        ArgumentNullException.ThrowIfNull(otherUserId);

        try
        {
            return Ok(_cardService.GetCardListsOfOtherUserByUserId((int)currentUserId, otherUserId));
        }
        catch (Exception)
        {
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
        ArgumentNullException.ThrowIfNull(cardListId);

        try
        {
            return Ok(_cardService.CopyCardListOfOtherUser((int)currentUserId, cardListId));
        }
        catch (Exception)
        {
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
        catch (Exception)
        {
            return BadRequest(false);
        }
    }
}