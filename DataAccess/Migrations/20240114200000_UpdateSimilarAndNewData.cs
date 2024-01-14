using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSimilarAndNewData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_SimilarProductGroups_SimilarProductGroupId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_SimilarProductGroupId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SimilarProductGroupId",
                table: "Products");

            migrationBuilder.CreateTable(
                name: "SimilarProductItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    SimilarProductGroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SimilarProductItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SimilarProductItems_Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SimilarProductItems_SimilarProductGroups_SimilarProductGroupId",
                        column: x => x.SimilarProductGroupId,
                        principalTable: "SimilarProductGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ParentCategoryID", "Title", "isActual" },
                values: new object[,]
                {
                    { 7, 1, "Ліки та профілактичні засоби", null },
                    { 8, 1, "Вітаміни та мінерали", null },
                    { 9, 1, "Краса та догляд", null },
                    { 10, 1, "Спорт та здоров'я", null },
                    { 11, 1, "Товари для дітей та мам", null },
                    { 12, 1, "Вироби медичного призначення", null },
                    { 13, 1, "Ортопедія та реабілітація", null },
                    { 14, 1, "Медична техніка", null },
                    { 15, 1, "Товари для тварин", null }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "PathToPhoto", "ShortDescription", "Title" },
                values: new object[] { "...", "/images/product/Аскорбінка 1.webp", "таблетки зі смак. апельсину по 25 мг №10 в етикет.", "Аскорбінка-КВ" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "BrandId", "CategoryID", "Description", "ManufacturerID", "PathToPhoto", "ProductStatusID", "SeriesId", "ShortDescription", "Title" },
                values: new object[,]
                {
                    { 2, 3, 6, "..", 3, "/images/product/Аскорбінка 2.webp", null, 1, "таблетки зі смак. манго по 25 мг №10 в етикет.", "Аскорбінка-КВ" },
                    { 3, 3, 6, "..", 3, "/images/product/Аскорбінка 3.jpg", null, 1, "таблетки зі смак. полуниці по 25 мг №10 в етикет.", "Аскорбінка-КВ" },
                    { 4, 3, 6, "..", 3, "/images/product/Аскорбінка 4.jpg", null, 1, "таблетки зі смак. тутті-фруті по 25 мг №10 в етикет.", "Аскорбінка-КВ" }
                });

            migrationBuilder.InsertData(
                table: "SimilarProductGroups",
                columns: new[] { "Id", "Name", "SimilarBy" },
                values: new object[] { 1, "Смаки Аскорбінок", "Смак" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ParentCategoryID", "Title", "isActual" },
                values: new object[,]
                {
                    { 16, 14, "Тонометри", null },
                    { 17, 14, "Глюкометри", null }
                });

            migrationBuilder.InsertData(
                table: "Medicines",
                columns: new[] { "Id", "ActiveSubstanceID" },
                values: new object[,]
                {
                    { 2, 1 },
                    { 3, 1 },
                    { 4, 1 }
                });

            migrationBuilder.InsertData(
                table: "SimilarProductItems",
                columns: new[] { "Id", "ProductID", "SimilarProductGroupId", "Title" },
                values: new object[,]
                {
                    { 1, 1, 1, "Апельсин" },
                    { 2, 2, 1, "Манго" },
                    { 3, 3, 1, "Полуниця" },
                    { 4, 4, 1, "Тутті-фруті" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "BrandId", "CategoryID", "Description", "ManufacturerID", "PathToPhoto", "ProductStatusID", "SeriesId", "ShortDescription", "Title" },
                values: new object[,]
                {
                    { 5, 3, 16, "..", 3, "/images/product/Тонометр.jpg", null, 1, "Медхауз Свіс ГмбХ, ТОВ", "Тонометр ProMedica Classic автоматичний" },
                    { 6, 3, 17, "..", 3, "/images/product/Глюкометр.jpg", null, 1, "Infopia Co. Ltd.", "Глюкометр GluNeo Lite" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SimilarProductItems_ProductID",
                table: "SimilarProductItems",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_SimilarProductItems_SimilarProductGroupId",
                table: "SimilarProductItems",
                column: "SimilarProductGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SimilarProductItems");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SimilarProductGroups",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.AddColumn<int>(
                name: "SimilarProductGroupId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "PathToPhoto", "ShortDescription", "SimilarProductGroupId", "Title" },
                values: new object[] { "Аскорбінка.", "/images/product/787f9b1f-f81c-4089-9382-57fd0cf0be15.webp", "таблетки зі смак. полун. по 25 мг №10 в етикет.", null, "Аскорбінка" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_SimilarProductGroupId",
                table: "Products",
                column: "SimilarProductGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_SimilarProductGroups_SimilarProductGroupId",
                table: "Products",
                column: "SimilarProductGroupId",
                principalTable: "SimilarProductGroups",
                principalColumn: "Id");
        }
    }
}
