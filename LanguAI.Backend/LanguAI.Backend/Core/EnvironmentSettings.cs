namespace LanguAI.Backend.Core;

public class EnvironmentSettings
{
    public static string ConnectionString { get; set; } = "Server=tcp:languai-sql-server.database.windows.net,1433;Initial Catalog=languai-db;Persist Security Info=False;User ID=languai-admin;Password=RXd0SgnB!VAttHtcmCrAZ8N1KSvcFzcq;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    public static string SecretKey { get; set; }

    public static string RootUrl { get; set; }

    public static string ChatGPTApiKey { get; set; }

    public static int ChatGPTId { get; set; }
}
