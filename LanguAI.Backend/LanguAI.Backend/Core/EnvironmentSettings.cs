﻿namespace LanguAI.Backend.Core;

public class EnvironmentSettings
{
    public static string ConnectionString { get; set; } = "Server=tcp:languai.database.windows.net,1433;Initial Catalog=LanguAIDB;Persist Security Info=False;User ID=languAIuser;Password=fbPKvi2aez36MEjV;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
}
