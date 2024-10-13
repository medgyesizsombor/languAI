using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class modifycardlistlanguage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LearningLanguage",
                table: "CardList");

            migrationBuilder.DropColumn(
                name: "NativeLanguage",
                table: "CardList");

            migrationBuilder.AddColumn<int>(
                name: "LearningLanguageId",
                table: "CardList",
                type: "int",
                nullable: false,
                defaultValue: 23);

            migrationBuilder.AddColumn<int>(
                name: "NativeLanguageId",
                table: "CardList",
                type: "int",
                nullable: false,
                defaultValue: 35);

            migrationBuilder.CreateIndex(
                name: "IX_CardList_LearningLanguageId",
                table: "CardList",
                column: "LearningLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_CardList_NativeLanguageId",
                table: "CardList",
                column: "NativeLanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_CardList_Language_LearningLanguageId",
                table: "CardList",
                column: "LearningLanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CardList_Language_NativeLanguageId",
                table: "CardList",
                column: "NativeLanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardList_Language_LearningLanguageId",
                table: "CardList");

            migrationBuilder.DropForeignKey(
                name: "FK_CardList_Language_NativeLanguageId",
                table: "CardList");

            migrationBuilder.DropIndex(
                name: "IX_CardList_LearningLanguageId",
                table: "CardList");

            migrationBuilder.DropIndex(
                name: "IX_CardList_NativeLanguageId",
                table: "CardList");

            migrationBuilder.DropColumn(
                name: "LearningLanguageId",
                table: "CardList");

            migrationBuilder.DropColumn(
                name: "NativeLanguageId",
                table: "CardList");

            migrationBuilder.AddColumn<string>(
                name: "LearningLanguage",
                table: "CardList",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NativeLanguage",
                table: "CardList",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
