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

    public StorageController(IStorageService storageService)
    {
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
        return Ok(await _storageService.DownloadBlob(imageId));
    }

    [HttpDelete(Name = "DeleteBlob")]
    public async Task<ActionResult<bool>> DeleteBlob(int imageId)
    {
        return Ok(await _storageService.DeleteBlob(imageId));
    }
}
