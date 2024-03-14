using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class newproducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "BrandID", "CategoryID", "Description", "ManufacturerID", "PathToPhoto", "ProductAttributeGroupID", "ProductConfirmID", "SeriesID", "ShortDescription", "Title" },
                values: new object[,]
                {
                    { 7, 3, 15, "Точний та швидкий термометр для вимірювання температури", 2, null, 2, null, 1, "Medical Devices Corp.", "Термометр для аптек" },
                    { 8, 3, 16, "Ефективний антисептик для регулярного використання", 2, null, 2, null, 1, "Hygiene Solutions Ltd.", "Антисептик для рук" },
                    { 9, 2, 15, "Комплект для першої допомоги з необхідним медичним обладнанням", 2, null, 4, null, 1, "Safety First Medical", "Перший допоміжний набір" },
                    { 10, 2, 16, "Одноразова медична маска для захисту від бактерій та вірусів", 1, null, 4, null, 1, "Protective Gear Co.", "Маска медична" },
                    { 11, 1, 14, "Ефективні таблетки для лікування та профілактики грипу", 2, null, 4, null, 1, "Health Pharmaceuticals", "Антигрипові таблетки" },
                    { 12, 3, 15, "Додатковий вітамін С для підтримки імунітету", 1, null, 4, null, 1, "NutriWellness Labs", "Вітамін С" }
                });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "AttributeID", "ProductID", "Value" },
                values: new object[,]
                {
                    { 30, 5, "3 роки" },
                    { 30, 6, "3 роки" },
                    { 20, 7, "Медичний" },
                    { 32, 7, "Білий" },
                    { 33, 7, "Незначна" },
                    { 38, 7, "1.5 л" },
                    { 20, 8, "Медичний" },
                    { 32, 8, "Чорний" },
                    { 38, 8, "2 л" },
                    { 46, 8, "24 місяці" },
                    { 5, 9, "Додаткові функції для першої допомоги" },
                    { 21, 9, "Білий" },
                    { 5, 10, "Одноразова" },
                    { 21, 10, "Синій" },
                    { 49, 10, "5 мл" },
                    { 50, 10, "Не потребує калібрування" },
                    { 13, 11, "Для дорослих" },
                    { 47, 11, "Лікування грипу" },
                    { 50, 11, "Не потребує калібрування" },
                    { 13, 12, "Для всієї родини" },
                    { 47, 12, "Імунітет" },
                    { 50, 12, "Не потребує калібрування" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 30, 5 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 30, 6 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 20, 7 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 32, 7 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 33, 7 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 38, 7 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 20, 8 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 32, 8 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 38, 8 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 46, 8 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 5, 9 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 21, 9 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 5, 10 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 21, 10 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 49, 10 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 50, 10 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 13, 11 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 47, 11 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 50, 11 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 13, 12 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 47, 12 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeID", "ProductID" },
                keyValues: new object[] { 50, 12 });

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12);
        }
    }
}
