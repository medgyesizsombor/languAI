using Microsoft.OpenApi.Models;
using Unchase.Swashbuckle.AspNetCore.Extensions.Extensions;

namespace LanguAI.Backend.Configuration;

public static class SwaggerConfig
{
    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "LanguAI", Version = "v1", Description = "LanguAI API" });

            options.AddEnumsWithValuesFixFilters();
        });
    }
}
