using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePathes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 1,
                column: "ActionGetPath",
                value: "ActiveSubstance/GetAllActiveSubstances");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 2,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 3,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 4,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 5,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 6,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 7,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 8,
                column: "ActionGetPath",
                value: "PermissionType/GetAllPermissions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 1,
                column: "ActionGetPath",
                value: "ActiveSubstance");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 2,
                column: "ActionGetPath",
                value: "PermissionType");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 3,
                column: "ActionGetPath",
                value: "PermissionType");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 4,
                column: "ActionGetPath",
                value: "PermissionType");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 5,
                column: "ActionGetPath",
                value: "PermissionType");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 6,
                column: "ActionGetPath",
                value: "PermissionType");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 7,
                column: "ActionGetPath",
                value: "PermissionType");

            migrationBuilder.UpdateData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 8,
                column: "ActionGetPath",
                value: "PermissionType");
        }
    }
}
