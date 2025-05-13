using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Friendship;

public class UserDiscoveryViewModel
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public FriendshipStatusEnum? FriendshipStatusEnum { get; set; }
}
