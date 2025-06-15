using LanguAI.Backend.ViewModels.Image;
using LanguAI.Backend.ViewModels.Message;

namespace LanguAI.Backend.ViewModels.User;

public class OtherUserViewModel
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public ImageViewModel ProfilePicture { get; set; }
    public LastMessageViewModel LastMessage { get; set; }
}
