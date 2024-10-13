using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;

namespace LanguAI.Backend.ViewModels.Card;

public class CardListViewModel
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public Language LearningLanguage { get; set; }

    public Language NativeLanguage { get; set; }

    public string Name { get; set; }

    public DateTime Created { get; set; }

    public DateTime Modified { get; set; }

    public AccessEnum Access { get; set; }

    public List<CardViewModel> CardViewModelList { get; set; } = new List<CardViewModel>();
}
