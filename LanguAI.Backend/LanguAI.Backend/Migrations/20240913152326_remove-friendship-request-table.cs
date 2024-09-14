using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguAI.Backend.Migrations
{
    /// <inheritdoc />
    public partial class removefriendshiprequesttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendship_User_FirstUserId",
                table: "Friendship");

            migrationBuilder.DropForeignKey(
                name: "FK_Friendship_User_SecondUserId",
                table: "Friendship");

            migrationBuilder.DropTable(
                name: "FriendshipRequest");

            migrationBuilder.DropIndex(
                name: "IX_Friendship_SecondUserId",
                table: "Friendship");

            migrationBuilder.RenameColumn(
                name: "SecondUserId",
                table: "Friendship",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "FirstUserId",
                table: "Friendship",
                newName: "RequesterId");

            migrationBuilder.RenameColumn(
                name: "CloseFriendship",
                table: "Friendship",
                newName: "IsCloseFriendship");

            migrationBuilder.RenameIndex(
                name: "IX_Friendship_FirstUserId",
                table: "Friendship",
                newName: "IX_Friendship_RequesterId");

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Friendship",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Friendship_ReceiverId",
                table: "Friendship",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friendship_User_ReceiverId",
                table: "Friendship",
                column: "ReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friendship_User_RequesterId",
                table: "Friendship",
                column: "RequesterId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friendship_User_ReceiverId",
                table: "Friendship");

            migrationBuilder.DropForeignKey(
                name: "FK_Friendship_User_RequesterId",
                table: "Friendship");

            migrationBuilder.DropIndex(
                name: "IX_Friendship_ReceiverId",
                table: "Friendship");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Friendship");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Friendship",
                newName: "SecondUserId");

            migrationBuilder.RenameColumn(
                name: "RequesterId",
                table: "Friendship",
                newName: "FirstUserId");

            migrationBuilder.RenameColumn(
                name: "IsCloseFriendship",
                table: "Friendship",
                newName: "CloseFriendship");

            migrationBuilder.RenameIndex(
                name: "IX_Friendship_RequesterId",
                table: "Friendship",
                newName: "IX_Friendship_FirstUserId");

            migrationBuilder.CreateTable(
                name: "FriendshipRequest",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceiverId = table.Column<int>(type: "int", nullable: false),
                    RequesterId = table.Column<int>(type: "int", nullable: false),
                    RequestedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendshipRequest", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FriendshipRequest_User_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FriendshipRequest_User_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friendship_SecondUserId",
                table: "Friendship",
                column: "SecondUserId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendshipRequest_ReceiverId",
                table: "FriendshipRequest",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendshipRequest_RequesterId",
                table: "FriendshipRequest",
                column: "RequesterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friendship_User_FirstUserId",
                table: "Friendship",
                column: "FirstUserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friendship_User_SecondUserId",
                table: "Friendship",
                column: "SecondUserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
