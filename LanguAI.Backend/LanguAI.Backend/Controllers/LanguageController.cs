using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.SelectorModel;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class LanguageController : Controller
{
    private readonly ILanguageService _languageService;
    public LanguageController(ILanguageService languageService)
    {
        _languageService = languageService;
    }

    /// <summary>
    /// Get all the languages as IntSelectorModel
    /// </summary>
    /// <param name="languageCode">The language of the mobile</param>
    /// <returns></returns>
    [HttpGet(Name = "GetAllLanguage")]
    public ActionResult<List<IntSelectorModel>> GetAllLanguage(string languageCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(languageCode);

        return Ok(_languageService.GetAllLanguage(languageCode));
    }

}
