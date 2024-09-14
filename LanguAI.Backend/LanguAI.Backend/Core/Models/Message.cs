using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.Core.Models;

public class Message
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Text { get; set; }

    [Required]
    public int SenderId { get; set; }

    [ForeignKey(nameof(SenderId))]
    public virtual User Sender { get; set; }

    [Required]
    public int RecipientId { get; set; }

    [ForeignKey(nameof(RecipientId))]
    public virtual User Recipient { get; set; }

    [Required]
    public DateTime SentAt { get; set; } = DateTime.UtcNow;

    [Required]
    public MessageStatusEnum Status { get; set; } = MessageStatusEnum.Sent;
}
