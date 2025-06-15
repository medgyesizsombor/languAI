using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.ViewModels.Image;

namespace LanguAI.Backend.ViewModels.Friendship;

public class UserDiscoveryViewModel
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public ImageViewModel ProfilePicture { get; set; }
    public FriendshipStatusEnum? FriendshipStatusEnum { get; set; }
}
