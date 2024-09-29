using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Post;

public class SavePostRequest
{
    public int? Id { get; set; }

    public string Content { get; set; }

    public int UserId { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    public AccessEnum Access { get; set; }
}
