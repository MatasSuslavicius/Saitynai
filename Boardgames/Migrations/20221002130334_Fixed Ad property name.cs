using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardgames.Migrations
{
    public partial class FixedAdpropertyname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Games_gameId",
                table: "Ads");

            migrationBuilder.RenameColumn(
                name: "gameId",
                table: "Ads",
                newName: "GameId");

            migrationBuilder.RenameIndex(
                name: "IX_Ads_gameId",
                table: "Ads",
                newName: "IX_Ads_GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Games_GameId",
                table: "Ads",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Games_GameId",
                table: "Ads");

            migrationBuilder.RenameColumn(
                name: "GameId",
                table: "Ads",
                newName: "gameId");

            migrationBuilder.RenameIndex(
                name: "IX_Ads_GameId",
                table: "Ads",
                newName: "IX_Ads_gameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Games_gameId",
                table: "Ads",
                column: "gameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
