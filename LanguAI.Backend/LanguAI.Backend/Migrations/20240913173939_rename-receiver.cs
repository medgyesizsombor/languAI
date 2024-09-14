using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class renamereceiver : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendship_User_ReceiverId",
                table: "Friendship");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_ReceiverId",
                table: "Message");

            migrationBuilder.RenameColumn(
                name: "ReceiverId",
                table: "Message",
                newName: "RecipientId");

            migrationBuilder.RenameIndex(
                name: "IX_Message_ReceiverId",
                table: "Message",
                newName: "IX_Message_RecipientId");

            migrationBuilder.RenameColumn(
                name: "ReceiverId",
                table: "Friendship",
                newName: "RecipientId");

            migrationBuilder.RenameIndex(
                name: "IX_Friendship_ReceiverId",
                table: "Friendship",
                newName: "IX_Friendship_RecipientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friendship_User_RecipientId",
                table: "Friendship",
                column: "RecipientId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_RecipientId",
                table: "Message",
                column: "RecipientId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendship_User_RecipientId",
                table: "Friendship");

            migrationBuilder.DropForeignKey(
                name: "FK_Message_User_RecipientId",
                table: "Message");

            migrationBuilder.RenameColumn(
                name: "RecipientId",
                table: "Message",
                newName: "ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_Message_RecipientId",
                table: "Message",
                newName: "IX_Message_ReceiverId");

            migrationBuilder.RenameColumn(
                name: "RecipientId",
                table: "Friendship",
                newName: "ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_Friendship_RecipientId",
                table: "Friendship",
                newName: "IX_Friendship_ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friendship_User_ReceiverId",
                table: "Friendship",
                column: "ReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Message_User_ReceiverId",
                table: "Message",
                column: "ReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
