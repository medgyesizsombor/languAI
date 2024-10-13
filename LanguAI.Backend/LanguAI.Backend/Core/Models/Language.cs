using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.Core.Models;

public class Language
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Code { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string NameInHun {  get; set; }

    public virtual ICollection<Learning> Learnings { get; set; } = new List<Learning>();
    public virtual ICollection<CardList> LearningLanguageOfCardLists { get; set; } = new List<CardList>();
    public virtual ICollection<CardList> NativeLanguageOfCardLists { get; set; } = new List<CardList>();
}