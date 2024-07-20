//using LanguAI.Backend.Configuration;
//using LanguAI.Backend.Core;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.EntityFrameworkCore;

//namespace LanguAI;

//public class Startup
//{
//    public Startup(IConfiguration configuration, IWebHostEnvironment env)
//    {
//        configuration.ConfigureAppSettings();
//    }

//    public void ConfigureServices(IServiceCollection services)
//    {
//        services.ConfigureDependencyInjection();

//        services.ConfigureCors();

//        services.AddMvc();
//    }

//    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, LanguAIDataContext languAIDataContext, IConfiguration config)
//    {
//        if (env.IsDevelopment())
//        {
//            app.UseDeveloperExceptionPage();
//        }
//        else
//        {
//            app.UseHsts();
//        }

//        app.EnableCors();

//        //app.UseMiddleware<GlobalExceptionMiddleware>();

//        app.UseRouting();

//        app.UseAuthentication();

//        app.UseAuthorization();

//        ////
//        //// Automatic database migration on startup
//        ////
//        //languAIDataContext.Database.Migrate();
//    }
//}