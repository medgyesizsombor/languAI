using LanguAI.Backend.ViewModels.Image;

namespace LanguAI.Backend.ViewModels.Gameplay;

public class LeaderboardUserViewModel
{
    public int UserId { get; set; }

    public string Username { get; set; }

    public int Points { get; set; }

    public ImageViewModel Image { get; set; }
    public int? ImageId { get; set; }
}
