using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;

namespace LanguAI.Backend.Services;

public interface IChatGPTService
{
    Task<ChatMessage> SendRequestToChatGPTAsync(string message);
}

public class ChatGPTService : BaseService, IChatGPTService
{

    public ChatGPTService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="message"></param>
    /// <returns></returns>
    public async Task<ChatMessage> SendRequestToChatGPTAsync(string message)
    {
        var openai = new OpenAIAPI(EnvironmentSettings.ChatGPTApiKey);

        var request = new ChatRequest()
        {
            Messages = new ChatMessage[] { new ChatMessage(ChatMessageRole.User, message) },
            Temperature = 0.1,
            Model = Model.ChatGPTTurbo
        };

        var result = await openai.Chat.CreateChatCompletionAsync(request);

        return result.Choices[0].Message;
    }
}