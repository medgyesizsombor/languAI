namespace LanguAI.Backend.ViewModels.Card;

public class CardListViewModel
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string LearningLanguage { get; set; }

    public string NativeLanguage { get; set; }

    public string Name { get; set; }

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public List<CardViewModel> CardViewModelList { get; set; } = new List<CardViewModel>();
}
