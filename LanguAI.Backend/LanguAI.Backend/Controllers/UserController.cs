using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers
{
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
        public ActionResult<List<User>> GetAllUsers()
        {
            return _userServices.GetAllUsers();
        }
    }
}
