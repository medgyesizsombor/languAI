using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.ViewModels.User;

public class User
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    [Required]
    public int Country { get; set; }
}
