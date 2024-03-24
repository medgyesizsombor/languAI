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
                Id = table.Column<int>(nullable: false),
                Name = table.Column<string>(nullable: false),
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_User", x => x.Id);
            });

            migrationBuilder.InsertData(
            table: "User",
            columnTypes: new [] { "int", "string" },
            columns: new[] { "Id", "Name" },
            values: new object[,]
            {
                { 1, "Chuck Norris" },
                { 2, "Harry Potter" }
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
