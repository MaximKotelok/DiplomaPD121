using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePharmacy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OpenTime",
                table: "Pharmacies",
                newName: "WorkingWeekOpenTime");

            migrationBuilder.RenameColumn(
                name: "CloseTime",
                table: "Pharmacies",
                newName: "WorkingWeekCloseTime");

            migrationBuilder.AddColumn<string>(
                name: "WeekendCloseTime",
                table: "Pharmacies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WeekendOpenTime",
                table: "Pharmacies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "WeekendCloseTime", "WeekendOpenTime" },
                values: new object[] { "19:00", "11:00" });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "WeekendCloseTime", "WeekendOpenTime" },
                values: new object[] { "21:00", "11:00" });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "WeekendCloseTime", "WeekendOpenTime" },
                values: new object[] { "23:59", "00:00" });

            migrationBuilder.UpdateData(
                table: "Pharmacies",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "WeekendCloseTime", "WeekendOpenTime" },
                values: new object[] { "17:00", "11:00" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WeekendCloseTime",
                table: "Pharmacies");

            migrationBuilder.DropColumn(
                name: "WeekendOpenTime",
                table: "Pharmacies");

            migrationBuilder.RenameColumn(
                name: "WorkingWeekOpenTime",
                table: "Pharmacies",
                newName: "OpenTime");

            migrationBuilder.RenameColumn(
                name: "WorkingWeekCloseTime",
                table: "Pharmacies",
                newName: "CloseTime");
        }
    }
}
