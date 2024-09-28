using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class createchatgptuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("SET IDENTITY_INSERT [User] ON; INSERT INTO [User] (Id, Username, Email, DateOfBirth, PasswordHash, Language) VALUES (2, 'ChatGPT', 'chat@gpt.com', '2024-09-18', 'xxxxxxxxxxx', 1); SET IDENTITY_INSERT [User] OFF;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [User] WHERE Username Like 'ChatGPT'");
        }
    }
}
