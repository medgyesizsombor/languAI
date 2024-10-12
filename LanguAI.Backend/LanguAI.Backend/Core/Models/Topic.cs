using LanguAI.Backend.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace LanguAI.Backend.Core.Models;

public class Topic
{
    [Required]
    public int Id { get; set; }

    [Required]
    public LanguageLevelEnum LanguageLevel { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string NameInHun {  get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string DescriptionInHun { get; set; }

    public virtual ICollection<CardList> CardLists { get; set; } = new List<CardList>();
}
