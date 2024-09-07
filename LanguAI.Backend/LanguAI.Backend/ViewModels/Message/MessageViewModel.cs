using LanguAI.Backend.Core.Enums;

namespace LanguAI.Backend.ViewModels.Message;

public class MessageViewModel
{
    public int? Id { get; set; }

    public string Text { get; set; }

    public int SenderId { get; set; }

    public int ReceiverId { get; set; }

    public DateTime SentAt { get; set; }

    public MessageStatusEnum Status { get; set; }
}
