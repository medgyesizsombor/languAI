using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Interaction;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IPostService
{
    List<PostViewModel> GetAllPost();
    List<PostViewModel> GetPosts(GetPostRequest request);
    PostViewModel GetPostById(int postId, int currentUserId);
    bool SavePost(SavePostRequest request, int currentUserId);
    List<PostViewModel> GetPostsFromForum(int currentUserId);
}

public class PostService : BaseService, IPostService
{
    public PostService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Get all post
    /// </summary>
    /// <param name="request">Filter</param>
    /// <returns></returns>
    public List<PostViewModel> GetAllPost()
    {
        List<PostViewModel> postList = _context.Post.Include(p => p.User)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Username = p.User.Username,
                Content = p.Content,
                Created = p.Created,
                Access = p.Access
            }).ToList();

        return postList;
    }

    /// <summary>
    /// Get all post
    /// </summary>
    /// <param name="request">Filter</param>
    /// <returns></returns>
    public List<PostViewModel> GetPosts(GetPostRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);

        List<PostViewModel> postList = _context.Post.Include(p => p.User)
            .Where(p => string.IsNullOrEmpty(request.Username) || request.Username == p.User.Username
                )
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Username = p.User.Username,
                Content = p.Content,
                Created = p.Created,
                Access = p.Access
            }).ToList();

        return postList;
    }

    /// <summary>
    /// Get post by id
    /// </summary>
    /// <param name="postId">postId</param>
    /// <returns></returns>
    public PostViewModel GetPostById(int postId, int currentUserId)
    {
        ArgumentNullException.ThrowIfNull(postId);

        return _context.Post
            .Include(p => p.User)
            .Include(p => p.Interactions)
            .Where(p => p.Id == postId)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Access = p.Access,
                Created = p.Created,
                Content = p.Content,
                Username = p.User.Username,
                Liked = p.Interactions.Any(i => i.UserId == currentUserId && i.InteractionType == InteractionEnum.Like && !i.IsDeleted),
                NumberOfLikes = p.Interactions.Sum(i => (i.InteractionType == InteractionEnum.Like && !i.IsDeleted) ? 1 : 0),
                NumberOfComments = p.Interactions.Sum(i => (i.InteractionType == InteractionEnum.Comment && !i.IsDeleted) ? 1 : 0),
                Comments = p.Interactions.Where(i => i.InteractionType == InteractionEnum.Comment && !i.IsDeleted).Select(i => new CommentViewModel
                {
                    Id = i.Id,
                    Created = i.Created,
                    Liked = i.ChildInteractions.Any(ci => ci.ParentInteractionId == i.Id && !ci.IsDeleted && ci.UserId == currentUserId),
                    NumberOfLikes = i.ChildInteractions.Sum(ci => (ci.InteractionType == InteractionEnum.Like && !ci.IsDeleted) ? 1 : 0),
                    UserId = i.UserId,
                    Text = i.Content,
                    Username = i.User.Username
                }).ToList()
            })
            .FirstOrDefault();
    }

    /// <summary>
    /// Save post
    /// </summary>
    /// <param name="request">The request</param>
    /// <returns></returns>
    public bool SavePost(SavePostRequest request, int currentUserId)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        bool isEdit = false;

        Post post;

        if (request.Id != null)
        {
            isEdit = true;
            post = _context.Post.FirstOrDefault(p => p.Id == request.Id);

            if (post == null)
            {
                return false;
            }
        }
        else
        {
            post = new Post();
        }

        post.Content = request.Content;
        post.Created = request.Created;
        post.UserId = currentUserId;
        post.Access = request.Access;

        if (!isEdit)
        {
            _context.Post.Add(post);
        }

        _context.SaveChanges();

        return true;
    }

    /// <summary>
    /// Get posts from forum
    /// </summary>
    /// <param name="currentUserId">The current user's Id</param>
    /// <returns></returns>
    public List<PostViewModel> GetPostsFromForum(int currentUserId)
    {
        ArgumentNullException.ThrowIfNull(currentUserId);

        return _context.Post
            .Include(p => p.User)
            .Include(p => p.Interactions)
            .Where(p => p.UserId == currentUserId
                || (p.Access == AccessEnum.Public)
                || (p.Access == AccessEnum.Protected && (_context.Friendship
                                .Any(f => ((f.RequesterId == currentUserId && f.RecipientId == p.UserId)
                                    || (f.RecipientId == currentUserId && f.RequesterId == p.UserId))))))
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Access = p.Access,
                Created = p.Created,
                Content = p.Content,
                Username = p.User.Username,
                Liked = p.Interactions.Any(i => i.UserId == currentUserId && i.InteractionType == InteractionEnum.Like && i.IsDeleted == false),
                NumberOfLikes = p.Interactions.Sum(i => i.InteractionType == InteractionEnum.Like ? 1 : 0),
                NumberOfComments = p.Interactions.Sum(i => i.InteractionType == InteractionEnum.Comment ? 1 : 0)
            })
            .ToList();
    }
}