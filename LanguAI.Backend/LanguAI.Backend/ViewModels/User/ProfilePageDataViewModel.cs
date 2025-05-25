using LanguAI.Backend.ViewModels.Card;

namespace LanguAI.Backend.ViewModels.User;

public class ProfilePageDataViewModel
{
    public UserViewModel User { get; set; }
    public List<OtherUserViewModel> FriendList { get; set; }
    public List<CardListViewModel> CardList { get; set; }
}
