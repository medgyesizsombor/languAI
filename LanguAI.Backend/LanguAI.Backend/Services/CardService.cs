using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface ICardService
{
    Task<List<CardViewModel>> GetWordList(string systemLanguage, string learningLanguage, string level, string topic);
    int? SaveCardList(SaveCardListRequest request);
    bool SaveCards(SaveCardRequest request);
    List<CardViewModel> GetCardsOfCardList(int cardListId);
    CardListViewModel GetCardListById(int cardListId);
    List<CardListViewModel> GetCardListsOfCurrentUser(int userId);
    List<CardListViewModel> GetCardListsOfOtherUserByUserId(int currentUserId, int otherUserId);
    bool CopyCardListOfOtherUser(int currentUserId, int cardListId);
    bool ChangeAccessOfCardList(ChangeAccessOfCardListViewModel request);
}

public class CardService : BaseService, ICardService
{
    IChatGPTService _chatGPTService;

    public CardService(LanguAIDataContext context, IChatGPTService chatGPTService) : base(context)
    {
        _chatGPTService = chatGPTService;
    }

    /// <summary>
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="systemLanguage"></param>
    /// <param name="learningLanguage"></param>
    /// <param name="level"></param>
    /// <returns></returns>
    public async Task<List<CardViewModel>> GetWordList(string systemLanguage, string learningLanguage, string level, string topic)
    {
        List<CardViewModel> result = await _chatGPTService.GetWordsForCards(systemLanguage, learningLanguage, level, topic);

        return result;
    }

    /// <summary>
    /// Save card list
    /// </summary>
    /// <param name="request">The request</param>
    /// <returns></returns>
    public int? SaveCardList(SaveCardListRequest request)
    {
        bool isEdit = false;

        CardList cardList;

        if (request.Id != null)
        {
            isEdit = true;
            cardList = _context.CardList.FirstOrDefault(p => p.Id == request.Id);

            if (cardList == null)
            {
                return null;
            }
        }
        else
        {
            cardList = new CardList();
        }

        cardList.UserId = request.UserId;
        cardList.LearningLanguageId = request.LearningLanguageId;
        cardList.NativeLanguageId = request.NativeLanguageId;
        cardList.Name = request.Name;

        if (isEdit)
        {
            cardList.Modified = DateTime.Now;
        }
        else
        {
            _context.CardList.Add(cardList);
        }

        _context.SaveChanges();

        return cardList.Id;
    }

    /// <summary>
    /// Save cards to card list
    /// </summary>
    /// <param name="request">SaveCardRequest</param>
    /// <returns></returns>
    public bool SaveCards(SaveCardRequest request)
    {
        //TODO: Only the owner can save
        ArgumentNullException.ThrowIfNull(request);

        List<Card> oldCards = _context.Card.Where(c => c.CardListId == request.CardListId).ToList();

        if (request.Cards.Count == 0)
        {
            _context.RemoveRange(oldCards);
            _context.SaveChanges();
            return true;
        }

        List<Card> newCards = ConvertCardViewModelListToCardList(request.CardListId, request.Cards);

        if (oldCards.Count == 0)
        {
            _context.Card.AddRange(newCards);
            _context.SaveChanges();
            return true;
        }

        List<Card> cardsToBeRemoved = new List<Card>();
        List<Card> cardsToBeAdded = new List<Card>();

        //Using hashset to determine which card should it remove or add to the cards
        var oldCardSet = new HashSet<Card>(oldCards);
        var newCardSet = new HashSet<Card>(newCards);

        cardsToBeAdded.AddRange(newCardSet.Except(oldCardSet));
        cardsToBeRemoved.AddRange(oldCardSet.Except(newCardSet));

        _context.Card.RemoveRange(cardsToBeRemoved);
        _context.Card.AddRange(cardsToBeAdded);
        _context.SaveChanges();

        return true;
    }

    /// <summary>
    /// Get all the cards by the cardListId
    /// </summary>
    /// <param name="cardListId">cardList Id</param>
    public List<CardViewModel> GetCardsOfCardList(int cardListId)
    {
        ArgumentNullException.ThrowIfNull(cardListId);

        return ConvertCardListToCardViewModelList(_context.Card
            .Where(c => c.CardListId == cardListId)
            .ToList());
    }

    /// <summary>
    /// Get cardlist by cardlistId
    /// </summary>
    /// <param name="cardListId">Id of Cardlist</param>
    /// <returns></returns>
    public CardListViewModel GetCardListById(int cardListId)
    {
        ArgumentNullException.ThrowIfNull(cardListId);

        var cardList = _context.CardList.Include(c => c.Cards).FirstOrDefault(c => c.Id == cardListId);

        return ConvertCardListToCardListViewModel(cardList);
    }

