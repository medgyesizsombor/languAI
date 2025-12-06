using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class changeenumvalues : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Topic SET LanguageLevel = 'Beginner' WHERE LanguageLevel = '1'");
            migrationBuilder.Sql("UPDATE Topic SET LanguageLevel = 'Intermediate' WHERE LanguageLevel = '2'");
            migrationBuilder.Sql("UPDATE Topic SET LanguageLevel = 'Advanced' WHERE LanguageLevel = '3'");
            migrationBuilder.Sql("UPDATE CardList SET Access = 'Public' WHERE Access = '1'");
            migrationBuilder.Sql("UPDATE Friendship SET Status = 'Accepted' WHERE Status = '2'");
            migrationBuilder.Sql("UPDATE Learning SET LanguageLevel = 'Beginner' WHERE LanguageLevel = '1'");
            migrationBuilder.Sql("UPDATE Message SET Status = 'Sent' WHERE Status = '1'");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Topic SET LanguageLevel = '1' WHERE LanguageLevel = 'Beginner'");
            migrationBuilder.Sql("UPDATE Topic SET LanguageLevel = '2' WHERE LanguageLevel = 'Intermediate'");
            migrationBuilder.Sql("UPDATE Topic SET LanguageLevel = '3' WHERE LanguageLevel = 'Advanced'");
            migrationBuilder.Sql("UPDATE CardList SET Access = '1' WHERE Access = 'Public'");
            migrationBuilder.Sql("UPDATE Friendship SET Status = '2' WHERE Status = 'Accepted'");
            migrationBuilder.Sql("UPDATE Learning SET LanguageLevel = '1' WHERE LanguageLevel = 'Beginner'");
            migrationBuilder.Sql("UPDATE Message SET Status = '1' WHERE Status = 'Sent'");
        }
    }
}
