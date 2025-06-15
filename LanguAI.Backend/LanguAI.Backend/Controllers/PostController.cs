using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly IAuthenticationService _authenticationService;

    public PostController(IPostService postService, IAuthenticationService authenticationService)
    {
        _postService = postService;
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Get all the post
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetAllPost")]
    public ActionResult<List<PostViewModel>> GetAllPost()
    {
        return Ok(_postService.GetAllPost());
    }

    /// <summary>
    /// Get all the post with the filter
    /// </summary>
    /// <param name="request">Filter</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPosts")]
    public ActionResult<List<PostViewModel>> GetPosts([FromQuery] GetPostRequest request)
    {
        ArgumentNullException.ThrowIfNull(request);

        return Ok(_postService.GetPosts(request));
    }

    /// <summary>
    /// Get the post by Id
    /// </summary>
    /// <param name="postId">Id of the post</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostById")]
    public async Task<ActionResult<PostViewModel>> GetPostById(int postId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        return Ok(await _postService.GetPostById(postId, (int)currentUserId));
    }

    /// <summary>
    /// Save a post
    /// </summary>
    /// <param name="request">SavePostRequest</param>
    /// <returns></returns>
    [HttpPost(Name = "SavePost")]
    public ActionResult<bool> SavePost(SavePostRequest request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        if (currentUserId != request.UserId) throw new UnauthorizedAccessException();

        return Ok(_postService.SavePost(request, (int)currentUserId));
    }

    /// <summary>
    /// Get posts from forum
    /// </summary>
    /// <param name="userId">The current user's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostsFromForum")]
    public async Task<ActionResult<List<PostViewModel>>> GetPostsFromForumAsync(int userId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        if (currentUserId != userId) throw new UnauthorizedAccessException();

        return Ok(await _postService.GetPostsFromForum(userId));
    }

    [HttpPost(Name = "SoftDeletePost")]
    public ActionResult DeletePost(int postId, int userId)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        if (currentUserId != userId) throw new UnauthorizedAccessException();

        _postService.SoftDeletePost(postId, userId);

        return Ok();
    }
}