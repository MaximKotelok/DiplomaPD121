using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fixUserPharmacy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pharmacies_AspNetUsers_UserId",
                table: "Pharmacies");

            migrationBuilder.DropTable(
                name: "PharmacyUser");

            migrationBuilder.DropTable(
                name: "ProductUser");

            migrationBuilder.DropIndex(
                name: "IX_Pharmacies_UserId",
                table: "Pharmacies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Pharmacies");

            migrationBuilder.AddColumn<int>(
                name: "PharmacyId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PharmacyId",
                table: "AspNetUsers",
                column: "PharmacyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Pharmacies_PharmacyId",
                table: "AspNetUsers",
                column: "PharmacyId",
                principalTable: "Pharmacies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Pharmacies_PharmacyId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PharmacyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PharmacyId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Pharmacies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PharmacyUser",
                columns: table => new
                {
                    FavPharmaciesId = table.Column<int>(type: "int", nullable: false),
                    FavUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmacyUser", x => new { x.FavPharmaciesId, x.FavUsersId });
                    table.ForeignKey(
                        name: "FK_PharmacyUser_AspNetUsers_FavUsersId",
                        column: x => x.FavUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PharmacyUser_Pharmacies_FavPharmaciesId",
                        column: x => x.FavPharmaciesId,
                        principalTable: "Pharmacies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductUser",
                columns: table => new
                {
                    FavProductsId = table.Column<int>(type: "int", nullable: false),
                    FavUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductUser", x => new { x.FavProductsId, x.FavUsersId });
                    table.ForeignKey(
                        name: "FK_ProductUser_AspNetUsers_FavUsersId",
                        column: x => x.FavUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductUser_Products_FavProductsId",
                        column: x => x.FavProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 3,
                column: "UserId",
                value: null);

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 4,
                column: "UserId",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Pharmacies_UserId",
                table: "Pharmacies",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_PharmacyUser_FavUsersId",
                table: "PharmacyUser",
                column: "FavUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductUser_FavUsersId",
                table: "ProductUser",
                column: "FavUsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pharmacies_AspNetUsers_UserId",
                table: "Pharmacies",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
