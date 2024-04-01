using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.User;

namespace LanguAI.Backend.Services;

public interface IUserServices
{
    List<UserViewModel> GetAllUsers();
    UserViewModel GetUserById(int userId);
    bool SaveUser(UserViewModel request);
}

public class UserServices : BaseService, IUserServices
{

    public UserServices(LanguAIDataContext context) : base(context)
    {
    }

    public List<UserViewModel> GetAllUsers()
    {
        var asd = _context.User.Select(u => new UserViewModel()
        {
            Id = u.Id,
            Name = u.Name,
            DateOfBirth = u.DateOfBirth,
            Country = u.Country,
        }).ToList();
        return asd;
    }

    public UserViewModel GetUserById(int userId)
    {
        User user = _context.User.FirstOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return null;
        }

        return new UserViewModel
        {
            Id = user.Id,
            Name = user.Name,
            Country = user.Country,
            DateOfBirth = user.DateOfBirth
        };
    }

    public bool EditUser(UserViewModel request)
    {
        try
        {
            bool success = false;
            User user = _context.User.FirstOrDefault(u => u.Id == request.Id);

            if (user != null)
            {
                return false;
            }

            user.DateOfBirth = request.DateOfBirth;
            user.Name = request.Name;
            user.Country = request.Country;

            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}

