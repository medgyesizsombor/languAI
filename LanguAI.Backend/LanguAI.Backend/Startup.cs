using LanguAI.Backend.Configuration;
using LanguAI.Backend.Core;
using LanguAI.Backend.Utils;
using Microsoft.EntityFrameworkCore;

namespace LanguAI;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        configuration.ConfigureSettings();
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        services.ConfigureDependencyInjection();

        services.AddDbContext<LanguAIDataContext>(options =>
            options.UseSqlServer(EnvironmentSettings.ConnectionString));

        services.ConfigureCors();

        services.ConfigureAuthentication();

        services.ConfigureHealthCheck();

        services.ConfigureSwagger();

        services.AddTransient<ExceptionMiddleware>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
        else
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.EnableCors();

        app.UseMiddleware<ExceptionMiddleware>();

        app.UseRouting();

        app.UseAuthentication();

        app.UseAuthorization();

        app.EnableHealthCheck();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();

            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Server is running.");
            });
        });
    }
}