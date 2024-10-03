using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Interaction;

public class SaveInteractionRequestViewModel
{
    public int? Id { get; set; }

    public InteractionEnum InteractionType { get; set; } = InteractionEnum.Like;

    public int UserId { get; set; }

    public int? PostId { get; set; }

    public int? ParentInteractionId { get; set; }

    public string Content { get; set; }

    public bool IsDeleted { get; set; } = false;
}
