namespace LanguAI.Backend.ViewModels.Gameplay;

public class SaveGameplayRequestViewModel
{
    public int UserId { get; set; }

    public DateTime Date { get; set; } = DateTime.Now;

    public int Point { get; set; }
}
