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
    List<CardListViewModel> GetListOfCardList(int userId);
    bool SaveCards(SaveCardRequest request);
    List<CardViewModel> GetCardsOfCardList(int cardListId);
    CardListViewModel GetCardListById(int cardListId);
    List<CardListViewModel> GetCardListsOfOtherUsers(int userId);
    List<CardListViewModel> GetCardListsOfOtherUserByUserId(int userId, int otherUserId);
    bool CopyCardListOfOtherUser(int cardListId);
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
        cardList.LearningLanguage = request.LearningLanguage;
        cardList.NativeLanguage = request.NativeLanguage;
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

    public List<CardListViewModel> GetListOfCardList(int userId)
    {
        if (userId == 0) throw new ArgumentNullException("userId");

        var asd = _context.CardList
            .Include(c => c.Cards)
            .Where(c => c.UserId == userId)
            .Select(c => new CardListViewModel
            {
                UserId = c.UserId,
                Id = c.Id,
                LearningLanguage = c.LearningLanguage,
                NativeLanguage = c.NativeLanguage,
                Name = c.Name,
                CardViewModelList = ConvertCardListToCardViewModelList(c.Cards.ToList()),
                Created = c.Created,
                Modified = c.Modified
            }).ToList();

        return asd;
    }

    public bool SaveCards(SaveCardRequest request)
    {
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

    public CardListViewModel GetCardListById(int cardListId)
    {
        ArgumentNullException.ThrowIfNull(cardListId);

        var cardList = _context.CardList.Include(c => c.Cards).Where(c => c.Id == cardListId).FirstOrDefault();

        return ConvertCardListToCardListViewModel(cardList);
    }

    /// <summary>
    /// Get other users' card lists.
    /// All the public and the friends' protected cardlists.
    /// </summary>
    /// <param name="userId">Current User's Id</param>
    /// <returns></returns>
    public List<CardListViewModel> GetCardListsOfOtherUsers(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        try
        {
            return _context.CardList
                 .Include(c => c.Cards)
                 .Where(c => c.UserId != userId
                     && ((c.Access == (int)CardListAccessEnum.Public)
                         || c.Access == (int)CardListAccessEnum.Protected
                             && (_context.Friendship
                                 .Any(f => ((f.RequesterId == userId && f.RecipientId == c.UserId)
                                     || (f.RecipientId == userId && f.RequesterId == c.UserId)) && f.Status == (int)FriendshipStatusEnum.Accepted))))
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
    /// <param name="userId">Current user's Id</param>
    /// <param name="otherUserId">Other user's Id</param>
    /// <returns></returns>
    public List<CardListViewModel> GetCardListsOfOtherUserByUserId(int userId, int otherUserId)
    {
        ArgumentNullException.ThrowIfNull(userId);
        ArgumentNullException.ThrowIfNull(otherUserId);

        return _context.CardList.Include(c => c.Cards).Where(c => c.UserId == otherUserId && ((c.Access == (int)CardListAccessEnum.Public)
                         || c.Access == (int)CardListAccessEnum.Protected
                             && (_context.Friendship
                                 .Any(f => ((f.RequesterId == userId && f.RecipientId == c.UserId)
                                     || (f.RecipientId == userId && f.RequesterId == c.UserId)) && f.Status == (int)FriendshipStatusEnum.Accepted))))
            .Select(c => ConvertCardListToCardListViewModel(c))
            .ToList();
    }

    /// <summary>
    /// Copy other user's cardlist
    /// </summary>
    /// <param name="cardListId">If of Card list to copy</param>
    /// <returns></returns>
    public bool CopyCardListOfOtherUser(int cardListId)
    {
        ArgumentNullException.ThrowIfNull(cardListId);

        CardList originalCardList = _context.CardList.Include(c => c.Cards).FirstOrDefault(c => c.Id == cardListId && c.Cards.Count != 0);

        if (originalCardList == null) return false;

        try
        {
            CardList cardList = new CardList
            {
                Access = (int)CardListAccessEnum.Public,
                LearningLanguage = originalCardList.LearningLanguage,
                Name = originalCardList.Name,
                NativeLanguage = originalCardList.NativeLanguage,
                UserId = 7
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
            UserId = cardList.UserId
        };
    }
}