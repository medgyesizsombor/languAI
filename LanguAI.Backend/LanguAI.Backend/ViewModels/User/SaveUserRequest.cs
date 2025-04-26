using LanguAI.Backend.ViewModels.Image;

namespace LanguAI.Backend.ViewModels.User;

public class SaveUserRequest
{
    public int Id { get; set; }

    public string Username { get; set; }

    public DateTime DateOfBirth { get; set; }

    public string Email { get; set; }
}
