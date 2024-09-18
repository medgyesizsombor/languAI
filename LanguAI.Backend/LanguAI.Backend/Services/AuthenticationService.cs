using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.Utils;
using LanguAI.Backend.ViewModels.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LanguAI.Backend.Services;

public interface IAuthenticationService
{
    string Authenticate(AuthenticateRequestViewModel request);
}

public class AuthenticationService : BaseService, IAuthenticationService
{
    public AuthenticationService(LanguAIDataContext context) : base(context) { }

    public string Authenticate(AuthenticateRequestViewModel request)
    {
        try
        {
            ArgumentNullException.ThrowIfNull(request);

            User user = _context.User
                .Where(u => u.Username == request.Username && u.IsActive)
                .FirstOrDefault();

            if (user == null) return null;

            var verified = Hasher.Verify(request.Password, user.PasswordHash);

            if (!verified) return null;

            return CreateToken(user);
        }
        catch (Exception)
        {
            return null;
        }
    }

    private static string CreateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var secretKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(EnvironmentSettings.SecretKey));
        var securityAlgorithm = SecurityAlgorithms.HmacSha256Signature;

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Id.ToString())
            }),
            SigningCredentials = new SigningCredentials(secretKey, securityAlgorithm)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}

