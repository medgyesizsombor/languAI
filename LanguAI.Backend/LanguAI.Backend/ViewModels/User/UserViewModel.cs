using LanguAI.Backend.ViewModels.Image;

namespace LanguAI.Backend.ViewModels.User;

public class UserViewModel
{
    public int Id { get; set; }

    public string Username { get; set; }

    public DateTime DateOfBirth { get; set; }

    public string Email { get; set; }

    public bool IsActive { get; set; }

    public int Streak { get; set; }

    public ImageViewModel ProfilePicture { get; set; }
}