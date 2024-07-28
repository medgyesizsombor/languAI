using LanguAI.Backend.Configuration;
using LanguAI.Backend.Core;
using Microsoft.EntityFrameworkCore;

namespace LanguAI;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        configuration.ConfigureAppSettings();
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        services.AddDbContext<LanguAIDataContext>(options =>
            options.UseSqlServer(EnvironmentSettings.ConnectionString));

        services.ConfigureDependencyInjection();

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen();

        services.ConfigureCors();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.EnableCors();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}