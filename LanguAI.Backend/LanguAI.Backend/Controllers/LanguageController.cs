using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.SelectorModel;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class LanguageController : Controller
{
    private readonly ILanguageService _languageService;

    private readonly ILogger<UserController> _logger;
    public LanguageController(ILogger<UserController> logger, ILanguageService languageService)
    {
        _logger = logger;
        _languageService = languageService;
    }

    /// <summary>
    /// Get all the languages as IntSelectorModel
    /// </summary>
    /// <param name="languageCode">The language of the mobile</param>
    /// <returns></returns>
    [HttpGet(Name = "GetAllLanguage")]
    public List<IntSelectorModel> GetAllLanguage(string languageCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(languageCode);

        try
        {
            return _languageService.GetAllLanguage(languageCode);
        }
        catch (Exception)
        {
            throw;
        }
    }

}
