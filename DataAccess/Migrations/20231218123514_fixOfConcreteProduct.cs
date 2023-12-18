using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fixOfConcreteProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Pharmacies_PharmacyID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_PharmacyID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "PharmacyID",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "PharmacyID",
                table: "ConcreteProducts",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ConcreteProducts",
                keyColumn: "Id",
                keyValue: 1,
                column: "PharmacyID",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_ConcreteProducts_PharmacyID",
                table: "ConcreteProducts",
                column: "PharmacyID");

            migrationBuilder.AddForeignKey(
                name: "FK_ConcreteProducts_Pharmacies_PharmacyID",
                table: "ConcreteProducts",
                column: "PharmacyID",
                principalTable: "Pharmacies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConcreteProducts_Pharmacies_PharmacyID",
                table: "ConcreteProducts");

            migrationBuilder.DropIndex(
                name: "IX_ConcreteProducts_PharmacyID",
                table: "ConcreteProducts");

            migrationBuilder.DropColumn(
                name: "PharmacyID",
                table: "ConcreteProducts");

            migrationBuilder.AddColumn<int>(
                name: "PharmacyID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "PharmacyID",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Products_PharmacyID",
                table: "Products",
                column: "PharmacyID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Pharmacies_PharmacyID",
                table: "Products",
                column: "PharmacyID",
                principalTable: "Pharmacies",
                principalColumn: "Id");
        }
    }
}
