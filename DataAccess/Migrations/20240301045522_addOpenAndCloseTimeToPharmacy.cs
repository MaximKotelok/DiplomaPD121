using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addOpenAndCloseTimeToPharmacy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CloseTime",
                table: "Pharmacies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OpenTime",
                table: "Pharmacies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CloseTime", "OpenTime" },
                values: new object[] { "20:00", "10:00" });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CloseTime", "OpenTime" },
                values: new object[] { "21:00", "11:00" });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CloseTime", "OpenTime" },
                values: new object[] { "23:59", "00:00" });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "CloseTime", "OpenTime" },
                values: new object[] { "18:00", "09:00" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CloseTime",
                table: "Pharmacies");

            migrationBuilder.DropColumn(
                name: "OpenTime",
                table: "Pharmacies");
        }
    }
}
