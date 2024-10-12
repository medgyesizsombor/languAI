using Azure.Core;
using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Learning;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface ILearningService
{
    int SaveLearning(SaveLearningRequestViewModel request);
    List<LearningViewModel> GetLearningsOfUsers(int userId);
    bool ChangeActiveLearning(int userId, int learningId);
}
public class LearningService : BaseService, ILearningService
{
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
            learning.LanguageId = request.LanguageId;
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
    public List<LearningViewModel> GetLearningsOfUsers(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        return _context.Learning
            .Include(l => l.Language)
            .Where(l => l.UserId == userId)
            .Select(l => new LearningViewModel
            {
                Id = l.Id,
                LanguageLevel = l.LanguageLevel,
                LanguageId = l.LanguageId,
                UserId = userId,
                IsActive = l.IsActive,
                LanguageCode = l.Language.Code,
                LanguageName = l.Language.Name,
                LanguageInHun = l.Language.NameInHun
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
