using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.Exercise;
using LanguAI.Backend.ViewModels.Message;
using OpenAI.Chat;
using System.Text.Json;

namespace LanguAI.Backend.Services;

public interface IChatGPTService
{
    Task<List<CardViewModel>> GenerateWordsForCards(string nativeLanguage, string learningLanguage, int topicId, List<CardViewModel> existingCards);
    Task<MessageViewModel> GetResponseToConversation(int currentUserId);
    Task<List<ExerciseViewModel>> ReceiveExercisesFromChatGPT(ExerciseRequestViewModel request, string learningWords, string nativeWords);
    Task<string> GetPostCorrectionFromChatGPT(string text);
    Task<string> GetPostPhrasing(string about);
    void CreateThreadId(int currentUserId);
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
    public async Task<List<CardViewModel>> GenerateWordsForCards(string nativeLanguage, string learningLanguage, int topicId, List<CardViewModel> existingCards)
    {
        var topic = _context.Topic.FirstOrDefault(t => t.Id == topicId);

        ArgumentNullException.ThrowIfNull(topic);

        List<CardViewModel> cards = new();
        var nativeWordsOfExistingCards = existingCards.Select(c => c.WordInNativeLanguage).ToList();

        string messageFromSystem = $"You are a language teacher.\n" +
            $"Generate vocabulary flashcards in JSON format.\n\n" +
            $"Parameters:\n" +
            $"-Topic name: {topic.Name},\n" +
            $"-Topic description: {topic.Description},\n" +
            $"-Level: {topic.LanguageLevel},\n" +
            $"-Native Language: {nativeLanguage},\n" +
            $"-Existing words: {string.Join(',', nativeWordsOfExistingCards)}\n\n" +
            $"Requirements:\n" +
            $"-Output has to be plain JSON without markdown or code block formatting,\n" +
            $"-Each flashcard should be different from the existing words,\n" +
            $"-Each flashcard should contain:\n" +
            $"  -\"WordInNativeLanguage\": the native vocabulary word or expression,\n" +
            $"  -\"WordInLearningLanguage\": the translation in the target language";
        string messageFromUser = $"Generate 30 flashcards.";

        var systemMessage = ChatMessage.CreateSystemMessage(messageFromSystem);
        var userMessage = ChatMessage.CreateUserMessage(messageFromUser);

        var result = await SendRequestToChatGPTAsync(systemMessage, userMessage);

        List<CardViewModel> words = JsonSerializer.Deserialize<List<CardViewModel>>(result);

        words.ForEach(a => cards.Add(
            new CardViewModel
            {
                WordInLearningLanguage = a.WordInLearningLanguage,
                WordInNativeLanguage = a.WordInNativeLanguage
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

        var chatClient = new ChatClient("gpt-5-mini", EnvironmentSettings.ChatGPTApiKey);

        var messages = new List<ChatMessage>();

        conversation.ForEach(c =>
        {
            messages.Add(c.SenderId == currentUserId ? ChatMessage.CreateUserMessage(c.Text) : ChatMessage.CreateAssistantMessage(c.Text));
        });

        string result;

        try
        {

            ChatCompletion completion = await chatClient.CompleteChatAsync(messages);

            result = completion.Content[0].Text;

        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

        return new MessageViewModel
        {
            RecipientId = currentUserId,
            SenderId = EnvironmentSettings.ChatGPTId,
            SentAt = DateTime.Now,
            Status = MessageStatusEnum.Sent,
            Text = result
        };
    }

    /// <summary>
    /// Receive exercise from ChatGPT
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public async Task<List<ExerciseViewModel>> ReceiveExercisesFromChatGPT(ExerciseRequestViewModel request, string existingLearningWords, string existingNativeWords)
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
            const string messageFromUser = "Generate one exercise please!";

            switch (exerciseType)
            {
                case ExerciseTypeEnum.MissingWordExercise:
                    messageFromSystem = $"You are a language teacher who is creating a Missing Word exercise.\n" +
                        $"Parameters:\n" +
                        $"-Topic name: {request.TopicDescription},\n" +
                        $"-Existing Words: {existingLearningWords},\n" +
                        $"-Language: {currentLearning.LearningLanguageName},\n" +
                        $"-Previous sentences: {previousMainSentences},\n" +
                        $"-Language Level: beginner,\n\n" +
                        $"Requirements:\n" +
                        $"-From the existing word list, select one word and create a short sentence that includes it.\n" +
                        $"-The sentence can't be the same as any sentence from the previous sentences.\n" +
                        $"-The structure should be:\n" +
                        $"\"{{\n" +
                        $"  \"CorrectWord\": \"...\",\n" +
                        $"  \"FirstPartOfTheSentence\": \"...\",\n" +
                        $"  \"LastPartOfTheSentence\": \"...\",\n" +
                        $"  \"Words\": [\n" +
                        $"      \"CorrectWord\",\n" +
                        $"      \"RandomWord1\",\n," +
                        $"      \"RandomWord2\",\n" +
                        $"      \"RandomWord3\"\n" +
                        $"  ]\n" +
                        $"}}\",\n" +
                        $"-The sentence should match the language level.\n" +
                        $"-The sentence should be related to the topic.\n" +
                        $"-Remove the selected word from the sentence and split into FirstPartOfTheSentence and LastPartOfTheSentence.\n" +
                        $"-Generate 3 unrelated random words that **do not make sense logically** in the sentence.\n" +
                        $"-Return the JSON with the correct word and the 3 random ones in a randomized (not sorted) order.";
                    break;
                case ExerciseTypeEnum.SentenceAssemblyExercise:
                    messageFromSystem = $"You are a language teacher who is creating Sentence Assembly Exercise.\n" +
                        $"Parameters:\n" +
                        $"-Topic name: {request.TopicDescription},\n" +
                        $"-Existing Words: {existingLearningWords},\n" +
                        $"-Language: {currentLearning.LearningLanguageName},\n" +
                        $"-Previous sentences: {previousMainSentences},\n" +
                        $"-Language Level: beginner,\n\n" +
                        $"Requirements:\n" +
                        $"-The sentence should match the language level.\n" +
                        $"-The sentence should be related to the topic.\n" +
                        $"-Select only one word from the existing words. Do not use more than one.\n" +
                        $"-Create a **short, grammatically correct, and meaningful** sentence that includes it.\n" +
                        $"-The sentence must not be from this list: {previousMainSentences}.\n" +
                        $"-Split the sentence by spaces between words.\n" +
                        $"-Preserve all words exactly as they appear, including punctuation if it is attached (e.g., 'son.').\n" +
                        $"-**If a word appears more than once, include it multiple times.**\n" +
                        $"-Do not skip, deduplicate, or filter out any words — include articles, prepositions, and all others.\n" +
                        $"-Return the output in this JSON structure:\n" +
                        $"\"{{\n" +
                        $"  \"MainSentence\": \"The full sentence you created\",\n" +
                        $"  \"SentenceAssemblyExerciseSentence\": [\n" +
                        $"      {{ \"Text\": \"word1\" }},\n" +
                        $"      {{ \"Text\": \"word2\" }},\n" +
                        $"      ... \n" +
                        $"  ]\n" +
                        $"}}\".\n" +
                        $"-Check not to miss any word.\n" +
                        $"-Example:\n" +
                        $"\"{{\n" +
                        $"  \"MainSentence\": \"The mother is cooking.\",\n" +
                        $"  \"SentenceAssemblyExerciseSentence\": [\n" +
                        $"      {{ \"Text\": \"mother\" }},\n" +
                        $"      {{ \"Text\": \"The\" }},\n" +
                        $"      {{ \"Text\": \"is\" }},\n" +
                        $"      {{ \"Text\": \"cooking\" }}\n" +
                        $"  ]\n" +
                        $"}}\".";
                    break;
                case ExerciseTypeEnum.WordPairingExercise:
                    messageFromSystem = $"You are a language teacher who is creating Sentence Assembly Exercise.\n" +
                        $"Parameters:\n" +
                        $"-Topic name: {request.TopicDescription},\n" +
                        $"-Previous sentences: {previousMainSentences},\n" +
                        $"-Language Level: beginner,\n\n" +
                        $"-Native language: {currentLearning.NativeLanguageName},\n" +
                        $"-Learning language: {currentLearning.LearningLanguageName},\n" +
                        $"-Existing native words: {existingNativeWords}.\n" +
                        $"-Existing translated words: {existingLearningWords}.\n" +
                        $"Requirements:\n" +
                        $"-Randomly select 4 pairs of words. Each pair should include:\n" +
                        $"  -One word from the existing native words,\n" +
                        $"  -And its corresponding translation from the existing translated words.\n" +
                        $"-Make sure the pairs match correctly in translation.\n" +
                        $"-Return the output in this JSON structure:\n" +
                        $"{{ \"WordPairingExercise\": [\n" +
                        $"  {{" +
                        $"    \"WordInNativeLanguage\": \"anya\",\n" +
                        $"    \"WordInLearningLanguage\": \"mother\"\n" +
                        $"  }},\n" +
                        $"  {{\n" +
                        $"    \"WordInNativeLanguage\": \"fiú\",\n" +
                        $"    \"WordInLearningLanguage\": \"boy\"\n" +
                        $"  }}\n" +
                        $"]}}";
                    break;
                case ExerciseTypeEnum.MistakeCorrectingExercise:
                    messageFromSystem = $"You are a language teacher who is creating a mistake correcting exercise.\n" +
                        $"Parameters:\n" +
                        $"-Topic name: {request.TopicDescription},\n" +
                        $"-Existing Words: {existingLearningWords},\n" +
                        $"-Language: {currentLearning.LearningLanguageName},\n" +
                        $"-Previous sentences: {previousMainSentences},\n" +
                        $"-Language Level: beginner,\n\n" +
                        $"Requirements:\n" +
                        $"-From the existing word list, select one word and create a **short, grammatically incorrect** sentence that includes it. This incorrect sentence should be the MainSentence.\n" +
                        $"-The sentence must not be the same as any sentences from the {previousMainSentences}.\n" +
                        $"-Then generate 4 sentences:\n" +
                        $"  -Among the 4 sentences, exactly one should be the grammatically correct version of MainSentence.\n" +
                        $"  -The other 3 sentences must be grammatically incorrect." +
                        $"-Return the output in this JSON structure:\n" +
                        $"{{ \"MainSentence\": \"The MainSentence\",\n" +
                        $"  \"IsCorrectAndTextSentences\": [\n" +
                        $"      {{\n" +
                        $"          \"IsCorrect\": Whether is correct,\n" +
                        $"          \"Text\": \"The generated sentence\"\n" +
                        $"      }},\n" +
                        $"      ..." +
                        $"  ]" +
                        $"}}\n" +
                        $"In the output, \"IsCorrect\" must be true only for the grammatically correct sentence and false for the others.\n" +
                        $"Example:\n" +
                        $"{{ \"MainSentence\": \"The boy are playing.\",\n" +
                        $"  \"IsCorrectAndTextSentences\": [\n" +
                        $"      {{\n" +
                        $"          \"IsCorrect\": false,\n" +
                        $"          \"Text\": \"The boy aren't playing.\"\n" +
                        $"      }},\n" +
                        $"      {{\n" +
                        $"          \"IsCorrect\": true,\n" +
                        $"          \"Text\": \"The boy is playing.\"\n" +
                        $"      }}," +
                        $"      {{\n" +
                        $"          \"IsCorrect\": false,\n" +
                        $"          \"Text\": \"The boy do play.\"\n" +
                        $"      }}," +
                        $"      {{\n" +
                        $"          \"IsCorrect\": false,\n" +
                        $"          \"Text\": \"The boys is playing.\"\n" +
                        $"      }}" +
                        $"  ]" +
                        $"}}\n";
                    break;
                default:
                    messageFromSystem = $"You are a language teacher who is creating a question answering exercise.\n" +
                        $"Parameters:\n" +
                        $"-Topic name: {request.TopicDescription},\n" +
                        $"-Existing Words: {existingLearningWords},\n" +
                        $"-Language: {currentLearning.LearningLanguageName},\n" +
                        $"-Previous sentences: {previousMainSentences},\n" +
                        $"-Language Level: beginner,\n\n" +
                        $"Requirements:\n" +
                        $"-From the existing word list, select one word and create a **short, grammatically correct** sentence that includes it. This sentence must be a question and this should be the MainSentence.\n" +
                        $"-The sentence must not be the same as any sentences from the {previousMainSentences}.\n" +
                        $"-Then generate 4 answers:\n" +
                        $"  -Among the 4 sentences, exactly one should be the correct answer of the MainSentence.\n" +
                        $"  -The other 3 sentences should be answering random other questions." +
                        $"-Return the output in this JSON structure:\n" +
                        $"{{ \"MainSentence\": \"The question\",\n" +
                        $"  \"IsCorrectAndTextSentences\": [\n" +
                        $"      {{\n" +
                        $"          \"IsCorrect\": Whether is this the correct answer,\n" +
                        $"          \"Text\": \"The generated sentence\"\n" +
                        $"      }},\n" +
                        $"      ..." +
                        $"  ]" +
                        $"}}\n" +
                        $"In the output, \"IsCorrect\" must be true only for the **logically correct answer** and false for the others.\n" +
                        $"Example:\n" +
                        $"{{ \"MainSentence\": \"Is the mother cooking?\",\n" +
                        $"  \"IsCorrectAndTextSentences\": [\n" +
                        $"      {{\n" +
                        $"          \"IsCorrect\": false,\n" +
                        $"          \"Text\": \"There is one table over there.\"\n" +
                        $"      }},\n" +
                        $"      {{\n" +
                        $"          \"IsCorrect\": true,\n" +
                        $"          \"Text\": \"Yes, she is cooking.\"\n" +
                        $"      }}," +
                        $"      {{\n" +
                        $"          \"IsCorrect\": false,\n" +
                        $"          \"Text\": \"The rugby is a sport.\"\n" +
                        $"      }}," +
                        $"      {{\n" +
                        $"          \"IsCorrect\": false,\n" +
                        $"          \"Text\": \"We don't live in Budapest.\"\n" +
                        $"      }}" +
                        $"  ]" +
                        $"}}\n";
                    break;
            }

            var systemMessage = ChatMessage.CreateSystemMessage(messageFromSystem);
            var userMessage = ChatMessage.CreateUserMessage(messageFromUser);

            var result = await SendRequestToChatGPTAsync(systemMessage, userMessage);

            var response = JsonSerializer.Deserialize<ExerciseViewModel>(result);

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
    /// Get correction of the post
    /// </summary>
    /// <param name="text">Text of the post</param>
    /// <returns></returns>
    public async Task<string> GetPostCorrectionFromChatGPT(string text)
    {
        try
        {
            string messageFromSystem = "Correct the text for a post in the same language as the text";
            var systemMessage = ChatMessage.CreateSystemMessage(messageFromSystem);
            var userMessage = ChatMessage.CreateUserMessage(text);

            return await SendRequestToChatGPTAsync(systemMessage, userMessage);
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
            string messageFromSystem = $"Phrase a post about the text you get the language as the {about}, and it can only be maximum 250 character length";
            var systemMessage = ChatMessage.CreateSystemMessage(messageFromSystem);
            var userMessage = ChatMessage.CreateUserMessage(about);

            return await SendRequestToChatGPTAsync(systemMessage, userMessage);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    /// <summary>
    /// Send a request to ChatGPT API and get the response message
    /// </summary>
    /// <param name="systemMessage">System Message</param>
    /// <param name="userMessage">User's message</param>
    /// <returns></returns>
    private static async Task<string> SendRequestToChatGPTAsync(ChatMessage systemMessage, ChatMessage userMessage)
    {
        var chatClient = new ChatClient("gpt-5-mini", EnvironmentSettings.ChatGPTApiKey);

        var messages = new List<ChatMessage>(){
            systemMessage.Content.Count > 0 ? systemMessage : null,
            userMessage
            };

        try
        {
            ChatCompletion completion = await chatClient.CompleteChatAsync(messages);

            return completion.Content[0].Text;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    public void CreateThreadId(int currentUserId)
    {
#pragma warning disable OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
        try
        {
            var assistantClient = new OpenAI.Assistants.AssistantClient(EnvironmentSettings.ChatGPTApiKey);

            var threadId = assistantClient.CreateThread();

            var user = _context.User.FirstOrDefault(u => u.Id == currentUserId);

            if (user is null) throw new Exception();

            if (user.ThreadId is not null) return;

            user.ThreadId = threadId.Value?.Id;

            _context.SaveChanges();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
#pragma warning restore OPENAI001 // Type is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.
    }
}