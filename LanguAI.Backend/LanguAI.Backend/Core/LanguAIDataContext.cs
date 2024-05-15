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
    }

}
