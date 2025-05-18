using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.ViewModels.Card;

namespace LanguAI.Backend.ViewModels.Exercise;

public class ExerciseViewModel
{
    public int ExerciseId { get; set; }

    public string MainSentence { get; set; }

    public ExerciseTypeEnum ExerciseType { get; set; }

    public List<IsCorrectAndTextSentenceViewModel> IsCorrectAndTextSentences { get; set; }

    public bool IsActive { get; set; }

    public List<SentenceAssemblyExerciseWord> SentenceAssemblyExerciseSentence { get; set; }

    public string FirstPartOfTheSentence { get; set; }

    public string LastPartOfTheSentence { get; set; }

    public List<string> Words { get; set; }

    public string CorrectWord { get; set; }
    
    public List<CardViewModel> WordPairingExercise { get; set; }
}
