using LanguAI.Backend.Core;
using LanguAI.Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Configuration;

public static class DependencyInjectionConfig
{
    public static void ConfigureDependencyInjection(this IServiceCollection services)
    {
        services.AddDbContext<LanguAIDataContext>(options => options.UseSqlServer(EnvironmentSettings.ConnectionString));

        services.AddLogging(config =>
        {
            config.AddDebug();
            config.AddConsole();
        });

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IRegistrationService, RegistrationService>();
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<IFriendshipService, FriendshipService>();
        services.AddScoped<IChatGPTService, ChatGPTService>();
        services.AddScoped<ICardService, CardService>();
        services.AddScoped<IMessageService, MessageService>();
    }
}