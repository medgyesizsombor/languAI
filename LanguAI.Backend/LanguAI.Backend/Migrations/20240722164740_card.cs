using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class card : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CardList",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    LearningLanguage = table.Column<string>(nullable: false),
                    NativeLanguage = table.Column<string>(nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardList", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CardList_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Card",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WordInNativeLanguage = table.Column<string>(type: "int", nullable: false),
                    WordInLearningLanguage = table.Column<string>(type: "int", nullable: false),
                    CardListId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Card", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Card_CardList_CardListId",
                        column: x => x.CardListId,
                        principalTable: "CardList",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardList_UserId",
                table: "CardList",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Card_CardListId",
                table: "Card",
                column: "CardListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Card");

            migrationBuilder.DropTable(
                name: "CardList");
        }
    }
}
