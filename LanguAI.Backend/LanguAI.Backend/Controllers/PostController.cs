using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Post;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PostController
{
    private readonly IPostService _postService;

    public PostController(IPostService postService)
    {
        _postService = postService;
    }

    [HttpGet]
    public ActionResult<List<PostViewModel>> GetAllPosts(GetPostRequest request)
    {
        try
        {
            if (request == null) return null;

            return _postService.GetAllPost(request);
        }
        catch (Exception)
        {
            return null;
        }
    }

    [HttpGet]
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
}

