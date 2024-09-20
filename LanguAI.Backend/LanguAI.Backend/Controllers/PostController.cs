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
    private readonly ILogger<UserController> _logger;

    public PostController(ILogger<UserController> logger, IPostService postService, IAuthenticationService authenticationService)
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
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get the post by Id
    /// </summary>
    /// <param name="postId">Id of the post</param>
    /// <returns></returns>
    [HttpGet(Name = "GetPostById")]
    public ActionResult<PostViewModel> GetPostById(int postId)
    {
        ArgumentNullException.ThrowIfNull(postId);

        try
        {
            return Ok(_postService.GetPostById(postId));
        }
        catch (Exception e)
        {
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

        if (currentUserId != request.UserId)
        {
            throw new UnauthorizedAccessException();
        }

        try
        {
            return Ok(_postService.SavePost(request, (int)currentUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}