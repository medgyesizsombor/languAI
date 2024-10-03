using LanguAI.Backend.Core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class Interaction
{
    [Required]
    public int Id { get; set; }

    [Required]
    public DateTime Created { get; set; } = DateTime.Now;

    [Required]
    public InteractionEnum InteractionType { get; set; } = InteractionEnum.Like;

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; }

    public int? PostId { get; set; }

    [ForeignKey(nameof(PostId))]
    public virtual Post Post { get; set; }

    public int? ParentInteractionId { get; set; }

    [ForeignKey(nameof(ParentInteractionId))]
    public virtual Interaction ParentInteraction { get; set; }

    public string Content { get; set; }

    [Required]
    public bool IsDeleted { get; set; } = false;

    public virtual ICollection<Interaction> ChildInteractions { get; set; } = new List<Interaction>();
}
