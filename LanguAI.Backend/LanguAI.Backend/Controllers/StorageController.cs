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
    private readonly ILogger<StorageController> _logger;

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
    public async Task<byte[]> DownloadBlob(int imageId)
    {
        return await _storageService.DownloadBlob(imageId);
    }

    [HttpDelete(Name = "DeleteBlob")]
    public async Task<bool> DeleteBlob(int imageId)
    {
        return await _storageService.DeleteBlob(imageId);
    }
}
