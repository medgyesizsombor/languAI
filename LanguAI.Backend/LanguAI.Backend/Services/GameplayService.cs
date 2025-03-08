using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Gameplay;

namespace LanguAI.Backend.Services;

public interface IGameplayService
{
    bool SaveGameplay(SaveGameplayRequestViewModel request);
}

public class GameplayService : BaseService, IGameplayService
{
    public GameplayService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Save gameplay
    /// </summary>
    /// <param name="request">Save gameplay request</param>
    /// <returns></returns>
    public bool SaveGameplay(SaveGameplayRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        Gameplay gameplay = new Gameplay
        {
            Date = DateTime.Now,
            Point = request.Point,
            UserId = request.UserId,
        };

        var previousGameplay = _context.Gameplay
            .Where(g => g.UserId == request.UserId)
            .OrderByDescending(g => g.Date).FirstOrDefault();

        if (previousGameplay == null || previousGameplay.Date.AddDays(1).Date == DateTime.Now.Date)
        {
            var user = _context.User.FirstOrDefault(u => u.Id == request.UserId);

            user.Streak += 1;
        }
        _context.Gameplay.Add(gameplay);

        _context.SaveChanges();

        return true;
    }
}