using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Boardgames.Migrations
{
    public partial class addedadproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GameId",
                table: "Ads",
                newName: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_Ads_gameId",
                table: "Ads",
                column: "gameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ads_Games_gameId",
                table: "Ads",
                column: "gameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ads_Games_gameId",
                table: "Ads");

            migrationBuilder.DropIndex(
                name: "IX_Ads_gameId",
                table: "Ads");

            migrationBuilder.RenameColumn(
                name: "gameId",
                table: "Ads",
                newName: "GameId");
        }
    }
}
