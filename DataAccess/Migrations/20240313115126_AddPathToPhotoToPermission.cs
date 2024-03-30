using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddPathToPhotoToPermission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PathToPhoto",
                table: "PermissionTypes",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "PathToPhoto",
                value: "/images/permissionType/denied.png");

            migrationBuilder.UpdateData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "PathToPhoto",
                value: "/images/permissionType/allowed.png");

            migrationBuilder.UpdateData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "PathToPhoto",
                value: "/images/permissionType/warning.png");

            migrationBuilder.UpdateData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 4,
                column: "PathToPhoto",
                value: "/images/permissionType/warning.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathToPhoto",
                table: "PermissionTypes");
        }
    }
}
