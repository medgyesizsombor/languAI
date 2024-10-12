using LanguAI.Backend.Core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class Learning
{
    [Required]
    public int Id { get; set; }

    [Required]
    public LanguageLevelEnum LanguageLevel { get; set; }

    [Required]
    public bool IsActive { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; }

    [Required]
    public int LanguageId { get; set; }

    [ForeignKey(nameof(LanguageId))]
    public virtual Language Language { get; set; }
}