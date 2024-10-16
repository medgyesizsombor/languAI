﻿using LanguAI.Backend.Core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LanguAI.Backend.Core.Models;

public class Post
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Content { get; set; }

    [Required]
    public int UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual User User { get; set; }

    [Required]
    public DateTime Created { get; set; }

    [Required]
    public AccessEnum Access { get; set; }

    public virtual ICollection<Interaction> Interactions { get; set; } = new List<Interaction>();
}
