namespace LanguAI.Backend.ViewModels.Interaction;

public class CommentViewModel
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; }
    public DateTime Created { get; set; }
    public bool Liked { get; set; }
    public int NumberOfLikes { get; set; }
    public string Text { get; set; }
}
