namespace LanguAI.Backend.ViewModels.Friendship;

public class FriendshipRequestViewModel
{
    public int Id { get; set; }

    public int RequesterId { get; set; }

    public string RequesterName { get; set; }

    public DateTime Created { get; set; }
}
