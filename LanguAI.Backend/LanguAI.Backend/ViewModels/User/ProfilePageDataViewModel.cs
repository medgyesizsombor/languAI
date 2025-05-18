using LanguAI.Backend.ViewModels.Card;
using LanguAI.Backend.ViewModels.SelectorModel;

namespace LanguAI.Backend.ViewModels.User;

public class ProfilePageDataViewModel
{
    public UserViewModel User { get; set; }
    public List<IntSelectorModel> FriendList { get; set; }
    public List<CardListViewModel> CardList { get; set; }
}
