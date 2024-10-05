using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Interaction;

namespace LanguAI.Backend.Services;

public interface IInteractionService
{
    bool SaveInteraction(SaveInteractionRequestViewModel request);
    bool Dislike(DislikeRequestViewModel request);
    bool DeleteComment(DeleteCommentRequestViewModel request);
}
public class InteractionService : BaseService, IInteractionService
{
    public InteractionService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Save Interaction
    /// </summary>
    /// <param name="request">Interaction to be saved</param>
    /// <returns></returns>
    public bool SaveInteraction(SaveInteractionRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        bool isEdit = false;

        Interaction interaction;

        if (request.Id != null)
        {
            isEdit = true;
            interaction = _context.Interaction.FirstOrDefault(i => i.Id == request.Id && i.InteractionType == request.InteractionType && i.IsDeleted == false);

            if (interaction == null)
            {
                return false;
            }
        }
        else
        {
            var existingInteraction = _context.Interaction.Any(i => i.InteractionType == InteractionEnum.Like
                && i.PostId == request.PostId
                && i.UserId == request.UserId
                && i.ParentInteractionId == request.ParentInteractionId
                && i.IsDeleted == false);

            if (existingInteraction) return false;

            interaction = new Interaction();
        }

        interaction.PostId = request.PostId;
        interaction.ParentInteractionId = request.ParentInteractionId;
        interaction.UserId = request.UserId;
        interaction.Content = request.Content;
        interaction.Created = DateTime.Now;
        interaction.InteractionType = request.InteractionType;

        if (!isEdit)
        {
            _context.Interaction.Add(interaction);
        }

        _context.SaveChanges();

        return true;
    }

    /// <summary>
    /// Delete interaction
    /// </summary>
    /// <param name="request">Interaction to be deleted</param>
    /// <returns></returns>
    public bool Dislike(DislikeRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        var like = _context.Interaction
            .FirstOrDefault(i => i.UserId == request.UserId
                && i.PostId == request.PostId
                && i.ParentInteractionId == request.ParentInteractionId
                && i.InteractionType == InteractionEnum.Like
                && i.IsDeleted == false);

        ArgumentNullException.ThrowIfNull(like);

        like.IsDeleted = true;

        _context.SaveChanges();

        return true;
    }

    /// <summary>
    /// Delete Comment
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public bool DeleteComment(DeleteCommentRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        var comment = _context.Interaction
            .FirstOrDefault(i => i.UserId == request.UserId
                && i.Id == request.Id);

        ArgumentNullException.ThrowIfNull(comment);

        comment.IsDeleted = true;

        _context.SaveChanges();

        return true;
    }
}
