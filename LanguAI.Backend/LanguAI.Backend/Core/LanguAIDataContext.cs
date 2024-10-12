using LanguAI.Backend.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace LanguAI.Backend.Core
{
    public partial class LanguAIDataContext : DbContext
    {
        public LanguAIDataContext() { }

        public LanguAIDataContext(DbContextOptions<LanguAIDataContext> options)
        : base(options)
        {
        }

        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<Friendship> Friendship { get; set; }
        public virtual DbSet<Card> Card { get; set; }
        public virtual DbSet<CardList> CardList { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<Interaction> Interaction { get; set; }
        public virtual DbSet<Topic> Topic { get; set; }
        public virtual DbSet<Learning> Learning { get; set; }
        public virtual DbSet<Language> Language { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.Requester)
                .WithMany(u => u.SentFriendships)
                .HasForeignKey(f => f.RequesterId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.Recipient)
                .WithMany(u => u.ReceivedFriendships)
                .HasForeignKey(f => f.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(fr => fr.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(fr => fr.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Interaction>()
                .HasOne(i => i.User)
                .WithMany(u => u.Interactions)
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Interaction>()
                .HasOne(i => i.ParentInteraction)
                .WithMany(p => p.ChildInteractions)
                .HasForeignKey(i => i.ParentInteractionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Interaction>()
                .HasOne(i => i.Post)
                .WithMany(p => p.Interactions)
                .HasForeignKey(i => i.PostId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Learning>()
                .HasOne(l => l.User)
                .WithMany(u => u.Learnings)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Learning>()
                .HasOne(l => l.Language)
                .WithMany(l => l.Learnings)
                .HasForeignKey(l => l.LanguageId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CardList>()
                .HasOne(c => c.Topic)
                .WithMany(t => t.CardLists)
                .HasForeignKey(c => c.TopicId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}