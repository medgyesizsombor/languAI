using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Card;

public class ChangeAccessOfCardListViewModel
{
    public int UserId { get; set; }

    public CardListAccessEnum Access { get; set; }

    public int CardListId { get; set; }
}
