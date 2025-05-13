using LanguAI.Backend.Services;
using LanguAI.Backend.ViewModels.Image;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LanguAI.Backend.Controllers;

[Authorize]
[ApiController]
[Route("[controller]/[action]")]
public class StorageController : ControllerBase
{
    private readonly IStorageService _storageService;
    private readonly ILogger _logger;

    public StorageController(ILogger<StorageController> logger, IStorageService storageService)
    {
        _logger = logger;
        _storageService = storageService;
    }

    [HttpPost(Name = "UploadBlob")]
    public async Task<int> UploadBlob(ImageViewModel image)
    {
        return await _storageService.UploadBlob(image);
    }

    [HttpGet(Name = "DownloadBlob")]
    public async Task<ActionResult<byte[]>> DownloadBlob(int imageId)
    {
        try
        {
            return Ok(await _storageService.DownloadBlob(imageId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }

    [HttpDelete(Name = "DeleteBlob")]
    public async Task<ActionResult<bool>> DeleteBlob(int imageId)
    {
        try
        {
            return Ok(await _storageService.DeleteBlob(imageId));
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            return BadRequest(e.Message);
        }
    }
}
