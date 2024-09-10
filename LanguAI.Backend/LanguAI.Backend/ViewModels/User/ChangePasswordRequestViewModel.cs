namespace LanguAI.Backend.ViewModels.User;

public class ChangePasswordRequestViewModel
{
    public string NewPassword { get; set; }
    public string OldPassword { get; set; }
    public int UserId { get; set; }
}
