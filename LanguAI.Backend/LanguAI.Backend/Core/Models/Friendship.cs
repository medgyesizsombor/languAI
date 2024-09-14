using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.Core.Models;

public class Friendship
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int RequesterId { get; set; }

    [ForeignKey(nameof(RequesterId))]
    public virtual User Requester { get; set; }

    [Required]
    public int RecipientId { get; set; }

    [ForeignKey(nameof(RecipientId))]
    public virtual User Recipient { get; set; }

    [Required]
    public DateTime Created { get; set; } = DateTime.UtcNow;

    [Required]
    public int Status { get; set; } = (int)FriendshipStatusEnum.Requested;

    [Required]
    public bool IsCloseFriendship { get; set; } = false;
}
