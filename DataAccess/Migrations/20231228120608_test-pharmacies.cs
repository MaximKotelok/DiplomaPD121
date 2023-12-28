using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class testpharmacies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 1,
                column: "Longitude",
                value: "24.031511");

            migrationBuilder.InsertData(
                table: "Pharmacies",
                columns: new[] { "Id", "Address", "CityID", "Latitude", "Longitude", "PharmaCompanyID" },
                values: new object[,]
                {
                    { 2, "Temp Address2", 1, "49.842757", "24.031211", 1 },
                    { 3, "Temp Address3", 1, "49.842157", "24.031611", 1 },
                    { 4, "Temp Address4", 1, "49.842557", "24.031411", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 1,
                column: "Longitude",
                value: "24.031111");
        }
    }
}
