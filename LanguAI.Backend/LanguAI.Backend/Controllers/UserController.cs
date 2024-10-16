using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    private readonly ILogger<UserController> _logger;
    private readonly IAuthenticationService _authenticationService;

    public UserController(ILogger<UserController> logger, IUserService userService, IAuthenticationService authenticationService)
    {
        _logger = logger;
        _userService = userService;
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Get all the users
    /// </summary>
    /// <returns></returns>
    [HttpGet(Name = "GetAllUsers")]
    public ActionResult<List<UserViewModel>> GetAllUsers()
    {
        try
        {
            return Ok(_userService.GetAllUsers());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Get user by Id
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    [HttpGet(Name = "GetUserById")]
    public ActionResult<UserViewModel> GetUserById(int userId)
    {
        ArgumentNullException.ThrowIfNull(userId);

        try
        {
            var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);

            ArgumentNullException.ThrowIfNull(currentUserId);

            return Ok(_userService.GetUserById(userId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Save user
    /// </summary>
    /// <param name="request">User ViewModel</param>
    /// <returns></returns>
    [HttpPost(Name = "SaveUser")]
    public ActionResult<bool> SaveUser(UserViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_userService.EditUser(request, (int)currentUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Change User Password
    /// </summary>
    /// <param name="request">Change Password Request</param>
    /// <returns></returns>
    [HttpPost(Name = "ChangePassword")]
    public ActionResult<bool> ChangePassword(ChangePasswordRequestViewModel request)
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            if (request.UserId != currentUserId)
            {
                throw new UnauthorizedAccessException();
            }

            return Ok(_userService.ChangePassword(request));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    /// <summary>
    /// Delete User
    /// </summary>
    /// <param name="userId">User's Id</param>
    /// <returns></returns>
    [HttpPost(Name = "DeleteUser")]
    public ActionResult<bool> DeleteUser()
    {
        var currentUserId = _authenticationService.GetCurrentUserId(HttpContext);
        ArgumentNullException.ThrowIfNull(currentUserId);

        try
        {
            return Ok(_userService.DeleteUser((int)currentUserId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}