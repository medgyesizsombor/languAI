//using Microsoft.AspNetCore;

//namespace LanguAI;

//public class Program
//{
//    public static void Main(string[] args)
//    {
//        CreateWebHostBuilder(args).Build().Run();
//    }

//    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
//        WebHost.CreateDefaultBuilder(args)
//            .UseStartup<Startup>();
//}
using LanguAI.Backend.Core;
using LanguAI.Backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<LanguAIDataContext>(options => options.UseSqlServer(EnvironmentSettings.ConnectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:8100").SetIsOriginAllowedToAllowWildcardSubdomains();
        builder.AllowCredentials();
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IRegistrationService, RegistrationService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<IFriendshipService, FriendshipService>();
builder.Services.AddScoped<IChatGPTService, ChatGPTService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var appSettings = app.Configuration;
var settings = appSettings.Get<AppSettings>();

EnvironmentSettings.RootUrl = settings.RootUrl;
EnvironmentSettings.SecretKey = "IPQVrG6k29ISDb3Q5EXcIUq99b0oEtZs8VwkMgCMrdPNGT4eOMom9X6yghqlYzxy";
EnvironmentSettings.ChatGPTApiKey = "sk-proj-R2faPHk3WjVzaDlFZagzT3BlbkFJ61X8rDYpU9RPrRdBxSzN";

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

app.Run();
