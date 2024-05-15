using LanguAI.Backend.Core;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Services;

public interface IPostService
{
    List<PostViewModel> GetAllPost(GetPostRequest request);
    PostViewModel GetPostById(int id);
}

public class PostService : BaseService, IPostService
{
    public PostService(LanguAIDataContext context) : base(context) { }

    /// <summary>
    /// Get all post
    /// </summary>
    /// <param name="request">Filter</param>
    /// <returns></returns>
    public List<PostViewModel> GetAllPost(GetPostRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);

        List<PostViewModel> postList = _context.Post.Include(p => p.User)
            .Where(p => request.Username == p.User.Username)
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
    /// <param name="id">Id</param>
    /// <returns></returns>
    public PostViewModel GetPostById(int id)
    {
        PostViewModel postList = _context.Post.Include(p => p.User)
            .Where(p => p.Id == id)
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
}

