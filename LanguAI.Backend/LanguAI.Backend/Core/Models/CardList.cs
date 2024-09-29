using LanguAI.Backend.Core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class CardList
{
    [Required]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; }

    [Required]
    public string LearningLanguage { get; set; }

    [Required]
    public string NativeLanguage { get; set; }

    [Required]
    public DateTime Created { get; set; } = DateTime.Now;

    [Required]
    public DateTime Modified { get; set; } = DateTime.Now;

    [Required]
    public string Name { get; set; }

    [Required]
    public AccessEnum Access { get; set; } = AccessEnum.Public;

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
