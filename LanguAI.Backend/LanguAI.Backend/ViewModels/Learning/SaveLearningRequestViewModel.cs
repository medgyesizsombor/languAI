using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Learning;

public class SaveLearningRequestViewModel
{
    public int? Id { get; set; }

    public LanguageLevelEnum LanguageLevel { get; set; }

    public int UserId { get; set; }

    public int LanguageId { get; set; }

    public bool IsActive { get; set; } = true;
}
