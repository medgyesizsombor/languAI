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
    bool DeleteUser(int userId);
}

public class UserService : BaseService, IUserService
{

    public UserService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Get all the users
    /// </summary>
    /// <returns></returns>
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

    /// <summary>
    /// Get user by Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
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

    /// <summary>
    /// Save user
    /// </summary>
    /// <param name="request">User ViewModel</param>
    /// <returns></returns>
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

    /// <summary>
    /// Delete User
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    public bool DeleteUser(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var currentUserId = 7;

        try
        {
            if (userId != currentUserId) {
                throw new UnauthorizedAccessException();
            }

            var user = _context.User.FirstOrDefault(u => u.Id == userId);

            if (user == null) {
                ArgumentNullException.ThrowIfNull(user);
            }

            _context.User.Remove(user);
            _context.SaveChanges();

            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}