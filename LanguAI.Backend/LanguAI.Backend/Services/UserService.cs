using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.Utils;
using LanguAI.Backend.ViewModels.User;

namespace LanguAI.Backend.Services;

public interface IUserService
{
    List<UserViewModel> GetAllUsers();
    UserViewModel GetUserById(int userId);
    bool EditUser(UserViewModel request);
    bool ChangePassword(ChangePasswordRequestViewModel request);
}

public class UserService : BaseService, IUserService
{

    public UserService(LanguAIDataContext context) : base(context)
    {
    }

    public List<UserViewModel> GetAllUsers()
    {
        return _context.User.Select(u => new UserViewModel()
        {
            Id = u.Id,
            Username = u.Username,
            DateOfBirth = u.DateOfBirth,
            Language = u.Language,
        }).ToList();
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
            Language = user.Language,
            DateOfBirth = user.DateOfBirth,
            Email = user.Email,
        };
    }

    public bool EditUser(UserViewModel request)
    {
        try
        {
            User user = _context.User.Where(u => u.Id == request.Id).FirstOrDefault();

            if (user == null)
            {
                return false;
            }

            user.DateOfBirth = request.DateOfBirth;
            user.Username = request.Username;
            user.Language = request.Language;

            _context.SaveChanges();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>
    /// Change User Password
    /// </summary>
    /// <param name="request">Change Password Request</param>
    /// <returns></returns>
    public bool ChangePassword(ChangePasswordRequestViewModel request)
    {
        try
        {
            User user = _context.User.FirstOrDefault(u => u.Id == request.UserId);

            if (Hasher.Verify(request.OldPassword, user.PasswordHash))
            {
                var newPasswordHash = Hasher.HashString(request.NewPassword);

                user.PasswordHash = newPasswordHash;

                _context.SaveChanges();

                return true;
            }

            return true;

        }
        catch (Exception ex)
        {
            return false;
        }
    }
}

