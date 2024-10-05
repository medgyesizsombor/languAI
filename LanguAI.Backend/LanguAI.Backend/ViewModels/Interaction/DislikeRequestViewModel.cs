namespace LanguAI.Backend.ViewModels.Interaction;

public class DislikeRequestViewModel
{
    public int? PostId { get; set; }

    public int? ParentInteractionId { get; set; }

    public int UserId { get; set; }
}
