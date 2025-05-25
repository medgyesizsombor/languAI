using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Gameplay;
using LanguAI.Backend.ViewModels.Image;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IGameplayService
{
    bool SaveGameplay(SaveGameplayRequestViewModel request);
    Task<List<LeaderboardUserViewModel>> GetWeeklyLeaderboardAsync();
}

public class GameplayService : BaseService, IGameplayService
{
    private readonly IStorageService _storageService;
    public GameplayService(LanguAIDataContext context, IStorageService storageService) : base(context)
    {

        _storageService = storageService;
    }

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

    public async Task<List<LeaderboardUserViewModel>> GetWeeklyLeaderboardAsync()
    {
        var firstDayOfCurrentWeek = DateTime.Now.Date;
        while (firstDayOfCurrentWeek.DayOfWeek != DayOfWeek.Monday)
        {
            firstDayOfCurrentWeek = firstDayOfCurrentWeek.AddDays(-1);
        }

        var result = _context.Gameplay
            .Include(gp => gp.User)
            .Where(gp => gp.Date >= firstDayOfCurrentWeek)
            .GroupBy(g => new { g.UserId, g.User.Username, g.User.ImageId })
            .Select(g => new LeaderboardUserViewModel
            {
                UserId = g.Key.UserId,
                Username = g.Key.Username,
                ImageId = g.Key.ImageId,
                Points = g.Sum(x => x.Point)
            })
            .OrderByDescending(g => g.Points)
            .ToList();

        foreach (var res in result)
        {
            string pictureContentAsString = null;
            Image image = null;

            if (res.ImageId != null)
            {
                image = _context.Image.FirstOrDefault(i => i.Id == res.ImageId && !i.IsDeleted);
                var bytes = await _storageService.DownloadBlob((int)res.ImageId);
                pictureContentAsString = Convert.ToBase64String(bytes);
            }

            res.Image = string.IsNullOrEmpty(pictureContentAsString)
                ? null
                : new ImageViewModel
                {
                    ContentAsString = pictureContentAsString,
                    Id = res.ImageId,
                    Name = image.Name,
                    Type = image.Type
                };
        }

        return result;
    }
}