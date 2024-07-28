using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;

namespace LanguAI.Backend.Services;

public interface ICardService
{
    Task<List<CardViewModel>> GetWordListAsync(string systemLanguage, string learningLanguage, string level);
    bool SaveCardList(SaveCardListRequest request);
    List<CardListViewModel> GetListOfCardList(int userId);
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
    public async Task<List<CardViewModel>> GetWordListAsync(string systemLanguage, string learningLanguage, string level)
    {
        List<CardViewModel> result = await _chatGPTService.GetWordsForCardsAsync(systemLanguage, learningLanguage, level);

        return result;
    }

    /// <summary>
    /// Save post
    /// </summary>
    /// <param name="request">The request</param>
    /// <returns></returns>
    public bool SaveCardList(SaveCardListRequest request)
    {
        bool isEdit = false;

        CardList cardList;

        if (request.Id != null)
        {
            isEdit = true;
            cardList = _context.CardList.FirstOrDefault(p => p.Id == request.Id);

            if (cardList == null)
            {
                return false;
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

        return true;
    }

    public List<CardListViewModel> GetListOfCardList(int userId)
    {
        if (userId == 0) throw new ArgumentNullException("userId");

        return _context.CardList
            .Where(c => c.UserId == userId)
            .Select(c => new CardListViewModel
            {
                UserId = c.UserId,
                Id = c.Id,
                LearningLanguage = c.LearningLanguage,
                NativeLanguage = c.NativeLanguage,
                Name = c.Name,
                CardViewModelList = ConvertCardToCardViewModel(c.Cards.ToList())
            }).ToList();
    }

    private List<CardViewModel> ConvertCardToCardViewModel(List<Card> cardList)
    {
        List<CardViewModel> cardViewModelList = new List<CardViewModel>() { };

        cardList.ForEach(c => cardViewModelList.Add(new CardViewModel
        {
            WordInNativeLanguage = c.WordInNativeLanguage,
            WordInLearningLanguage = c.WordInLearningLanguage
        }));

        return cardViewModelList;
    }
}