namespace LanguAI.Backend.ViewModels.Card;

public class SaveCardListRequest
{
    public int? Id { get; set; }

    public int UserId { get; set; }

    public string LearningLanguage { get; set; }

    public string NativeLanguage { get; set; }
}
