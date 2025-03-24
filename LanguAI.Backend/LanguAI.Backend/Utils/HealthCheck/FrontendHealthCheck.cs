using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace LanguAI.Backend.Utils.HealthCheck;

public class FrontendHealthCheck : IHealthCheck
{
    private readonly IConfiguration _configuration;
    public FrontendHealthCheck(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            var apiUri = new Uri(_configuration.GetValue<string>("AppSettings:FrontendUrl"));

            using var client = new HttpClient();
            var result = await client.GetAsync(apiUri, cancellationToken);

            if (result.IsSuccessStatusCode) return HealthCheckResult.Healthy($"Front-end is running.");

            return HealthCheckResult.Unhealthy("Frontend is down.");

        }
        catch (Exception e)
        {
            return HealthCheckResult.Unhealthy("Frontend is down.", e);
        }
    }
}
