using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.Core.Models;

public class Image
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public DateTime? Uploaded {  get; set; } = DateTime.UtcNow;

    public bool IsDeleted { get; set; } = false;

    public virtual User User { get; set; }

    public virtual Post Post { get; set; }
}
