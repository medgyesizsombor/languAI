using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.Core.Models;

public class Friendship
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int FirstUserId { get; set; }

    [ForeignKey(nameof(FirstUserId))]
    public virtual User FirstUser { get; set; }

    [Required]
    public int SecondUserId { get; set; }

    [ForeignKey(nameof(SecondUserId))]
    public virtual User SecondUser { get; set; }

    [Required]
    public DateTime Created { get; set; } = DateTime.UtcNow;

    [Required]
    public bool CloseFriendship { get; set; } = false;
}
