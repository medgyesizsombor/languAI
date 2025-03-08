using LanguAI.Backend.ViewModels.Learning;

namespace LanguAI.Backend.ViewModels.User;

public class UserDataViewModel
{
    public int Id { get; set; }

    public string Username { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int LanguageId { get; set; }

    public int Streak { get; set; }

    public LearningViewModel CurrentLearning { get; set; }
}
