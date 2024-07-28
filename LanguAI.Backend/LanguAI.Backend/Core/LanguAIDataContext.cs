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
        public virtual DbSet<FriendshipRequest> FriendshipRequest { get; set; }
        public virtual DbSet<Friendship> Friendship { get; set; }
        public virtual DbSet<Card> Card { get; set; }
        public virtual DbSet<CardList> CardList { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.FirstUser)
                .WithMany(u => u.SentFriendships)
                .HasForeignKey(f => f.FirstUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.SecondUser)
                .WithMany(u => u.ReceivedFriendships)
                .HasForeignKey(f => f.SecondUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FriendshipRequest>()
                .HasOne(fr => fr.Requester)
                .WithMany(u => u.SentFriendshipRequests)
                .HasForeignKey(fr => fr.RequesterId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FriendshipRequest>()
                .HasOne(fr => fr.Receiver)
                .WithMany(u => u.ReceivedFriendshipRequests)
                .HasForeignKey(fr => fr.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

}
