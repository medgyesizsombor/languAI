using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class fillsomedata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [User] (Username, Email, DateOfBirth, PasswordHash, Country) VALUES ('zsombi', 'zsombi@zsombi.com', '1998-04-20', '35000.5gfNI6xRC1EQvlZZ/qn0fg==.+StLmP+l+3ft9AIS0MJhc4cxLXnaT5JTtmaJZ0B4uNDMi/LRHEudZgFKUMdVeqhzF8lyNObuttHajoeIo5XMpg==', 1);");

            migrationBuilder.Sql("INSERT INTO [CardList] (UserId, LearningLanguage, NativeLanguage, Created, Modified, Name) VALUES ((SELECT Id FROM [User] WHERE Username = 'zsombi'), 'hungarian', 'english', '2024-08-26', '2024-08-26', 'asd');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [User] WHERE Username Like 'root'");

            migrationBuilder.Sql("DELETE FROM [CardList] WHERE UserId = (SELECT Id FROM [User] WHERE Username = 'root')");
        }
    }
}
