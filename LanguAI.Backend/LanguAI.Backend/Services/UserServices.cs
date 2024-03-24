using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels;

namespace LanguAI.Backend.Services;

public interface IUserServices
{
    List<User> GetAllUsers();
}

public class UserServices : BaseService, IUserServices
{

    public UserServices(LanguAIDataContext context) : base(context)
    {
    }

    public List<User> GetAllUsers()
    {
        var asd = _context.User.Select(u => new User()
        {
            Id = u.Id,
            Name = u.Name
        }).ToList();
        return asd;
    }
}

