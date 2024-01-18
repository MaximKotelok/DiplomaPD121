using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class IsRecomendedAddToCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsActual",
                table: "Categories",
                newName: "IsRecomended");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubCategoriesTypeOfPhoto",
                value: 0);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "SubCategoriesTypeOfPhoto",
                value: 3);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsRecomended", "SubCategoriesTypeOfPhoto" },
                values: new object[] { true, 1 });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "PathToPhoto",
                value: "/images/category/png/C.png");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "IsRecomended", "ParentCategoryID", "PathToPhoto", "SubCategoriesTypeOfPhoto", "Title" },
                values: new object[,]
                {
                    { 17, null, 3, "/images/category/png/B.png", null, "Вітаміни групи В" },
                    { 18, null, 3, "/images/category/png/Biotin.png", null, "Біотин" },
                    { 19, null, 3, "/images/category/png/D.png", null, "Вітамін D" },
                    { 20, null, 3, "/images/category/png/K.png", null, "Вітамін К" }
                });

            migrationBuilder.InsertData(
                table: "PharmaCompanies",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 2, "Подорожник.", "Подорожник" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "PharmaCompanies",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameColumn(
                name: "IsRecomended",
                table: "Categories",
                newName: "IsActual");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "SubCategoriesTypeOfPhoto",
                value: null);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "SubCategoriesTypeOfPhoto",
                value: null);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsActual", "SubCategoriesTypeOfPhoto" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "PathToPhoto",
                value: null);
        }
    }
}
