using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Exercise;

public class ExerciseViewModel
{
    public int ExerciseId { get; set; }

    public string MainSentence { get; set; }

    public ExerciseTypeEnum ExerciseType { get; set; }

    public List<IsCorrectAndTextSentenceViewModel> IsCorrectAndTextSentences { get; set; }

    public bool IsActive { get; set; }
}
