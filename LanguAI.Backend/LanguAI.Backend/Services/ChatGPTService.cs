using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using System.Text.Json;

namespace LanguAI.Backend.Services;

public interface IChatGPTService
{
    Task<List<CardViewModel>> GetWordsForCardsAsync(string systemLanguage, string learningLanguage, string level);
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
    public async Task<List<CardViewModel>> GetWordsForCardsAsync(string systemLanguage, string learningLanguage, string level)
    {
        List<CardViewModel> cards = new List<CardViewModel>();

        string messageFromSystem = $"Answer in JSON where the format is like {{{systemLanguage} : {learningLanguage}}}";
        string messageFromUser = $"Give 50 words in {learningLanguage} at {level} level";
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
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="message">Message to ChatGPT</param>
    /// <returns></returns>
    private async Task<ChatMessage> SendRequestToChatGPTAsync(ChatMessage userMessage, ChatMessage systemMessage)
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
            var asd = e.Message;
        }

        return result.Choices[0].Message;
    }
}