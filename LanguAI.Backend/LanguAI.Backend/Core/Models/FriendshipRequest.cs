using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.Core.Models;

public class FriendshipRequest
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int RequesterId { get; set; }

    [ForeignKey(nameof(RequesterId))]
    public virtual User Requester {  get; set; }

    [Required]
    public int ReceiverId { get; set; }

    [ForeignKey(nameof(ReceiverId))]
    public virtual User Receiver { get; set; }

    [Required]
    public DateTime RequestedAt { get; set; }

    [Required]
    public int Status { get; set; } = 1;
}
