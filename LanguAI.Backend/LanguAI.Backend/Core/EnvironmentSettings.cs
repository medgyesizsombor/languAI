namespace LanguAI.Backend.Core;

public class EnvironmentSettings
{
    public static string ConnectionString { get; set; } = "Server=tcp:languai-server.database.windows.net,1433;Initial Catalog=LanguAIDB;Persist Security Info=False;User ID=languai-admin;Password=fbPKvi2aez36MEjV;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    public static string SecretKey { get; set; }

    public static string RootUrl { get; set; }

    public static string ChatGPTApiKey { get; set; } = "sk-proj-iyHY5nGFuHa5eUuAF3tnT3BlbkFJGxM6QJWbkhztqZC8khwE";
}
