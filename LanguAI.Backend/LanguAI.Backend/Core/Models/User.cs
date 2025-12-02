using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class User
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    public string PasswordHash { get; set; }

    [Required]
    public bool IsActive { get; set; } = true;

    public int Streak { get; set; } = 0;

    public int? ImageId { get; set; }

    [ForeignKey(nameof(ImageId))]
    public virtual Image Image { get; set; }

    public string ThreadId { get; set; }

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<CardList> CardLists { get; set; } = new List<CardList>();

    public virtual ICollection<Friendship> SentFriendships { get; set; } = new List<Friendship>();

    public virtual ICollection<Friendship> ReceivedFriendships { get; set; } = new List<Friendship>();

    public virtual ICollection<Message> SentMessages { get; set; } = new List<Message>();

    public virtual ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();

    public virtual ICollection<Interaction> Interactions { get; set; } = new List<Interaction>();

    public virtual ICollection<Learning> Learnings { get; set; } = new List<Learning>();

    public virtual ICollection<Gameplay> Gameplays { get; set; } = new List<Gameplay>();
}
