using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly IUserServices _userServices;

    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger, IUserServices userServices)
    {
        _logger = logger;
        _userServices = userServices;
    }

    [HttpGet(Name = "GetAllUsers")]
    public ActionResult<List<UserViewModel>> GetAllUsers()
    {
        return _userServices.GetAllUsers();
    }

    [HttpGet(Name = "GetUserById")]
    public ActionResult<UserViewModel> GetUserById(int userId)
    {
        return _userServices.GetUserById(userId);
    }

    [HttpPost(Name = "EditUser")]
    public ActionResult<bool> SaveUser(UserViewModel request)
    {
        bool success = false;

        success = _userServices.EditUser(request);

        return success;
    }
}