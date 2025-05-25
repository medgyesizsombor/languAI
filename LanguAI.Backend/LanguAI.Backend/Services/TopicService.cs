using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Topic;

namespace LanguAI.Backend.Services;

public interface ITopicService
{
    TopicForExerciseViewModel GetTopicById(int topicId);
}

public class TopicService : BaseService, ITopicService
{
    public TopicService(LanguAIDataContext context, ILogger<StorageService> logger) : base(context) { }

    public TopicForExerciseViewModel GetTopicById(int topicId)
    {
        var topic = _context.Topic.FirstOrDefault(t => t.Id == topicId);

        ArgumentNullException.ThrowIfNull(topic);

        return new TopicForExerciseViewModel
        {
            Description = topic.Description,
            Name = topic.Name,
            LanguageLevel = Enum.GetName(typeof(LanguageLevelEnum), topic.LanguageLevel)
        };

    }
}