using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.SelectorModel;

namespace LanguAI.Backend.ViewModels.Topic;

public class TopicOfCurrentLearningViewModel
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string NameInHun { get; set; }

    public string Description { get; set; }

    public string DescriptionInHun { get; set; }

    public List<IntSelectorModel> CardListNamesAndIds { get; set; } = new List<IntSelectorModel>();
}
