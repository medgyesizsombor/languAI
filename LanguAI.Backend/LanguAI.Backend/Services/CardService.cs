using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.SelectorModel;
using LanguAI.Backend.ViewModels.Topic;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface ICardService
{
    Task<List<CardViewModel>> GenerateWordList(int cardListId, int userId);
    int? SaveCardList(SaveCardListRequest request);
    bool SaveCards(SaveCardRequest request);
    List<CardViewModel> GetCardsOfCardList(int cardListId);
    CardListViewModel GetCardListById(int cardListId);
    List<CardListViewModel> GetCardListsOfCurrentUser(int userId);
    List<CardListViewModel> GetCardListsOfOtherUserByUserId(int currentUserId, int otherUserId);
    bool CopyCardListOfOtherUser(int currentUserId, int cardListId);
    bool ChangeAccessOfCardList(ChangeAccessOfCardListViewModel request);
    string GetLanguageWordsAsOneStringByCardListId(int cardListId, bool learningLanguage = true);
    List<TopicOfCurrentLearningViewModel> GetCardListOfCurrentLearningGroupByTopic(int userId);
    CardViewModel GetCardById(int cardId);
    void DeleteCardById(int cardId);
    List<IntSelectorModel> GetAllTopicsByCurrentLearning(int learningId);
    void SaveCard(CardViewModel card);
    public string GetLanguageWordsAsOneStringByTopicId(int topicId, int userId, bool learningLanguage = true);
}

public class CardService : BaseService, ICardService
{
    private readonly ILearningService _learningService;
    private readonly IChatGPTService _chatGPTService;
    private const int HUNGARIAN_LANGUAGE_ID = 35;

    public CardService(LanguAIDataContext context, IChatGPTService chatGPTService, ILearningService learningService) : base(context)
    {
        _chatGPTService = chatGPTService;
        _learningService = learningService;
    }

