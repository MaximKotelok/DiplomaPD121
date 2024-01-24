using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class favtables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                table: "Citys",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { "49.842957", "24.031111" });

            migrationBuilder.InsertData(
                table: "ConcreteProducts",
                columns: new[] { "PharmacyID", "Price", "ProductID", "Quantity" },
                values: new object[,]
                {
                    {  2, 100.0, 1, 3 },
                    {  3, 100.0, 1, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PharmacyUser_FavUsersId",
                table: "PharmacyUser",
                column: "FavUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductUser_FavUsersId",
                table: "ProductUser",
                column: "FavUsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PharmacyUser");

            migrationBuilder.DropTable(
                name: "ProductUser");

            migrationBuilder.DeleteData(
                table: "ConcreteProducts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ConcreteProducts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.UpdateData(
                table: "Citys",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { "213213", "214124124" });
        }
    }
}
