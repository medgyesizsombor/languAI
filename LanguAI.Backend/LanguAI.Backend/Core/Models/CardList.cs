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

    //Default learning language id is the english language id
    [Required]
    public int LearningLanguageId { get; set; } = 23;

    [ForeignKey(nameof(LearningLanguageId))]
    public virtual Language LearningLanguage { get; set; }

    //Default native language id is the english language id
    [Required]
    public int NativeLanguageId { get; set; } = 35;

    [ForeignKey(nameof(NativeLanguageId))]
    public virtual Language NativeLanguage { get; set; }

    [Required]
    public DateTime Created { get; set; } = DateTime.Now;

    [Required]
    public DateTime Modified { get; set; } = DateTime.Now;

    [Required]
    public string Name { get; set; }

    [Required]
    public AccessEnum Access { get; set; } = AccessEnum.Public;

    [Required]
    public bool IsDeleted { get; set; } = false;

    [Required]
    public int TopicId { get; set; }

    [ForeignKey(nameof(TopicId))]
    public virtual Topic Topic { get; set; }

    public virtual ICollection<Card> Cards { get; set; } = new List<Card>();
}