    /// <summary>
    /// Get other users' card lists.
    /// All the public and the friends' protected cardlists.
    /// </summary>
    /// <param name="userId">Current User's Id</param>
    /// <returns></returns>
    public List<CardListViewModel> GetCardListsOfCurrentUser(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        try
        {
            return _context.CardList
                 .Include(c => c.Cards)
                 .Where(c => c.UserId == userId
                        && !c.IsDeleted)
                 .Select(c => ConvertCardListToCardListViewModel(c))
                 .ToList();
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    /// <summary>
    /// Get other user's accessible card lists
    /// </summary>
    /// <param name="currentUserId">Current user's Id</param>
    /// <param name="otherUserId">Other user's Id</param>
    /// <returns></returns>
    public List<CardListViewModel> GetCardListsOfOtherUserByUserId(int currentUserId, int otherUserId)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(otherUserId);

        return _context.CardList.Include(c => c.Cards)
            .Where(c => c.UserId == otherUserId
                    && !c.IsDeleted
                    && (c.Access == AccessEnum.Public
                         || (c.Access == AccessEnum.Protected
                             && (_context.Friendship
                                 .Any(f => ((f.RequesterId == currentUserId && f.RecipientId == c.UserId)
                                     || (f.RecipientId == currentUserId && f.RequesterId == c.UserId)) && f.Status == (int)FriendshipStatusEnum.Accepted)))))
            .Select(c => ConvertCardListToCardListViewModel(c))
            .ToList();
    }

    /// <summary>
    /// Copy other user's cardlist
    /// </summary>
    /// <param name="currentUserId">Current user's Id</param>
    /// <param name="cardListId">Id of Card list to copy</param>
    /// <returns></returns>
    public bool CopyCardListOfOtherUser(int currentUserId, int cardListId)
    {
        ArgumentNullException.ThrowIfNull(cardListId);
        ArgumentNullException.ThrowIfNull(currentUserId);

        CardList originalCardList = _context.CardList
            .Include(c => c.Cards)
            .Where(c => c.Id == cardListId && c.Cards.Count != 0 && !c.IsDeleted)
            .FirstOrDefault();

        if (originalCardList == null) return false;

        try
        {
            CardList cardList = new CardList
            {
                Access = AccessEnum.Public,
                LearningLanguage = originalCardList.LearningLanguage,
                Name = originalCardList.Name,
                NativeLanguage = originalCardList.NativeLanguage,
                UserId = currentUserId
            };

            _context.CardList.Add(cardList);
            _context.SaveChanges();

            List<Card> cards = new List<Card>();

            foreach (var card in originalCardList.Cards)
            {
                cards.Add(new Card
                {
                    CardListId = cardList.Id,
                    WordInLearningLanguage = card.WordInLearningLanguage,
                    WordInNativeLanguage = card.WordInNativeLanguage
                });
            }

            _context.Card.AddRange(cards);

            _context.SaveChanges();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>
    /// Change access of card list
    /// </summary>
    /// <param name="request">ChangeAccessOfCardListViewModel</param>
    /// <returns></returns>
    public bool ChangeAccessOfCardList(ChangeAccessOfCardListViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            CardList cardList = _context.CardList
                .FirstOrDefault(c => c.UserId == request.UserId
                    && !c.IsDeleted
                    && c.Id == request.CardListId);

            if (cardList == null)
            {
                return false;
            }

            cardList.Access = request.Access;

            _context.SaveChanges();

            return true;
        }
        catch
        {
            return false;
        }
    }

    private static List<CardViewModel> ConvertCardListToCardViewModelList(List<Card> cardList)
    {
        if (cardList == null) { return null; }

        List<CardViewModel> cardViewModelList = new List<CardViewModel>() { };

        cardList.ForEach(c => cardViewModelList.Add(new CardViewModel
        {
            WordInNativeLanguage = c.WordInNativeLanguage,
            WordInLearningLanguage = c.WordInLearningLanguage
        }));

        return cardViewModelList;
    }

    private List<Card> ConvertCardViewModelListToCardList(int cardListId, List<CardViewModel> cardViewModelList)
    {
        List<Card> cards = new List<Card>();

        cardViewModelList.ForEach(c =>
        {
            if (c.Id != null)
            {
                cards.Add(_context.Card.FirstOrDefault(card => card.Id == c.Id));
            }
            else
            {
                cards.Add(new Card()
                {
                    CardListId = cardListId,
                    WordInLearningLanguage = c.WordInLearningLanguage,
                    WordInNativeLanguage = c.WordInNativeLanguage
                });
            }
        });

        return cards;
    }

    /// <summary>
    /// Convert a CardList to CardListViewModel
    /// </summary>
    private static CardListViewModel ConvertCardListToCardListViewModel(CardList cardList)
    {
        ArgumentNullException.ThrowIfNull(cardList);

        return new CardListViewModel()
        {
            CardViewModelList = ConvertCardListToCardViewModelList(cardList.Cards.ToList()),
            Created = cardList.Created,
            Id = cardList.Id,
            LearningLanguage = cardList.LearningLanguage,
            Modified = cardList.Modified,
            Name = cardList.Name,
            NativeLanguage = cardList.NativeLanguage,
            UserId = cardList.UserId,
            Access = cardList.Access
        };
    }
}