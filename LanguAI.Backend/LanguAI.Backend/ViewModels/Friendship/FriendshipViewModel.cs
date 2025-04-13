using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Friendship;

public class FriendshipViewModel
{
    public int Id { get; set; }

    public int RequesterId { get; set; }

    public int RecipientId { get; set; }

    public FriendshipStatusEnum Status { get; set; }

    public bool IsCloseFriendship { get; set; }

    public DateTime Created { get; set; }
}
