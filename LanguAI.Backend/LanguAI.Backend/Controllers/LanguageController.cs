using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.SelectorModel;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class LanguageController : Controller
{
    private readonly ILanguageService _languageService;

    private readonly ILogger _logger;
    public LanguageController(ILogger<LanguageController> logger, ILanguageService languageService)
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
    public ActionResult<List<IntSelectorModel>> GetAllLanguage(string languageCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(languageCode);

        try
        {
            return Ok(_languageService.GetAllLanguage(languageCode));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

}
