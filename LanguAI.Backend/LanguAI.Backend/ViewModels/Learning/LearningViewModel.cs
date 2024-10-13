using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Learning;

public class LearningViewModel
{
    public int Id { get; set; }

    public LanguageLevelEnum LanguageLevel { get; set; }

    public bool IsActive { get; set; }

    public int UserId { get; set; }

    public int LanguageId { get; set; }

    public string LanguageName { get; set; }

    public string LanguageNameInHun { get; set; }

    public string LanguageCode { get; set; }
}
