namespace LanguAI.Backend.ViewModels.Registration;

public class RegisterRequestViewModel
{
    public string Username { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public DateTime DateOfBirth { get; set; }

    public int Country { get; set; }
}