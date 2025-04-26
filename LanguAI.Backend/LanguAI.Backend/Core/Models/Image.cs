using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.Core.Models;

public class Image
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public DateTime? Uploaded { get; set; } = DateTime.UtcNow;

    public bool IsDeleted { get; set; } = false;

    [Required]
    public string Type { get; set; }

    public virtual User User { get; set; }

    public virtual Post Post { get; set; }
}
