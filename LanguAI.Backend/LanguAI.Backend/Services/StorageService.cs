using Azure.Storage.Blobs;
using LanguAI.Backend.Core;
using LanguAI.Backend.Core.Models;
using LanguAI.Backend.Services.Base;
using LanguAI.Backend.ViewModels.Image;

namespace LanguAI.Backend.Services;

public interface IStorageService
{
    Task<int> UploadBlob(ImageViewModel image);
    Task<byte[]> DownloadBlob(int imageId);
    Task<bool> DeleteBlob(int imageId);
}

public class StorageService : BaseService, IStorageService
{
    public StorageService(LanguAIDataContext context, ILogger<StorageService> logger) : base(context) { }

    /// <summary>
    /// Uploading blob to storage
    /// </summary>
    /// <param name="image">ImageViewModel</param>
    /// <returns></returns>
    public async Task<int> UploadBlob(ImageViewModel image)
    {
        using var transaction = _context.Database.BeginTransaction();

        try
        {
            var newImage = new Image
            {
                Name = image.Name,
                Type = image.Type
            };

            _context.Image.Add(newImage);

            _context.SaveChanges();

            BlobClient blobClient = new BlobClient(
                EnvironmentSettings.StorageConnectionString,
                EnvironmentSettings.StorageContainer,
                newImage.Id.ToString());

            var blobContent = Convert.FromBase64String(image.ContentAsString);

            using MemoryStream ms = new MemoryStream(blobContent, writable: false);

            await blobClient.UploadAsync(ms);

            transaction.Commit();

            return newImage.Id;
        }
        catch (Exception e)
        {
            transaction.Rollback();
            throw new Exception(e.Message);
        }
    }

    /// <summary>
    /// Downloading the blob by name
    /// </summary>
    /// <param name="blobName">Name of the blob</param>
    /// <returns></returns>
    public async Task<byte[]> DownloadBlob(int imageId)
    {
        try
        {
            BlobClient blobClient = new BlobClient(
                EnvironmentSettings.StorageConnectionString,
                EnvironmentSettings.StorageContainer,
                imageId.ToString());

            if (blobClient.Exists())
            {
                using MemoryStream ms = new MemoryStream();
                await blobClient.DownloadToAsync(ms);
                return ms.ToArray();
            }
            else
            {
                throw new Exception($"Image with id: {imageId} is not found ");
                //TODO NotFoundException
            }
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }

    /// <summary>
    /// Deleting blob if it exists
    /// </summary>
    /// <param name="blobName"></param>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task<bool> DeleteBlob(int imageId)
    {
        try
        {
            BlobClient blobClient = new BlobClient(
                EnvironmentSettings.StorageConnectionString,
                EnvironmentSettings.StorageContainer,
                imageId.ToString());

            var img = _context.Image.FirstOrDefault(i => i.Id == imageId);

            ArgumentException.ThrowIfNullOrEmpty(nameof(img));

            img.IsDeleted = true;
            _context.SaveChanges();

            return await blobClient.DeleteIfExistsAsync();
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }
}