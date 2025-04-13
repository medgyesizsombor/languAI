using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class imagetableandsomechanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gameplay_User_UserId",
                table: "Gameplay");

            migrationBuilder.DropForeignKey(
                name: "FK_Interaction_User_UserId",
                table: "Interaction");

            migrationBuilder.DropForeignKey(
                name: "FK_Learning_User_UserId",
                table: "Learning");

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "User",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImageId",
                table: "Post",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Uploaded = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_ImageId",
                table: "User",
                column: "ImageId",
                unique: true,
                filter: "[ImageId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Post_ImageId",
                table: "Post",
                column: "ImageId",
                unique: true,
                filter: "[ImageId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Gameplay_User_UserId",
                table: "Gameplay",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Interaction_User_UserId",
                table: "Interaction",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_User_UserId",
                table: "Learning",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Post_Image_ImageId",
                table: "Post",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Image_ImageId",
                table: "User",
                column: "ImageId",
                principalTable: "Image",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gameplay_User_UserId",
                table: "Gameplay");

            migrationBuilder.DropForeignKey(
                name: "FK_Interaction_User_UserId",
                table: "Interaction");

            migrationBuilder.DropForeignKey(
                name: "FK_Learning_User_UserId",
                table: "Learning");

            migrationBuilder.DropForeignKey(
                name: "FK_Post_Image_ImageId",
                table: "Post");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Image_ImageId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropIndex(
                name: "IX_User_ImageId",
                table: "User");

            migrationBuilder.DropIndex(
                name: "IX_Post_ImageId",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Post");

            migrationBuilder.AddForeignKey(
                name: "FK_Gameplay_User_UserId",
                table: "Gameplay",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Interaction_User_UserId",
                table: "Interaction",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Learning_User_UserId",
                table: "Learning",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
