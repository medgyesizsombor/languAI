using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;

    private readonly ILogger<UserController> _logger;

    public PostController(ILogger<UserController> logger, IPostService postService)
    {
        _logger = logger;
        _postService = postService;
    }

    /// <summary>
    /// Get all the post
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetAllPost")]
    public ActionResult<List<PostViewModel>> GetAllPost()
    {
        try
        {
            return _postService.GetAllPost();
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Get all the post with the filter
    /// </summary>
    /// <param name="request">Filter</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPosts")]
    public ActionResult<List<PostViewModel>> GetPosts([FromQuery] GetPostRequest request)
    {
        try
        {
            if (request == null) return null;

            return _postService.GetPosts(request);
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Get the post by Id
    /// </summary>
    /// <param name="id">Id of the post</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostById")]
    public ActionResult<PostViewModel> GetPostById(int id)
    {
        try
        {
            return _postService.GetPostById(id);
        }
        catch (Exception)
        {
            return null;
        }
    }

    /// <summary>
    /// Save a post
    /// </summary>
    /// <param name="request">SavePostRequest</param>
    /// <returns></returns>
    [HttpPost(Name = "SavePost")]
    public ActionResult<bool> SavePost(SavePostRequest request)
    {
        try
        {
            return _postService.SavePost(request);
        }
        catch (Exception)
        {
            return false;
        }
    }
}