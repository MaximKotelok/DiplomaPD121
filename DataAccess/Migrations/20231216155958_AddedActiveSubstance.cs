using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedActiveSubstance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PharmacyID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ActiveSubstanceID",
                table: "Medicines",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ActiveSubstances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiveSubstances", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ActiveSubstances",
                columns: new[] { "Id", "Title" },
                values: new object[] { 1, "аскорбінова кислота" });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 1,
                column: "ActiveSubstanceID",
                value: 1);

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

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_ActiveSubstanceID",
                table: "Medicines",
                column: "ActiveSubstanceID");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_ActiveSubstances_ActiveSubstanceID",
                table: "Medicines",
                column: "ActiveSubstanceID",
                principalTable: "ActiveSubstances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Pharmacies_PharmacyID",
                table: "Products",
                column: "PharmacyID",
                principalTable: "Pharmacies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_ActiveSubstances_ActiveSubstanceID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Pharmacies_PharmacyID",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ActiveSubstances");

            migrationBuilder.DropIndex(
                name: "IX_Products_PharmacyID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_ActiveSubstanceID",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "PharmacyID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ActiveSubstanceID",
                table: "Medicines");
        }
    }
}
