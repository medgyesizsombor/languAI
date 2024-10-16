﻿using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    /// <summary>
    /// Signing in
    /// </summary>
    /// <param name="request">AuthenticateRequest ViewModel</param>
    /// <returns></returns>
    [HttpPost(Name = "Authenticate")]
    public ActionResult<string> Authenticate(AuthenticateRequestViewModel request)
    {
        ArgumentNullException.ThrowIfNull(request);

        try
        {
            return Ok(_authenticationService.Authenticate(request));
        }
        catch
        {
            return BadRequest(null);
        }

    }
}

