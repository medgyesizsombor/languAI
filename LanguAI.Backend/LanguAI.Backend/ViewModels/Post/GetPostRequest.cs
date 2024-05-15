namespace LanguAI.Backend.ViewModels.Post;

public class GetPostRequest
{
    public string Username { get; set; }

    public DateTime Created { get; set; }

    public string Language { get; set; }
}
