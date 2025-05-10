using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Learning;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface ILearningService
{
    int SaveLearning(SaveLearningRequestViewModel request);
    List<LearningViewModel> GetLearningsOfUser(int userId);
    bool ChangeActiveLearning(int userId, int learningId);
    LearningViewModel GetCurrentLearningOfUser(int userId);
}
public class LearningService : BaseService, ILearningService
{
    private readonly IAuthenticationService _authenticationService;
    public LearningService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Save Learning
    /// </summary>
    /// <param name="request">SaveLearningRequestViewModel</param>
    /// <returns></returns>
    public int SaveLearning(SaveLearningRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        using var transaction = _context.Database.BeginTransaction();

        try
        {

            bool isEdit = false;

            Learning learning;

            if (request.Id != null)
            {
                isEdit = true;
                learning = _context.Learning.FirstOrDefault(l => l.Id == request.Id);

                if (learning == null)
                {
                    return 0;
                }
            }
            else
            {
                learning = new Learning();
            }

            learning.LanguageLevel = request.LanguageLevel;
            learning.LearningLanguageId = request.LanguageId;
            learning.NativeLanguageId = request.NativeLanguageId;
            learning.UserId = request.UserId;
            learning.IsActive = true;

            if (!isEdit)
            {
                _context.Learning.Add(learning);
            }

            _context.SaveChanges();

            SetOtherLearningsInactive(request.UserId, learning.Id);

            transaction.Commit();

            return learning.Id;
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }

    /// <summary>
    /// Get user's all learnings
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    public List<LearningViewModel> GetLearningsOfUser(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        return _context.Learning
            .Include(l => l.LearningLanguage)
            .Where(l => l.UserId == userId)
            .Select(l => new LearningViewModel
            {
                Id = l.Id,
                LanguageLevel = l.LanguageLevel,
                LearningLanguageId = l.LearningLanguageId,
                UserId = userId,
                IsActive = l.IsActive,
                LearningLanguageCode = l.LearningLanguage.Code,
                LearningLanguageName = l.LearningLanguage.Name,
                LearningLanguageNameInHun = l.LearningLanguage.NameInHun,
                NativeLanguageCode = l.NativeLanguage.Code,
                NativeLanguageName = l.NativeLanguage.Name,
                NativeLanguageNameInHun = l.NativeLanguage.NameInHun
            })
            .ToList();
    }

    /// <summary>
    /// Change Active Learning by id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <param name="learningId">Id of the activable learning</param>
    /// <returns></returns>
    public bool ChangeActiveLearning(int userId, int learningId)
    {
        ArgumentNullException.ThrowIfNull(userId);
        ArgumentNullException.ThrowIfNull(learningId);

        using var transaction = _context.Database.BeginTransaction();

        try
        {
            var learning = _context.Learning
                .FirstOrDefault(l => l.UserId == userId
                    && l.Id == learningId);

            if (learning == null) return false;

            learning.IsActive = true;

            _context.SaveChanges();

            SetOtherLearningsInactive(userId, learning.Id);

            transaction.Commit();

            return true;
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }

    /// <summary>
    /// Get Current user's learning
    /// </summary>
    /// <param name="userId">Current user's id</param>
    /// <returns></returns>
    public LearningViewModel GetCurrentLearningOfUser(int userId)
    {
        var currentLearning = _context.Learning
            .Include(l => l.LearningLanguage)
            .Include(l => l.NativeLanguage)
            .FirstOrDefault(l => l.UserId == userId
                && l.IsActive);

        if (currentLearning == null) return null;

        return new LearningViewModel
        {
            Id = currentLearning.Id,
            LearningLanguageName = currentLearning.LearningLanguage.Name,
            NativeLanguageName = currentLearning.NativeLanguage.Name
        };
    }

    /// <summary>
    /// Set all the learnings to inactive except for the id from the parameter
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    private bool SetOtherLearningsInactive(int userId, int learningId)
    {
        ArgumentNullException.ThrowIfNull(userId);
        ArgumentNullException.ThrowIfNull(learningId);

        var activeLearnings = _context.Learning
            .Where(l => l.UserId == userId
                && l.IsActive
                && l.Id != learningId)
            .ToList();

        activeLearnings.ForEach(l =>
        {
            l.IsActive = false;
        });

        _context.SaveChanges();

        return true;
    }
}
