using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.Message;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using System.Text.Json;

namespace LanguAI.Backend.Services;

public interface IChatGPTService
{
    Task<List<CardViewModel>> GetWordsForCards(string systemLanguage, string learningLanguage, string level, string topic);
    Task<MessageViewModel> GetResponseToConversation(int currentUserId);

}

public class ChatGPTService : BaseService, IChatGPTService
{
    public ChatGPTService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Send a request to ChatGPT API to get words for the cards
    /// </summary>
    /// <param name="language"></param>
    /// <returns></returns>
    public async Task<List<CardViewModel>> GetWordsForCards(string systemLanguage, string learningLanguage, string level, string topic)
    {
        List<CardViewModel> cards = new List<CardViewModel>();

        string messageFromSystem = $"Answer in JSON where the format is like {{{systemLanguage} : {learningLanguage}}}";
        string messageFromUser = $"Give me 4 one- or two-word phrases in {learningLanguage} dictionary form at {level} level related to the topic of {topic}";
        ChatMessage systemMessage = new ChatMessage(ChatMessageRole.System, messageFromSystem);
        ChatMessage userMessage = new ChatMessage(ChatMessageRole.User, messageFromUser);

        ChatMessage result = await SendRequestToChatGPTAsync(systemMessage, userMessage);

        List<KeyValuePair<string, string>> words = JsonSerializer.Deserialize<Dictionary<string, string>>(result.TextContent).ToList();

        words.ForEach(a => cards.Add(
            new CardViewModel
            {
                WordInLearningLanguage = a.Key,
                WordInNativeLanguage = a.Value
            })
        );

        return cards;
    }

    /// <summary>
    /// Get response from ChatGPT to the conversation
    /// </summary>
    /// <param name="currentUserId">Current user's Id</param>
    /// <returns></returns>
    public async Task<MessageViewModel> GetResponseToConversation(int currentUserId)
    {
        List<MessageViewModel> conversation = _context.Message
            .Where(m => (m.SenderId == currentUserId && m.RecipientId == EnvironmentSettings.ChatGPTId)
                || (m.SenderId == EnvironmentSettings.ChatGPTId && m.RecipientId == currentUserId))
            .OrderBy(m => m.SentAt)
            .Select(m => new MessageViewModel
            {
                SentAt = m.SentAt,
                SenderId = m.SenderId,
                RecipientId = m.RecipientId,
                Status = m.Status,
                Text = m.Text
            })
            .ToList();

        var openai = new OpenAIAPI(EnvironmentSettings.ChatGPTApiKey);

        List<ChatMessage> messages = new List<ChatMessage>();

        conversation.ForEach(c =>
        {
            messages.Add(new ChatMessage
            {
                Role = c.SenderId == currentUserId ? ChatMessageRole.User : ChatMessageRole.Assistant,
                TextContent = c.Text
            });
        });

        var request = new ChatRequest()
        {
            Messages = messages,
            Temperature = 0.1,
            Model = Model.ChatGPTTurbo
        };

        ChatResult result = new ChatResult();

        try
        {
            result = await openai.Chat.CreateChatCompletionAsync(request);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return new MessageViewModel
        {
            RecipientId = currentUserId,
            SenderId = EnvironmentSettings.ChatGPTId,
            SentAt = DateTime.Now,
            Status = MessageStatusEnum.Sent,
            Text = result.Choices[0].Message.TextContent
        };
    }

    /// <summary>
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="message">Message to ChatGPT</param>
    /// <returns></returns>
    private async Task<ChatMessage> SendRequestToChatGPTAsync(ChatMessage systemMessage, ChatMessage userMessage)
    {
        var openai = new OpenAIAPI(EnvironmentSettings.ChatGPTApiKey);

        List<ChatMessage> messages = new List<ChatMessage>(){
            systemMessage.TextContent.Length > 0 ? systemMessage : null,
            userMessage
            };

        var request = new ChatRequest()
        {
            Messages = messages,
            Temperature = 0.1,
            Model = Model.ChatGPTTurbo
        };

        ChatResult result = new ChatResult();

        try
        {
            result = await openai.Chat.CreateChatCompletionAsync(request);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }

        return result.Choices[0].Message;
    }
}