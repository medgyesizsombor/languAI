using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Enums;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Image;
using LanguAI.Backend.ViewModels.Interaction;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IPostService
{
    List<PostViewModel> GetAllPost();
    List<PostViewModel> GetPosts(GetPostRequest request);
    Task<PostViewModel> GetPostById(int postId, int currentUserId);
    bool SavePost(SavePostRequest request, int currentUserId);
    Task<List<PostViewModel>> GetPostsFromForum(int currentUserId);
    void SoftDeletePost(int postId, int userId);
}

public class PostService : BaseService, IPostService
{
    private readonly IStorageService _storageService;

    public PostService(LanguAIDataContext context, IStorageService storageService) : base(context)
    {
        _storageService = storageService;
    }

    /// <summary>
    /// Get all post
    /// </summary>
    /// <returns></returns>
    public List<PostViewModel> GetAllPost()
    {
        List<PostViewModel> postList = _context.Post.Include(p => p.User)
            .Where(p => p.IsDeleted == false)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Username = p.User.Username,
                Content = p.Content,
                Created = p.Created,
                Access = p.Access,
                UserId = p.UserId
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
            .Where(p => (string.IsNullOrEmpty(request.Username)
                    || request.Username == p.User.Username)
                && !p.IsDeleted)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Username = p.User.Username,
                Content = p.Content,
                Created = p.Created,
                Access = p.Access,
                UserId = p.UserId
            }).ToList();

        return postList;
    }

    /// <summary>
    /// Get post by id
    /// </summary>
    /// <param name="postId">postId</param>
    /// <returns></returns>
    public async Task<PostViewModel> GetPostById(int postId, int currentUserId)
    {
        var post = _context.Post
            .Include(p => p.User)
            .ThenInclude(u => u.Image)
            .Include(p => p.Interactions)
            .Where(p => p.Id == postId
                && !p.IsDeleted)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Access = p.Access,
                Created = p.Created,
                Content = p.Content,
                Username = p.User.Username,
                UserId = p.UserId,
                Liked = p.Interactions.Any(i => i.UserId == currentUserId && i.InteractionType == InteractionEnum.Like && !i.IsDeleted),
                NumberOfLikes = p.Interactions.Sum(i => (i.InteractionType == InteractionEnum.Like && !i.IsDeleted) ? 1 : 0),
                NumberOfComments = p.Interactions.Sum(i => (i.InteractionType == InteractionEnum.Comment && !i.IsDeleted) ? 1 : 0),
                Image = p.ImageId == null ? null : new ImageViewModel { Name = p.Image.Name, Type = p.Image.Type, Id = p.ImageId },
                UserProfilePicture = p.User.ImageId == null ? null : new ImageViewModel { Name = p.User.Image.Name, Type = p.User.Image.Type, Id = p.User.ImageId },
                Comments = p.Interactions.Where(i => i.InteractionType == InteractionEnum.Comment && !i.IsDeleted).Select(i => new CommentViewModel
                {
                    Id = i.Id,
                    Created = i.Created,
                    Liked = i.ChildInteractions.Any(ci => ci.ParentInteractionId == i.Id && !ci.IsDeleted && ci.UserId == currentUserId),
                    NumberOfLikes = i.ChildInteractions.Sum(ci => (ci.InteractionType == InteractionEnum.Like && !ci.IsDeleted) ? 1 : 0),
                    UserId = i.UserId,
                    Text = i.Content,
                    Username = i.User.Username
                })
                .OrderBy(p => p.Created)
                .ToList()
            })
            .FirstOrDefault();

        if (post.Image != null)
        {
            var bytes = await _storageService.DownloadBlob((int)post.Image.Id);
            post.Image.ContentAsString = Convert.ToBase64String(bytes);
        }

        if (post.UserProfilePicture != null)
        {
            var bytes = await _storageService.DownloadBlob((int)post.UserProfilePicture.Id);
            post.UserProfilePicture.ContentAsString = Convert.ToBase64String(bytes);
        }

        return post;
    }

    /// <summary>
    /// Save post
    /// </summary>
    /// <param name="request">The request</param>
    /// <returns></returns>
    public bool SavePost(SavePostRequest request, int currentUserId)
    {
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
        post.ImageId = request.ImageId ?? null;

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
    public async Task<List<PostViewModel>> GetPostsFromForum(int currentUserId)
    {
        var posts = _context.Post
            .Include(p => p.User)
            .Include(p => p.Interactions)
            .Include(p => p.Image)
            .Where(p => !p.IsDeleted
                && (p.UserId == currentUserId
                || (p.Access == AccessEnum.Public)
                || (p.Access == AccessEnum.Protected && (_context.Friendship
                                .Any(f => ((f.RequesterId == currentUserId && f.RecipientId == p.UserId)
                                    || (f.RecipientId == currentUserId && f.RequesterId == p.UserId)))))))
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Access = p.Access,
                Created = p.Created,
                Content = p.Content,
                Username = p.User.Username,
                UserId = p.UserId,
                Liked = p.Interactions.Any(i => i.UserId == currentUserId && i.InteractionType == InteractionEnum.Like && i.IsDeleted == false),
                NumberOfLikes = p.Interactions.Sum(i => (i.InteractionType == InteractionEnum.Like && !i.IsDeleted) ? 1 : 0),
                NumberOfComments = p.Interactions.Sum(i => (i.InteractionType == InteractionEnum.Comment && !i.IsDeleted) ? 1 : 0),
                Image = p.ImageId == null ? null : new ImageViewModel { Name = p.Image.Name, Type = p.Image.Type, Id = p.ImageId },
                UserProfilePicture = p.User.ImageId == null ? null : new ImageViewModel { Name = p.User.Image.Name, Type = p.User.Image.Type, Id = p.User.ImageId }
            })
            .OrderByDescending(p => p.Created)
            .ToList();

        foreach (var post in posts)
        {
            if (post.Image != null)
            {
                var bytes = await _storageService.DownloadBlob((int)post.Image.Id);
                post.Image.ContentAsString = Convert.ToBase64String(bytes);
            }

            if (post.UserProfilePicture != null)
            {
                var bytes = await _storageService.DownloadBlob((int)post.UserProfilePicture.Id);
                post.UserProfilePicture.ContentAsString = Convert.ToBase64String(bytes);
            }
        }

        return posts;
    }

    /// <summary>
    /// Soft delete post - isDeleted = true
    /// </summary>
    /// <param name="postId">Id of the post</param>
    /// <param name="userId">User's Id</param>
    public void SoftDeletePost(int postId, int userId)
    {
        var post = _context.Post.FirstOrDefault(p => p.Id == postId
            && p.UserId == userId
            && !p.IsDeleted);

        if (post == null) throw new ArgumentNullException();

        post.IsDeleted = true;
        _context.SaveChanges();
    }
}