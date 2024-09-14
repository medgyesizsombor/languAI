using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.SelectorModel;

namespace LanguAI.Backend.Services;

public interface IFriendshipService
{
    bool RequestFriendship(int requesterId, int recipientId);
    bool ReceivingFriendshipRequest(int friendshipRequestId, int status);
    int ChangeFriendshipStatus(int oldStatus, int newStatus);
    List<IntSelectorModel> GetFriendList(int userId);
    FriendshipStatusEnum ReactFriendshipRequest(int recipientId, int requesterId, FriendshipStatusEnum friendshipStatus);
}

public class FriendshipService : BaseService, IFriendshipService
{

    public FriendshipService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Request a friendship
    /// </summary>
    /// <param name="requesterId">Current user's Id</param>
    /// <param name="recipientId">Recipient's Id</param>
    /// <returns></returns>
    public bool RequestFriendship(int requesterId, int recipientId)
    {
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(recipientId);

        try
        {
            User requester = _context.User.Where(u => u.Id == requesterId).FirstOrDefault();
            User recipient = _context.User.Where(u => u.Id == recipientId).FirstOrDefault();

            bool isExistingFriendship = _context.Friendship
                .Any(f => (f.RequesterId == requesterId
                                && f.RecipientId == recipientId)
                            || (f.RequesterId == recipientId
                                && f.RecipientId == requesterId));

            if (requester == null || recipient == null || isExistingFriendship)
            {
                return false;
            }

            Friendship friendship = new Friendship
            {
                RecipientId = recipientId,
                RequesterId = requesterId,
                Created = DateTime.Now
            };

            _context.Friendship.Add(friendship);
            _context.SaveChanges();

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>
    /// Receiving the friendship request
    /// </summary>
    /// <param name="friendshipId">Id of the Friendship</param>
    /// <param name="status">Status of friendship</param>
    /// <returns></returns>
    public bool ReceivingFriendshipRequest(int friendshipId, int status)
    {
        Friendship friendship = _context.Friendship.FirstOrDefault(f => f.Id == friendshipId);

        try
        {
            if (friendship == null)
            {
                return false;
            }

            friendship.Status = status;
            _context.SaveChanges();

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public int ChangeFriendshipStatus(int oldStatus, int newStatus)
    {
        return 0;
    }

    /// <summary>
    /// Get friendlist by user Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    public List<IntSelectorModel> GetFriendList(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var asd = _context.Friendship.Where(f => f.RequesterId == userId || f.RecipientId == userId).Select(f => new IntSelectorModel
        {
            Id = f.RequesterId == userId ? f.RequesterId : f.RecipientId,
            Name = f.RequesterId == userId ? f.Requester.Username : f.Recipient.Username
        }).ToList();

        return asd;
    }

    /// <summary>
    /// React the friendship request
    /// </summary>
    /// <param name="recipientId">Id of the friendship request Recipient</param>
    /// <param name="requesterId">Id of the friendship requester</param>
    /// <param name="friendshipStatus">Reacted friendship status</param>
    /// <returns></returns>
    public FriendshipStatusEnum ReactFriendshipRequest(int recipientId, int requesterId, FriendshipStatusEnum friendshipStatus)
    {
        ArgumentNullException.ThrowIfNull(recipientId);
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(friendshipStatus);

        try
        {
            User recipient = _context.User.Where(u => u.Id == recipientId).FirstOrDefault();
            User requester = _context.User.Where(u => u.Id == requesterId).FirstOrDefault();

            Friendship friendship = _context.Friendship
                .FirstOrDefault(f => f.RequesterId == requesterId
                    && f.RecipientId == recipientId
                    && f.Status == (int)FriendshipStatusEnum.Requested);

            if (requester == null || recipient == null || friendship == null)
            {
                return FriendshipStatusEnum.Requested;
            }

            friendship.Status = (int)friendshipStatus;

            _context.SaveChanges();
            return friendshipStatus;
        }
        catch (Exception)
        {
            return FriendshipStatusEnum.Requested;
        }
    }
}