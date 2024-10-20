using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class learningandnativelanguageoflearnings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Learning_Language_LanguageId",
                table: "Learning");

            migrationBuilder.RenameColumn(
                name: "LanguageId",
                table: "Learning",
                newName: "NativeLanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_Learning_LanguageId",
                table: "Learning",
                newName: "IX_Learning_NativeLanguageId");

            migrationBuilder.AddColumn<int>(
                name: "LearningLanguageId",
                table: "Learning",
                type: "int",
                nullable: false,
                defaultValue: 23);

            migrationBuilder.CreateIndex(
                name: "IX_Learning_LearningLanguageId",
                table: "Learning",
                column: "LearningLanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_Language_LearningLanguageId",
                table: "Learning",
                column: "LearningLanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_Language_NativeLanguageId",
                table: "Learning",
                column: "NativeLanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Learning_Language_LearningLanguageId",
                table: "Learning");

            migrationBuilder.DropForeignKey(
                name: "FK_Learning_Language_NativeLanguageId",
                table: "Learning");

            migrationBuilder.DropIndex(
                name: "IX_Learning_LearningLanguageId",
                table: "Learning");

            migrationBuilder.DropColumn(
                name: "LearningLanguageId",
                table: "Learning");

            migrationBuilder.RenameColumn(
                name: "NativeLanguageId",
                table: "Learning",
                newName: "LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_Learning_NativeLanguageId",
                table: "Learning",
                newName: "IX_Learning_LanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_Language_LanguageId",
                table: "Learning",
                column: "LanguageId",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
