using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class MedicinesRemove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

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
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.AddColumn<int>(
                name: "ActiveSubstanceID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "ActiveSubstanceID", "BrandId", "CategoryID", "Description", "Discriminator", "ManufacturerID", "PathToPhoto", "ProductStatusID", "SeriesId", "ShortDescription", "Title" },
                values: new object[,]
                {
                    { 1, 1, 3, 6, "...", "Product", 3, "/images/product/Аскорбінка 1.webp", null, 1, "таблетки зі смак. апельсину по 25 мг №10 в етикет.", "Аскорбінка-КВ" },
                    { 2, 1, 3, 6, "..", "Product", 3, "/images/product/Аскорбінка 2.webp", null, 1, "таблетки зі смак. манго по 25 мг №10 в етикет.", "Аскорбінка-КВ" },
                    { 3, 1, 3, 6, "..", "Product", 3, "/images/product/Аскорбінка 3.jpg", null, 1, "таблетки зі смак. полуниці по 25 мг №10 в етикет.", "Аскорбінка-КВ" },
                    { 4, 1, 3, 6, "..", "Product", 3, "/images/product/Аскорбінка 4.jpg", null, 1, "таблетки зі смак. тутті-фруті по 25 мг №10 в етикет.", "Аскорбінка-КВ" },
                    { 5, null, 3, 15, "..", "Product", 3, "/images/product/Тонометр.jpg", null, 1, "Медхауз Свіс ГмбХ, ТОВ", "Тонометр ProMedica Classic автоматичний" },
                    { 6, null, 3, 16, "..", "Product", 3, "/images/product/Глюкометр.jpg", null, 1, "Infopia Co. Ltd.", "Глюкометр GluNeo Lite" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ActiveSubstanceID",
                table: "Products",
                column: "ActiveSubstanceID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ActiveSubstances_ActiveSubstanceID",
                table: "Products",
                column: "ActiveSubstanceID",
                principalTable: "ActiveSubstances",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ActiveSubstances_ActiveSubstanceID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ActiveSubstanceID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ActiveSubstanceID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Products");

            migrationBuilder.CreateTable(
                name: "Medicines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ActiveSubstanceID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medicines_ActiveSubstances_ActiveSubstanceID",
                        column: x => x.ActiveSubstanceID,
                        principalTable: "ActiveSubstances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Medicines_Products_Id",
                        column: x => x.Id,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Medicines",
                columns: new[] { "Id", "ActiveSubstanceID" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 },
                    { 3, 1 },
                    { 4, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_ActiveSubstanceID",
                table: "Medicines",
                column: "ActiveSubstanceID");
        }
    }
}
