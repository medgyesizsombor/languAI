using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "User",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false).Annotation("SqlServer:Identity", "1, 1"),
                Username = table.Column<string>(nullable: false),
                Email = table.Column<string>(nullable: false),
                DateOfBirth = table.Column<DateTime>(nullable: false),
                PasswordHash = table.Column<string>(nullable: false),
                Country = table.Column<int>(nullable: false),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_User", x => x.Id);
            });

            migrationBuilder.InsertData(
            table: "User",
            columnTypes: new [] { "string", "DateTime", "string", "string", "int" },
            columns: new[] { "Username", "DateOfBirth", "Email", "PasswordHash", "Country" },
            values: new object[,]
            {
                { "Chuck Norris", new DateTime(1998, 04, 20), "asd@asd.com", "asdasd", 1 },
                { "Harry Potter", new DateTime(1997, 07, 11), "asd@asd.com", "asdasd", 2 }
            });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
            name: "User");
        }
    }
}
