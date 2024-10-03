using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.ViewModels.Interaction;

namespace LanguAI.Backend.ViewModels.Post;

public class PostViewModel
{
    public int? Id { get; set; }

    public string Content { get; set; }

    public string Username { get; set; }

    public DateTime Created { get; set; }

    public AccessEnum Access { get; set; }

    public bool Liked { get; set; } = false;

    public int NumberOfLikes { get; set; }

    public int NumberOfComments { get; set; }

    public List<CommentViewModel> Comments { get; set; }
}
