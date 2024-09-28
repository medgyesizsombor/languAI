using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class addchatgptfriendshiptofirstuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [Friendship] (RequesterId, RecipientId, Created, Status, IsCloseFriendship) VALUES ((SELECT Id FROM [User] WHERE Username = 'zsombi'), (SELECT Id FROM [User] WHERE Username = 'ChatGPT'), '2024-09-25', 2, 0);");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Friendship] WHERE RequesterId = (SELECT Id FROM [User] WHERE Username = 'zsombi')");
        }
    }
}