    /// <summary>
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="cardListId">Id of the cardlist</param>
    /// <param name="userId">Current user's Id</param>
    /// <returns></returns>
    public async Task<List<CardViewModel>> GenerateWordList(int cardListId, int userId)
    {
        var currentLearning = _learningService.GetCurrentLearningOfUser(userId);

        var cardList = GetCardListById(cardListId);

        List<CardViewModel> result = await _chatGPTService.GenerateWordsForCards
            (currentLearning.NativeLanguageName,
            currentLearning.LearningLanguageName,
            cardList.TopicId,
            cardList.CardViewModelList);

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
        cardList.TopicId = request.TopicId;

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
        var cardList = _context.CardList
            .Include(c => c.Cards)
            .FirstOrDefault(c => c.Id == cardListId);

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
        try
        {
            return _context.CardList
                 .Include(c => c.Cards)
                 .Include(c => c.LearningLanguage)
                 .Include(c => c.NativeLanguage)
                 .Where(c => c.UserId == userId
                        && !c.IsDeleted)
                 .Select(c => ConvertCardListToCardListViewModel(c))
                 .ToList();
        }
        catch (Exception e)
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
        return _context.CardList
            .Include(c => c.Cards)
            .Include(c => c.NativeLanguage)
            .Include(c => c.LearningLanguage)
            .Where(c => c.UserId == otherUserId
                    && !c.IsDeleted
                    && (c.Access == AccessEnum.Public
                        || (c.Access == AccessEnum.Private && currentUserId == otherUserId)
                        || (c.Access == AccessEnum.Protected
                            && (_context.Friendship
                                .Any(f => ((f.RequesterId == currentUserId && f.RecipientId == c.UserId)
                                    || (f.RecipientId == currentUserId && f.RequesterId == c.UserId)) && f.Status == FriendshipStatusEnum.Accepted)))))
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

    /// <summary>
    /// Get language words by id of cardlist
    /// </summary>
    /// <param name="cardListId"></param>
    /// <returns></returns>
    public string GetLanguageWordsAsOneStringByCardListId(int cardListId, bool learningLanguage = true)
    {
        var wordList = _context.Card
            .Where(c => c.CardListId == cardListId)
            .Select(c => learningLanguage == true ? c.WordInLearningLanguage : c.WordInNativeLanguage)
            .ToList();

        return string.Join(", ", wordList);
    }

    /// <summary>
    /// Get language words by id of topic
    /// </summary>
    /// <param name="topicId"></param>
    /// <returns></returns>
    public string GetLanguageWordsAsOneStringByTopicId(int topicId, int userId, bool learningLanguage = true)
    {
        var cardListsByTopic = _context.CardList
            .Include(cl => cl.Cards)
            .Where(cl => cl.TopicId == topicId 
                && cl.UserId == userId
                && !cl.IsDeleted)
            .ToList();

        var wordList = new List<string>();

        foreach (var cardList in cardListsByTopic)
        {
            foreach (var card in cardList.Cards)
            {
                wordList.Add(learningLanguage == true ? card.WordInLearningLanguage : card.WordInNativeLanguage);
            }
        }

        return string.Join(", ", wordList);
    }

    /// <summary>
    /// Get the card lists of current learning
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    public List<TopicOfCurrentLearningViewModel> GetCardListOfCurrentLearningGroupByTopic(int userId)
    {
        var currentLearning = _context.Learning.FirstOrDefault(l => l.IsActive && l.UserId == userId);

        if (currentLearning == null) return null;

        var topicList = _context.Topic
            .Include(t => t.CardLists)
            .Where(t => t.LanguageLevel == currentLearning.LanguageLevel
                && t.CardLists
                    .Any(c => c.UserId == userId
                    && !c.IsDeleted
                    && c.LearningLanguageId == currentLearning.LearningLanguageId))
            .Select(t => new TopicOfCurrentLearningViewModel
            {
                Id = t.Id,
                Name = t.Name,
                NameInHun = t.NameInHun,
                Description = t.Description,
                DescriptionInHun = t.DescriptionInHun,
                CardListNamesAndIds = t.CardLists
                    .Select(c => new IntSelectorModel
                    {
                        Id = c.Id,
                        Name = c.Name
                    })
                    .ToList()
            })
            .ToList();

        return topicList;
    }

    /// <summary>
    /// Get card by Id
    /// </summary>
    /// <param name="cardId">id of the card</param>
    public CardViewModel GetCardById(int cardId)
    {
        var card = _context.Card.FirstOrDefault(c => c.Id == cardId);

        if (card == null) return null;

        return new CardViewModel
        {
            Id = card.Id,
            WordInLearningLanguage = card.WordInLearningLanguage,
            WordInNativeLanguage = card.WordInNativeLanguage
        };
    }

    /// <summary>
    /// Delete card by id
    /// </summary>
    /// <param name="cardId">Id of the card</param>
    public void DeleteCardById(int cardId)
    {
        var card = _context.Card.FirstOrDefault(c => c.Id == cardId);

        if (card == null) throw new ArgumentNullException(nameof(card));

        _context.Remove(card);

        _context.SaveChanges();
    }

    /// <summary>
    /// Get all topics by learning id
    /// </summary>
    /// <param name="learningId">Learning Id</param>
    /// <returns></returns>
    public List<IntSelectorModel> GetAllTopicsByCurrentLearning(int learningId)
    {
        var currentLearning = _context.Learning.FirstOrDefault(l => l.Id == learningId);

        if (currentLearning == null) throw new ArgumentException(nameof(currentLearning));

        var learnings = _context.Topic
            .Where(t => t.LanguageLevel == currentLearning.LanguageLevel)
            .Select(t => new IntSelectorModel
            {
                Id = t.Id,
                Name = currentLearning.NativeLanguageId == HUNGARIAN_LANGUAGE_ID
                    ? t.NameInHun
                    : t.Name
            })
            .ToList();

        return learnings;
    }

    public void SaveCard(CardViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        var card = _context.Card.FirstOrDefault(c => c.Id == request.Id);

        ArgumentNullException.ThrowIfNull(card);

        card.WordInNativeLanguage = request.WordInNativeLanguage;
        card.WordInLearningLanguage = request.WordInLearningLanguage;

        _context.SaveChanges();
    }

    /// <summary>
    /// Convert a list of cards to list of card view models
    /// </summary>
    /// <param name="cardList">List of cards</param>
    private static List<CardViewModel> ConvertCardListToCardViewModelList(List<Card> cardList)
    {
        if (cardList == null) return null;

        List<CardViewModel> cardViewModelList = new List<CardViewModel>() { };

        cardList.ForEach(c => cardViewModelList.Add(new CardViewModel
        {
            WordInNativeLanguage = c.WordInNativeLanguage,
            WordInLearningLanguage = c.WordInLearningLanguage,
            Id = c.Id
        }));

        return cardViewModelList;
    }

    /// <summary>
    /// Convert Card View Model List to Card List
    /// </summary>
    /// <param name="cardListId">Id of cardList</param>
    /// <param name="cardViewModelList">List of Card View Models</param>
    /// <returns></returns>
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
            Access = cardList.Access,
            TopicId = cardList.TopicId
        };
    }
}