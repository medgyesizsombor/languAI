using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Message;

namespace LanguAI.Backend.Services;

public interface IMessageService
{
    public bool SendMessage(MessageViewModel request);
    public List<MessageViewModel> GetMessageListByUserId(int userId, int friendId);
}

public class MessageService : BaseService, IMessageService
{
    public MessageService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Send message
    /// </summary>
    /// <param name="request">MessageViewModel sending request</param>
    /// <returns></returns>
    public bool SendMessage(MessageViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        bool isEdit = false;
        Message message;

        if (request.Id != null)
        {
            isEdit = true;
            message = _context.Message.FirstOrDefault(m => m.Id == request.Id);

            if (message == null)
            {
                return false;
            }
        }
        else
        {
            message = new Message
            {
                SenderId = request.SenderId,
                RecipientId = request.RecipientId,
                Status = MessageStatusEnum.Sent,
                SentAt = DateTime.Now
            };
        }

        message.Text = request.Text;

        if (!isEdit)
        {
            _context.Message.Add(message);
        }

        _context.SaveChanges();

        return true;
    }

    /// <summary>
    /// Get the messages by the Friend Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <param name="friendId">Friend's Id</param>
    /// <returns></returns>
    public List<MessageViewModel> GetMessageListByUserId(int userId, int friendId)
    {
        ArgumentNullException.ThrowIfNull(userId);
        ArgumentNullException.ThrowIfNull(friendId);

        return _context.Message
            .Where(m =>
                (m.SenderId == userId && m.RecipientId == friendId)
                || (m.SenderId == friendId && m.RecipientId == userId))
            .Select(m => new MessageViewModel
            {
                SenderId = m.SenderId,
                RecipientId = m.RecipientId,
                Status = m.Status,
                SentAt = m.SentAt,
                Text = m.Text
            }).ToList();
    }
}