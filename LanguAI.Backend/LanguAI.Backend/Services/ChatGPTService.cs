using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.Exercise;
using LanguAI.Backend.ViewModels.Message;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
using System.Text.Json;

namespace LanguAI.Backend.Services;

public interface IChatGPTService
{
    Task<List<CardViewModel>> GetWordsForCards(string nativeLanguage, string learningLanguage, string level, int topicId);
    Task<MessageViewModel> GetResponseToConversation(int currentUserId);
    Task<List<ExerciseViewModel>> ReceiveExercisesFromChatGPT(ExerciseRequestViewModel request, string words);
    Task<string> GetPostCorrectionFromChatGPT(string text);
    Task<string> GetPostPhrasing(string about);
}

public class ChatGPTService : BaseService, IChatGPTService
{
    private readonly ILearningService _learningService;

    public ChatGPTService(LanguAIDataContext context, ILearningService learningService) : base(context)
    {
        _learningService = learningService;
    }

    /// <summary>
    /// Send a request to ChatGPT API to get words for the cards
    /// </summary>
    /// <param name="language"></param>
    /// <returns></returns>
    public async Task<List<CardViewModel>> GetWordsForCards(string nativeLanguage, string learningLanguage, string level, int topicId)
    {
        var topic = _context.Topic.FirstOrDefault(t => t.Id == topicId);

        ArgumentNullException.ThrowIfNull(topic);

        List<CardViewModel> cards = new List<CardViewModel>();

        string messageFromSystem = $"Answer in JSON where the format is like {{{nativeLanguage} : {learningLanguage}}}";
        string messageFromUser = $"Give me 4 one- or two-word phrases in {learningLanguage} dictionary form at {level} level related to the topic of {topic.Description}";
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
    /// Receive exercise from ChatGPT
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public async Task<List<ExerciseViewModel>> ReceiveExercisesFromChatGPT(ExerciseRequestViewModel request, string words)
    {
        ArgumentNullException.ThrowIfNull(request);

        var currentLearning = _learningService.GetCurrentLearningOfUser(request.UserId);

        if (currentLearning == null) return null;

        var exercises = new List<ExerciseViewModel>();
        var previousMainSentences = "";

        for (int i = 0; i < 10; i++)
        {
            Random random = new Random();
            var exerciseType = (ExerciseTypeEnum)random.Next(1, 6);

            string messageFromSystem;
            string messageFromUser;

            switch (exerciseType)
            {
                case ExerciseTypeEnum.MissingWordExercise:
                    messageFromSystem = $"Answer in JSON where the format is like {{\"CorrectWord\":\"TheWordWhichIsMissingInTheSentence\",\"FirstPartOfTheSentence\":\"ThePartOfSentenceBeforeTheMissingWord\",\"LastPartOfTheSentence\":\"ThePartOfSentenceAfterTheMissingWord\",\"Words\":[\"CorrectWord\",\"RandomWord\",\"RandomWord\",\"RandomWord\"]}}.";
                    messageFromUser = $"Pick 1 word from {words} and generate a really short sentence and the sentence has to contain the word. The sentece should be {request.LanguageLevel} and related to the topic of {request.TopicDescription} and mustn't be in this sentence lists: \"{previousMainSentences}\". Generate other 4 words from a random topic which would make a nonsense of the sentence.  the order of the list should be not sorted";
                    break;
                case ExerciseTypeEnum.SentenceAssemblyExercise:
                    messageFromSystem = $"Answer in JSON where the format is like {{ \"MainSentence\": \"The main sentence\", \"SentenceAssemblyExerciseSentence\": [{{ \"Text\": \"string\" }},{{ \"Text\": \"string\" }},{{ \"Text\": \"string\" }},{{ \"Text\": \"string\" }}]}}.";
                    messageFromUser = $"Give me a grammatically correct, mininum 3 words long, maximum 6 words long sentence, which contain a word from this list: {words}. The sentence should the level be {request.LanguageLevel} level, related to the topic of {request.TopicDescription} and mustn't be in this sentence lists: \"{previousMainSentences}\". After generating the sentence, break it by the words";
                    break;
                case ExerciseTypeEnum.WordPairingExercise:
                    //TODO átírni
                    messageFromSystem = $"Answer in JSON where the format is like {{\"Sentence\": [{{ \"isCorrect\": boolean, \"text\": string}}, {{ \"isCorrect\": boolean, \"text\": string}}, {{ \"isCorrect\": boolean, \"text\": string}}, {{ \"isCorrect\": boolean, \"text\": string}}]}}. The sentence should contains a word from this list: {words}, should the level be {request.LanguageLevel} level and related to the topic of {request.TopicDescription}.";
                    messageFromUser = $"Give me a short sentence, break it by the words, tag them with the current index of the sentence. After you finish creating this, the order of the list should be not sorted";
                    break;
                case ExerciseTypeEnum.MistakeCorrectingExercise:
                    messageFromSystem = $"Answer in JSON where the format is like {{\"MainSentence\": \"The main sentence\",\"IsCorrectAndTextSentences\": [{{ \"IsCorrect\": boolean, \"Text\": string}},{{ \"IsCorrect\": boolean, \"Text\":string}},{{ \"IsCorrect\": boolean, \"Text\": string}},{{ \"IsCorrect\": boolean, \"Text\": string}}]}}";
                    messageFromUser = $"Give me a grammatically incorrect short sentence for the mainSentence in {currentLearning.LearningLanguageName} which is not in the {previousMainSentences}, and 4 senteces, where 3 is still gramatically incorrect, and 1 is correcting the main sentence. The order should be not sorted. The senteces should contains a word from this list: {words}, should the level be {request.LanguageLevel} level and related to the topic of {request.TopicDescription}";
                    break;
                default:
                    messageFromSystem = $"Answer in JSON where the format is like {{\"MainSentence\": \"The main sentence\",\"IsCorrectAndTextSentences\": [{{ \"IsCorrect\": boolean, \"Text\": string}},{{ \"IsCorrect\": boolean, \"Text\":string}},{{ \"IsCorrect\": boolean, \"Text\": string}},{{ \"IsCorrect\": boolean, \"Text\": string}}]}} The question should contains a word from this list: {words}, should the level be {request.LanguageLevel} level and related to the topic of {request.TopicDescription}.";
                    messageFromUser = $"Give me a short question for the mainSentence in {currentLearning.LearningLanguageName} which is not in this < {previousMainSentences} >, and generate a short correct answer for the question where the IsCorrect is true, and 3 short answers which are answering a full random question and the IsCorrect is false for other questions for IsCorrectAndTextSentences.";
                    break;
            }

            ChatMessage systemMessage = new ChatMessage(ChatMessageRole.System, messageFromSystem);
            ChatMessage userMessage = new ChatMessage(ChatMessageRole.User, messageFromUser);

            ChatMessage result = await SendRequestToChatGPTAsync(systemMessage, userMessage, 0.5);

            var response = JsonSerializer.Deserialize<ExerciseViewModel>(result.TextContent);

            response.ExerciseType = exerciseType;

            if (i == 0)
            {
                response.IsActive = true;
            }

            if (ExerciseTypeEnum.MistakeCorrectingExercise == response.ExerciseType
                || ExerciseTypeEnum.QuestionAnsweringExercise == response.ExerciseType
                || ExerciseTypeEnum.SentenceAssemblyExercise == response.ExerciseType)
            {
                if (i == 0)
                {
                    previousMainSentences = response.MainSentence;
                }
                else
                {
                    previousMainSentences = $"{previousMainSentences}, {response.MainSentence}";
                }
            }
            exercises.Add(response);
        }

        return exercises;
    }

    /// <summary>
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="systemMessage">System Message</param>
    /// <param name="userMessage">User's message</param>
    /// <returns></returns>
    private async Task<ChatMessage> SendRequestToChatGPTAsync(ChatMessage systemMessage, ChatMessage userMessage, double temperature = 0.1)
    {
        var openai = new OpenAIAPI(EnvironmentSettings.ChatGPTApiKey);

        List<ChatMessage> messages = new List<ChatMessage>(){
            systemMessage.TextContent.Length > 0 ? systemMessage : null,
            userMessage
            };

        var request = new ChatRequest()
        {
            Messages = messages,
            Temperature = temperature,
            Model = Model.ChatGPTTurbo_16k
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

    /// <summary>
    /// Get correction of the post
    /// </summary>
    /// <param name="text">Text of the post</param>
    /// <returns></returns>
    public async Task<string> GetPostCorrectionFromChatGPT(string text)
    {
        try
        {
            string messageFromSystem = "Correct the text for a post in the same language as the text";
            ChatMessage systemMessage = new ChatMessage(ChatMessageRole.System, messageFromSystem);
            ChatMessage userMessage = new ChatMessage(ChatMessageRole.User, text);

            ChatMessage result = await SendRequestToChatGPTAsync(systemMessage, userMessage);

            return result.TextContent;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    /// <summary>
    /// Post phrasing about the text from param
    /// </summary>
    /// <param name="about">The text that the post should be based on</param>
    /// <returns></returns>
    public async Task<string> GetPostPhrasing(string about)
    {
        try
        {
            string messageFromSystem = $"Phrase a post about the text you get the language as the {about}, and it can only be maximum 250-length";
            ChatMessage systemMessage = new ChatMessage(ChatMessageRole.System, messageFromSystem);
            ChatMessage userMessage = new ChatMessage(ChatMessageRole.User, about);

            ChatMessage result = await SendRequestToChatGPTAsync(systemMessage, userMessage);

            return result.TextContent;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}