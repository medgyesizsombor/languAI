using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Message;
using Microsoft.EntityFrameworkCore;
using OpenAI.Assistants;

namespace LanguAI.Backend.Services;

public interface IMessageService
{
    bool SendMessage(MessageViewModel request);
    List<MessageViewModel> GetMessageListByUserId(int userId, int friendId);
    LastMessageViewModel GetLastMessageByUserIds(int userId, int otherUserId);
    Task<string> SendMessageToChatGpt(int currentUserId, string message);
}

public class MessageService : BaseService, IMessageService
{
    private const int CHATGPT_ID = 2;
    private const string QUEUED = "queued";
    private const string IN_PROGRESS = "in_progress";

    public MessageService(LanguAIDataContext context) : base(context) { }

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
                Status = request.Status,
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
            })
            .OrderBy(m => m.SentAt)
            .ToList();
    }

    public LastMessageViewModel GetLastMessageByUserIds(int userId, int otherUserId)
    {
        return _context.Message
            .Include(m => m.Sender)
            .Include(m => m.Recipient)
            .Where(m =>
                (m.SenderId == userId && m.RecipientId == otherUserId)
                || (m.SenderId == otherUserId && m.RecipientId == userId))
            .Select(m => new LastMessageViewModel
            {
                SenderUsername = m.SenderId == userId ? m.Sender.Username : m.Recipient.Username,
                SentAt = m.SentAt,
                Text = m.Text
            })
            .OrderByDescending(m => m.SentAt)
            .FirstOrDefault();
    }

    public async Task<string> SendMessageToChatGpt(int currentUserId, string message)
    {
        var threadId = _context.User.First(u => u.Id == currentUserId).ThreadId;

        var messages = new List<Message>();

        var userMessage = new Message
        {
            SenderId = currentUserId,
            RecipientId = CHATGPT_ID,
            SentAt = DateTime.Now,
            Text = message
        };

        string response = null;

#pragma warning disable OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
        try
        {
            AssistantClient assistantClient = new(EnvironmentSettings.ChatGPTApiKey);
            var assistantCreationOptions = new AssistantCreationOptions
            {
                Instructions = "You are teacher, try to answer for the next question."
            };

            var assistant = await assistantClient.CreateAssistantAsync("gpt-4o-mini", assistantCreationOptions);

            await assistantClient.CreateMessageAsync(threadId, MessageRole.User, [message]);

            var run = await assistantClient.CreateRunAsync(threadId, assistant.Value.Id);

            while (run.Value.Status == IN_PROGRESS || run.Value.Status == QUEUED)
            {
                await Task.Delay(500);
                run = await assistantClient.GetRunAsync(threadId, run.Value.Id);
            }

            var messagesByThreadId = assistantClient.GetMessages(threadId);
            response = messagesByThreadId.OrderByDescending(m => m.CreatedAt).First().Content[0].Text;

            userMessage.Status = MessageStatusEnum.Sent;
            messages.Add(userMessage);

            messages.Add(new()
            {
                SenderId = CHATGPT_ID,
                RecipientId = currentUserId,
                SentAt = DateTime.Now,
                Text = response
            });
        }
        catch (Exception ex)
        {
            userMessage.Status = MessageStatusEnum.Unsent;
            messages.Add(userMessage);
            //TODO ide kell a log
        }

        _context.AddRange(messages);
        _context.SaveChanges();
        return response;

#pragma warning restore OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
    }
}