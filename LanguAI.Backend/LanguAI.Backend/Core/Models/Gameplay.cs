using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class Gameplay
{
    [Key]
    [Required]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; }

    [Required]
    public DateTime Date { get; set; } = DateTime.Now;

    [Required]
    public int Point { get; set; }
}
