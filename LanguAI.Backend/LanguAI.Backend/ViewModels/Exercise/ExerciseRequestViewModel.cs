using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Exercise;

public class ExerciseRequestViewModel
{
    public int UserId { get; set; }

    public string LanguageLevel { get; set; }

    public string TopicDescription { get; set; }

    public ExerciseTypeEnum? ExerciseType { get; set; }

    public int CardListId { get; set; }
}
