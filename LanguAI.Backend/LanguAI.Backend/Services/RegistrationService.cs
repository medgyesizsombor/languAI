using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.Utils;
using LanguAI.Backend.ViewModels.Registration;

namespace LanguAI.Backend.Services;

public interface IRegistrationService
{
    int? Register(RegisterRequestViewModel request);
}

public class RegistrationService : BaseService, IRegistrationService
{

    public RegistrationService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Register the user
    /// </summary>
    /// <param name="request">Request ViewModel</param>
    /// <returns></returns>
    public int? Register(RegisterRequestViewModel request)
    {
        try
        {
            if (_context.User.Any(u => u.Username == request.Username || u.Email == request.Email)) {
                throw new Exception("Username or email is already used by someone else");
            }

            var password = Hasher.HashString(request.Password);

            User user = new User()
            {
                Username = request.Username,
                DateOfBirth = request.DateOfBirth,
                PasswordHash = password,
                Language = request.Language,
                Email = request.Email
            };

            _context.User.Add(user);
            _context.SaveChanges();

            return user.Id;
        }
        catch (Exception ex)
        {
            return null;
        }


    }
}

