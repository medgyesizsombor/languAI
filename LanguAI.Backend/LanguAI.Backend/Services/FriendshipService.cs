using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Friendship;
using LanguAI.Backend.ViewModels.SelectorModel;

namespace LanguAI.Backend.Services;

public interface IFriendshipService
{
    bool RequestFriendship(int currentUserId, int recipientId);
    List<IntSelectorModel> GetFriendList(int userId);
    FriendshipViewModel GetFriendshipByUserId(int currentUserId, int otherUserId);
    FriendshipStatusEnum ReactFriendshipRequest(int recipientId, int requesterId, FriendshipStatusEnum friendshipStatus);
    bool ReceivingFriendshipRequest(int friendshipRequestId, int status);
    int ChangeFriendshipStatus(int oldStatus, int newStatus);
    bool CreateFriendshipWithChatGPT(int userId);

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
    public bool RequestFriendship(int currentUserId, int recipientId)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(recipientId);

        try
        {
            User requester = _context.User
                .Where(u => u.Id == currentUserId && u.IsActive)
                .FirstOrDefault();
            User recipient = _context.User
                .Where(u => u.Id == recipientId && u.IsActive)
                .FirstOrDefault();

            bool isExistingFriendship = _context.Friendship
                .Any(f => (f.RequesterId == currentUserId
                                && f.RecipientId == recipientId)
                            || (f.RequesterId == recipientId
                                && f.RecipientId == currentUserId));

            if (requester == null || recipient == null || isExistingFriendship)
            {
                return false;
            }

            Friendship friendship = new Friendship
            {
                RecipientId = recipientId,
                RequesterId = currentUserId,
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
    /// Get friendlist by user Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    public List<IntSelectorModel> GetFriendList(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        return _context.Friendship.Where(f => f.RequesterId == userId || f.RecipientId == userId).Select(f => new IntSelectorModel
        {
            Id = f.RequesterId == userId ? f.RequesterId : f.RecipientId,
            Name = f.RequesterId == userId ? f.Requester.Username : f.Recipient.Username
        }).ToList();
    }

    /// <summary>
    /// Get Friendship by user's Id
    /// </summary>
    /// <param name="currentUserId">Current user's Id</param>
    /// <param name="otherUserId">Current other user's Id</param>
    /// <returns></returns>
    public FriendshipViewModel GetFriendshipByUserId(int currentUserId, int otherUserId)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(otherUserId);

        FriendshipViewModel friendship = _context.Friendship
            .Where(f => ((f.RequesterId == currentUserId
                            && f.RecipientId == otherUserId)
                        || (f.RequesterId == otherUserId
                            && f.RecipientId == currentUserId))
                    && f.Status != (int)FriendshipStatusEnum.Deleted)
            .Select(f => new FriendshipViewModel
            {
                RecipientId = f.RecipientId,
                RequesterId = f.RequesterId,
                Status = f.Status,
                IsCloseFriendship = f.IsCloseFriendship
            })
            .FirstOrDefault();


        return friendship;
    }

    /// <summary>
    /// React the friendship request
    /// </summary>
    /// <param name="recipientId">Id of the friendship request Recipient</param>
    /// <param name="requesterId">Id of the friendship requester</param>
    /// <param name="friendshipStatus">Reacted friendship status</param>
    /// <returns></returns>
    public FriendshipStatusEnum ReactFriendshipRequest(int currentUserId, int requesterId, FriendshipStatusEnum friendshipStatus)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(requesterId);
        ArgumentNullException.ThrowIfNull(friendshipStatus);

        try
        {
            User recipient = _context.User
                .Where(u => u.Id == currentUserId && u.IsActive)
                .FirstOrDefault();
            User requester = _context.User
                .Where(u => u.Id == requesterId && u.IsActive)
                .FirstOrDefault();

            Friendship friendship = _context.Friendship
                .FirstOrDefault(f => f.RequesterId == requesterId
                    && f.RecipientId == currentUserId
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
    /// Create friendship with ChatGPT
    /// </summary>
    /// <param name="userId">Registered user's Id</param>
    /// <returns></returns>
    public bool CreateFriendshipWithChatGPT(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        try
        {
            var isFriendshipAlreadyCreated = _context.Friendship.Any(f => f.RequesterId == userId && f.RecipientId == EnvironmentSettings.ChatGPTId);

            if (isFriendshipAlreadyCreated)
            {
                return false;
            }

            Friendship friendship = new Friendship
            {
                RequesterId = userId,
                RecipientId = EnvironmentSettings.ChatGPTId,
                Status = (int)FriendshipStatusEnum.Accepted
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
}