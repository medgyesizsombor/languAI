using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "User",
            columns: table => new
            {
                Id = table.Column<Guid>(nullable: false),
                Nev = table.Column<string>(nullable: false),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_User", x => x.Id);
            });

            migrationBuilder.InsertData(
            table: "User",
            columns: new[] { "Nev" },
            values: new object[,]
            {
                { "Chuck Norris" },
                { "Harry Potter" }
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
