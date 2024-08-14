using LanguAI.Backend.Core;

namespace LanguAI.Backend.Configuration;

public static class AppSettingsConfig
{
    public static void ConfigureAppSettings(this IConfiguration configuration)
    {
        var appSettings = configuration.GetSection("AppSettings");
        var settings = appSettings.Get<AppSettings>();

        EnvironmentSettings.RootUrl = settings.RootUrl;
        EnvironmentSettings.SecretKey = settings.SecretKey;
        EnvironmentSettings.ChatGPTApiKey = configuration["ChatGPTApiKey"];
    }
}