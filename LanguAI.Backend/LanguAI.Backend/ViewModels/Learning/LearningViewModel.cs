using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Learning;

public class LearningViewModel
{
    public int Id { get; set; }

    public LanguageLevelEnum LanguageLevel { get; set; }

    public bool IsActive { get; set; }

    public int UserId { get; set; }

    public int LearningLanguageId { get; set; }

    public string LearningLanguageName { get; set; }

    public string LearningLanguageNameInHun { get; set; }

    public string LearningLanguageCode { get; set; }

    public int NativeLanguageId { get; set; }

    public string NativeLanguageName { get; set; }

    public string NativeLanguageNameInHun { get; set; }

    public string NativeLanguageCode { get; set; }
}
