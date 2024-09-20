using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IPostService
{
    List<PostViewModel> GetAllPost();
    List<PostViewModel> GetPosts(GetPostRequest request);
    PostViewModel GetPostById(int id);
    bool SavePost(SavePostRequest request, int currentUserId);
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
                Created = p.Created
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
                Created = p.Created
            }).ToList();

        return postList;
    }

    /// <summary>
    /// Get post by id
    /// </summary>
    /// <param name="postId">postId</param>
    /// <returns></returns>
    public PostViewModel GetPostById(int postId)
    {
        PostViewModel postList = _context.Post.Include(p => p.User)
            .Where(p => p.Id == postId)
            .Select(p => new PostViewModel
            {
                Id = p.Id,
                Username = p.User.Username,
                Content = p.Content,
                Created = p.Created
            }).FirstOrDefault();

        if (postList == null) return null;

        return postList;
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

        if (!isEdit)
        {
            _context.Post.Add(post);
        }

        _context.SaveChanges();

        return true;
    }
}

