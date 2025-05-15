using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Gameplay;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IGameplayService
{
    bool SaveGameplay(SaveGameplayRequestViewModel request);
    List<LeaderboardUserViewModel> GetWeeklyLeaderboard();
}

public class GameplayService : BaseService, IGameplayService
{
    public GameplayService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Save gameplay
    /// </summary>
    /// <param name="request">Save gameplay request</param>
    /// <returns>Has streak changed</returns>
    public bool SaveGameplay(SaveGameplayRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        var hasStreakChanged = false;

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

            hasStreakChanged = true;
        }
        _context.Gameplay.Add(gameplay);

        _context.SaveChanges();

        return hasStreakChanged;
    }

    public List<LeaderboardUserViewModel> GetWeeklyLeaderboard()
    {
        var firstDayOfCurrentWeek = DateTime.Now.Date;
        while (firstDayOfCurrentWeek.DayOfWeek != DayOfWeek.Monday)
        {
            firstDayOfCurrentWeek = firstDayOfCurrentWeek.AddDays(-1);
        }

        return _context.Gameplay
            .Include(gp => gp.User)
            .Where(gp => gp.Date >= firstDayOfCurrentWeek)
            .GroupBy(g => new { g.UserId, g.User.Username })
            .Select(g => new LeaderboardUserViewModel
            {
                UserId = g.Key.UserId,
                Username = g.Key.Username,
                Points = g.Sum(x => x.Point)
            })
            .OrderByDescending(g => g.Points)
            .ToList();
    }
}