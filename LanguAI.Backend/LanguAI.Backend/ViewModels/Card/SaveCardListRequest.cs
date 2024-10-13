namespace LanguAI.Backend.ViewModels.Card;

public class SaveCardListRequest
{
    public int? Id { get; set; }

    public int UserId { get; set; }

    public int LearningLanguageId { get; set; }

    public int NativeLanguageId { get; set; }

    public string Name { get; set; }
}
