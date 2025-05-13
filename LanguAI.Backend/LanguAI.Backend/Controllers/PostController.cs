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
    private readonly ILogger _logger;

    public PostController(ILogger<PostController> logger, IPostService postService, IAuthenticationService authenticationService)
    {
        _logger = logger;
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
        try
        {
            return Ok(_postService.GetAllPost());
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
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
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_postService.GetPosts(request));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
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

        try
        {
            return Ok(await _postService.GetPostById(postId, (int)currentUserId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
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
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        if (currentUserId != request.UserId) throw new UnauthorizedAccessException();

        try
        {
            return Ok(_postService.SavePost(request, (int)currentUserId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
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

        try
        {
            return Ok(await _postService.GetPostsFromForum(userId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }
}