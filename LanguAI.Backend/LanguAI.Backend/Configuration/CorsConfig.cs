namespace LanguAI.Backend.Configuration;

public static class CorsConfig
{
    public const string POLICY_NAME = "CorsPolicy";

    public static void ConfigureCors(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(POLICY_NAME, builder =>
            {
                builder.WithOrigins("http://localhost:8100").SetIsOriginAllowedToAllowWildcardSubdomains();
                builder.AllowCredentials();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });
        });
    }

    public static IApplicationBuilder EnableCors(this IApplicationBuilder app)
    {
        return app.UseCors(POLICY_NAME);
    }
}
