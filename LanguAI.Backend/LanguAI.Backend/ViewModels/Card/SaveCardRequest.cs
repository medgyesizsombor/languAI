namespace LanguAI.Backend.ViewModels.Card;

public class SaveCardRequest
{
    public int CardListId { get; set; }

    public List<CardViewModel> Cards { get; set; }
}
