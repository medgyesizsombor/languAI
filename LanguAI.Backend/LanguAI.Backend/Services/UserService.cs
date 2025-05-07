using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.Utils;
using LanguAI.Backend.ViewModels.Image;
using LanguAI.Backend.ViewModels.Learning;
using LanguAI.Backend.ViewModels.User;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IUserService
{
    List<UserViewModel> GetAllUsers();
    Task<UserViewModel> GetUserById(int userId);
    bool SaveUser(SaveUserRequest request, int currentUserId);
    bool ChangePassword(ChangePasswordRequestViewModel request);
    bool DeleteUser(int userId);
    int GetStreakOfCurrentUser(int userId);
    UserDataViewModel GetDataOfUser(int userId);
    bool SetProfilePicture(int imageId, int userId);
}

public class UserService : BaseService, IUserService
{
    private readonly IStorageService _storageService;

    public UserService(LanguAIDataContext context, IStorageService storageService) : base(context)
    {
        _storageService = storageService;
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
            Language = u.Language
        }).ToList();
    }

    /// <summary>
    /// Get user by Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    public async Task<UserViewModel> GetUserById(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        User user = _context.User
            .Include(u => u.Image)
            .FirstOrDefault(u => u.Id == userId
                && u.IsActive);

        if (user == null)
        {
            return null;
        }

        string pictureContentAsString = null;
        if (user.ImageId != null)
        {
            var bytes = await _storageService.DownloadBlob((int)user.ImageId);
            pictureContentAsString = Convert.ToBase64String(bytes);
        }

        return new UserViewModel
        {
            Id = user.Id,
            Username = user.Username,
            Language = user.Language,
            DateOfBirth = user.DateOfBirth,
            Email = user.Email,
            IsActive = user.IsActive,
            Streak = user.Streak,
            ProfilePicture = string.IsNullOrEmpty(pictureContentAsString)
                ? null
                : new ImageViewModel
                {
                    ContentAsString = pictureContentAsString,
                    Id = user.ImageId,
                    Name = user.Image.Name,
                    Type = user.Image.Type,
                }
        };
    }

    /// <summary>
    /// Save user
    /// </summary>
    /// <param name="request">User ViewModel</param>
    /// <returns></returns>
    public bool SaveUser(SaveUserRequest request, int currentUserId)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            User user = _context.User.Where(u => u.Id == currentUserId && u.IsActive).FirstOrDefault();

            if (user == null)
            {
                return false;
            }

            user.DateOfBirth = request.DateOfBirth;
            user.Username = request.Username;
            user.Email = request.Email;

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
            User user = _context.User.FirstOrDefault(u => u.Id == request.UserId && u.IsActive);

            if (Hasher.Verify(request.OldPassword, user.PasswordHash))
            {
                var newPasswordHash = Hasher.HashString(request.NewPassword);

                user.PasswordHash = newPasswordHash;

                _context.SaveChanges();

                return true;
            }

            return true;

        }
        catch (Exception e)
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
        var currentUserId = 7;

        try
        {
            if (userId != currentUserId)
            {
                throw new UnauthorizedAccessException();
            }

            var user = _context.User.FirstOrDefault(u => u.Id == userId && u.IsActive);

            if (user == null)
            {
                return false;
            }

            user.IsActive = false;
            _context.SaveChanges();

            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    /// <summary>
    /// Get current user's streak
    /// </summary>
    /// <param name="userId">Current user's Id</param>
    /// <returns></returns>
    public int GetStreakOfCurrentUser(int userId)
    {
        var user = _context.User.FirstOrDefault(u => u.Id == userId);

        ArgumentNullException.ThrowIfNull(user);

        return user.Streak;
    }

    /// <summary>
    /// Get current user's data
    /// </summary>
    /// <param name="userId">Current user's Id</param>
    /// <returns></returns>
    public UserDataViewModel GetDataOfUser(int userId)
    {
        var user = _context.User
            .Include(u => u.Learnings)
            .ThenInclude(l => l.LearningLanguage)
            .Include(u => u.Learnings)
            .ThenInclude(l => l.NativeLanguage)
            .FirstOrDefault(u => u.Id == userId
                && u.IsActive);

        ArgumentNullException.ThrowIfNull(user);

        var currentLearning = user.Learnings
            .Where(l => l.IsActive
                && l.UserId == userId)
            .Select(l => new LearningViewModel
            {
                Id = l.Id,
                LanguageLevel = l.LanguageLevel,
                LearningLanguageId = l.LearningLanguageId,
                UserId = userId,
                IsActive = l.IsActive,
                LearningLanguageCode = l.LearningLanguage.Code,
                LearningLanguageName = l.LearningLanguage.Name,
                LearningLanguageNameInHun = l.LearningLanguage.NameInHun,
                NativeLanguageCode = l.NativeLanguage.Code,
                NativeLanguageName = l.NativeLanguage.Name,
                NativeLanguageNameInHun = l.NativeLanguage.NameInHun,
                NativeLanguageId = l.NativeLanguageId
            }).FirstOrDefault();

        return new UserDataViewModel
        {
            DateOfBirth = user.DateOfBirth,
            LanguageId = user.Language,
            Streak = user.Streak,
            Username = user.Username,
            Id = userId,
            CurrentLearning = currentLearning
        };
    }

    public bool SetProfilePicture(int imageId, int userId)
    {
        var user = _context.User
            .FirstOrDefault(u => u.Id == userId);

        if (user == null)
        {
            throw new Exception("User is not found");
        }

        user.ImageId = imageId;

        _context.SaveChanges();

        return true;
    }
}