namespace LanguAI.Backend.ViewModels.Friendship;

public class FriendshipViewModel
{
    public int Id { get; set; }

    public int RequesterId { get; set; }

    public int RecipientId { get; set; }

    public int Status { get; set; }

    public bool IsCloseFriendship { get; set; }
}
