using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.SelectorModel;

namespace LanguAI.Backend.Services;

public interface ILanguageService
{
    List<IntSelectorModel> GetAllLanguage(string languageCode);
}
public class LanguageService : BaseService, ILanguageService
{
    public LanguageService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Get all the languages as IntSelectorModel
    /// </summary>
    /// <param name="languageCode">The language of the mobile</param>
    /// <returns></returns>
    public List<IntSelectorModel> GetAllLanguage(string languageCode)
    {
        ArgumentException.ThrowIfNullOrEmpty(languageCode);

        return _context.Language
            .Where(l => !l.Code.Equals(languageCode))
            .Select(l => new IntSelectorModel
            {
                Id = l.Id,
                Name = languageCode == "hu" ? l.NameInHun : l.Name,
            })
            .OrderBy(l => l.Name)
            .ToList();
    }
}
