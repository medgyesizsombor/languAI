using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class Card
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string WordInNativeLanguage { get; set; }

    [Required]
    public string WordInLearningLanguage { get; set; }

    [Required]
    public int CardListId { get; set; }

    [ForeignKey(nameof(CardListId))]
    public virtual CardList CardList { get; set; }
}
