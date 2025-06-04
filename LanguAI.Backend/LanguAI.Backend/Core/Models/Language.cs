using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

    [JsonIgnore]
    public virtual ICollection<Learning> LearningLanguageOfLearnings { get; set; } = new List<Learning>();
    [JsonIgnore]
    public virtual ICollection<Learning> NativeLanguageOfLearnings { get; set; } = new List<Learning>();
    [JsonIgnore]
    public virtual ICollection<CardList> LearningLanguageOfCardLists { get; set; } = new List<CardList>();
    [JsonIgnore]
    public virtual ICollection<CardList> NativeLanguageOfCardLists { get; set; } = new List<CardList>();
}