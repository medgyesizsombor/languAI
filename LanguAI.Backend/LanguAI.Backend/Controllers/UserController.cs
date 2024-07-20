using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger, IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet(Name = "GetAllUsers")]
    public ActionResult<List<UserViewModel>> GetAllUsers()
    {
        return _userService.GetAllUsers();
    }

    [HttpGet(Name = "GetUserById")]
    public ActionResult<UserViewModel> GetUserById(int userId)
    {
        return _userService.GetUserById(userId);
    }

    [HttpPost(Name = "EditUser")]
    public ActionResult<bool> SaveUser(UserViewModel request)
    {
        bool success = false;

        success = _userService.EditUser(request);

        return success;
    }
}