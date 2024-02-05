using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addBasePermissionTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "PermissionTypes",
                newName: "Title");

            migrationBuilder.InsertData(
                table: "PermissionTypes",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { 1, "заборонено" },
                    { 2, "дозволено" },
                    { 3, "за призначенням лікаря" },
                    { 4, "з обережністю" }
                });

            migrationBuilder.InsertData(
                table: "ProductExistAttributes",
                columns: new[] { "Id", "ActionGetPath", "Description", "GroupID", "Name" },
                values: new object[,]
                {
                    { 2, "PermissionType", "Алергіки", 2, "allergiesId" },
                    { 3, "PermissionType", "Діабетики", 2, "diabeticsId" },
                    { 4, "PermissionType", "Годуючі мами", 2, "nursingMothersId" },
                    { 5, "PermissionType", "Дорослі", 2, "adultsId" },
                    { 6, "PermissionType", "Вагітні", 2, "pregnantId" },
                    { 7, "PermissionType", "Діти", 2, "childrenId" },
                    { 8, "PermissionType", "Водії", 2, "driversId" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PermissionTypes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ProductExistAttributes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "PermissionTypes",
                newName: "Name");
        }
    }
}
