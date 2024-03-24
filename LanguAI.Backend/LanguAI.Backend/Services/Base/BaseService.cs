using LanguAI.Backend.Core;

namespace LanguAI.Backend.Services.Base;

public abstract class BaseService
{
    /// <summary>
    /// Adatbázis context
    /// </summary>
    protected readonly LanguAIDataContext _context;

    /// <summary>
    /// Konstruktor
    /// </summary>
    protected BaseService(LanguAIDataContext context)
    {
        _context = context;
    }
}

