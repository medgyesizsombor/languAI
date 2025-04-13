using LanguAI.Backend.Core;

namespace LanguAI.Backend.Configuration;

public static class SettingsConfig
{
    public static void ConfigureSettings(this IConfiguration configuration)
    {
        ConfigureDatabase(configuration);
        ConfigureAppSettings(configuration);
        ConfigureChatGPT(configuration);
        ConfigureAzureStorage(configuration);
    }

    private static void ConfigureDatabase(this IConfiguration configuration)
    {

        EnvironmentSettings.ConnectionString = configuration.GetConnectionString("DefaultConnectionString");
    }

    private static void ConfigureAppSettings(this IConfiguration configuration)
    {
        var appSettings = configuration.GetSection("AppSettings");

        EnvironmentSettings.RootUrl = appSettings["RootUrl"];
        EnvironmentSettings.SecretKey = appSettings["SecretKey"];
    }

    private static void ConfigureChatGPT(this IConfiguration configuration)
    {
        EnvironmentSettings.ChatGPTApiKey = configuration["ChatGPTApiKey"];
        EnvironmentSettings.ChatGPTId = 2;
    }

    private static void ConfigureAzureStorage(this IConfiguration configuration)
    {
        var storageSettings = configuration.GetSection("StorageSettings");

        EnvironmentSettings.StorageConnectionString = storageSettings["ConnectionString"];
        EnvironmentSettings.StorageContainer = configuration["StorageConnectionString"];
    }
}