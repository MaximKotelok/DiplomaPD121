using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReservationStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "ReservationStatuses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "ReservationStatuses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ReservationStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Color", "Path" },
                values: new object[] { "#FF9500", "/images/statuses/ReservationStatusWaiting.png" });

            migrationBuilder.UpdateData(
                table: "ReservationStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Color", "Path" },
                values: new object[] { "#007AFF", "/images/statuses/ProductStatusConfirmed.png" });

            migrationBuilder.UpdateData(
                table: "ReservationStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Color", "Path" },
                values: new object[] { "#FF3B30", "/images/statuses/ReservationStatusCanceled.png" });

            migrationBuilder.UpdateData(
                table: "ReservationStatuses",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Color", "Path" },
                values: new object[] { "#3BA42A", "/images/statuses/ReservationStatusFinished.png" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "ReservationStatuses");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "ReservationStatuses");
        }
    }
}
