using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.Utils;
using LanguAI.Backend.ViewModels.Registration;
using LanguAI.Backend.ViewModels.User;

namespace LanguAI.Backend.Services;

public interface IRegistrationService
{
    bool Register(RegisterRequestViewModel request);
}

public class RegistrationService : BaseService, IRegistrationService
{

    public RegistrationService(LanguAIDataContext context) : base(context)
    {
    }

    public bool Register(RegisterRequestViewModel request)
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
                Country = request.Country,
                Email = request.Email
            };

            _context.User.Add(user);
            _context.SaveChanges();

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }


    }
}

