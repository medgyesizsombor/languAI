using LanguAI.Backend.Core;
using LanguAI.Backend.Services;
using LanguAI.Backend.Utils.HealthCheck;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;

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

        services.AddSingleton<IHealthCheck, FrontendHealthCheck>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IRegistrationService, RegistrationService>();
        services.AddScoped<IPostService, PostService>();
        services.AddScoped<IFriendshipService, FriendshipService>();
        services.AddScoped<IChatGPTService, ChatGPTService>();
        services.AddScoped<ICardService, CardService>();
        services.AddScoped<IMessageService, MessageService>();
        services.AddScoped<IInteractionService, InteractionService>();
        services.AddScoped<ILearningService, LearningService>();
        services.AddScoped<ILanguageService, LanguageService>();
    }
}