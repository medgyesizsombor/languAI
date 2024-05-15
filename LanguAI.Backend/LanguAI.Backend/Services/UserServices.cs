using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.User;

namespace LanguAI.Backend.Services;

public interface IUserServices
{
    List<UserViewModel> GetAllUsers();
    UserViewModel GetUserById(int userId);
    bool EditUser(UserViewModel request);
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
            Username = u.Username,
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
            Username = user.Username,
            Country = user.Country,
            DateOfBirth = user.DateOfBirth,
            Email = user.Email,
        };
    }

    public bool EditUser(UserViewModel request)
    {
        try
        {
            User user = _context.User.Where(u => u.Id == request.Id).FirstOrDefault();

            if (user != null)
            {
                return false;
            }

            user.DateOfBirth = request.DateOfBirth;
            user.Username = request.Username;
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

