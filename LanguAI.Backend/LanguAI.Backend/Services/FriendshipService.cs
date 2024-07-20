using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;

namespace LanguAI.Backend.Services;

public interface IFriendshipService
{
    bool RequestFriendship(int requesterId, int receiverId);
    bool ReceivingFriendshipRequest(int friendshipRequestId, int status);
    int ChangeFriendshipStatus(int previousStatus, int newStatus);
}

public class FriendshipService : BaseService, IFriendshipService
{

    public FriendshipService(LanguAIDataContext context) : base(context)
    {
    }

    /// <summary>
    /// Request a friendship
    /// </summary>
    /// <param name="requesterId"></param>
    /// <param name="receiverId"></param>
    /// <returns></returns>
    public bool RequestFriendship(int requesterId, int receiverId)
    {
        try
        {
            User requester = _context.User.Where(u => u.Id == requesterId).FirstOrDefault();
            User receiver = _context.User.Where(u => u.Id == receiverId).FirstOrDefault();

            if (requester == null || receiver == null)
            {
                return false;
            }

            FriendshipRequest friendship = new FriendshipRequest
            {
                ReceiverId = receiverId,
                RequesterId = requesterId,
                RequestedAt = DateTime.Now
            };

            _context.FriendshipRequest.Add(friendship);
            _context.SaveChanges();

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    /// <summary>
    /// Receiving the friendship request
    /// </summary>
    /// <param name="isAccepting"></param>
    /// <returns></returns>
    public bool ReceivingFriendshipRequest(int friendshipRequestId, int status)
    {
        FriendshipRequest friendshipRequest = _context.FriendshipRequest.FirstOrDefault(f => f.Id == friendshipRequestId);

        try
        {
            if (friendshipRequest == null)
            {
                return false;
            }

            friendshipRequest.Status = status;
            _context.SaveChanges();

            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public int ChangeFriendshipStatus(int previousStatus, int newStatus)
    {
        return 0;
    }
}