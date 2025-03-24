using LanguAI.Backend.Core;
using LanguAI.Backend.Utils.HealthCheck;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace LanguAI.Backend.Configuration;

public static class HealthCheckConfig
{
    public static void ConfigureHealthCheck(this IServiceCollection services)
    {
        services.AddHealthChecks()
            .AddCheck<FrontendHealthCheck>("Frontend", HealthStatus.Unhealthy)
            .AddCheck<DbContextHealthCheck<LanguAIDataContext>>("Database", HealthStatus.Unhealthy);
    }

    public static IApplicationBuilder EnableHealthCheck(this IApplicationBuilder app)
    {
        return app.UseHealthChecks("/health");
    }
}
