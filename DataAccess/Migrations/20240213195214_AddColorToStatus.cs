using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddColorToStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "ProductStatuses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ProductStatuses",
                keyColumn: "Id",
                keyValue: 1,
                column: "Color",
                value: "rgba(52, 199, 89, 1)");

            migrationBuilder.UpdateData(
                table: "ProductStatuses",
                keyColumn: "Id",
                keyValue: 2,
                column: "Color",
                value: "rgba(255, 149, 0, 1)");

            migrationBuilder.UpdateData(
                table: "ProductStatuses",
                keyColumn: "Id",
                keyValue: 3,
                column: "Color",
                value: "rgba(255, 59, 48, 1)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "ProductStatuses");
        }
    }
}
