using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Post;

public class PostViewModel
{
    public int? Id { get; set; }

    public string Content { get; set; }

    public string Username { get; set; }

    public DateTime Created { get; set; }

    public AccessEnum Access { get; set; }
}
