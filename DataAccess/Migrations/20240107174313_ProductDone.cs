using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ProductDone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeId", "ProductId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeId", "ProductId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeId", "ProductId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ManufacturerID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SeriesId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductAttributeGroupID",
                table: "Attributes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProductAttributeGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductAttributeGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReservationStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountryBrandID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Brands_Countries_CountryBrandID",
                        column: x => x.CountryBrandID,
                        principalTable: "Countries",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Manufacturers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    URLSite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountryManufactureID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Manufacturers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Manufacturers_Countries_CountryManufactureID",
                        column: x => x.CountryManufactureID,
                        principalTable: "Countries",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConcreteProductID = table.Column<int>(type: "int", nullable: false),
                    ToGetReservationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReservedTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reservations_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservations_ConcreteProducts_ConcreteProductID",
                        column: x => x.ConcreteProductID,
                        principalTable: "ConcreteProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservations_ReservationStatuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "ReservationStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "ProductAttributeGroupID" },
                values: new object[] { "Види тварин", 3 });

            migrationBuilder.UpdateData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "ProductAttributeGroupID" },
                values: new object[] { "Вага", 3 });

            migrationBuilder.UpdateData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Name", "ProductAttributeGroupID" },
                values: new object[] { "Тип іграшки", 3 });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Ukraine" },
                    { 2, "Poland" },
                    { 3, "USA" }
                });

            migrationBuilder.InsertData(
                table: "ProductAttributeGroups",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Загальні" },
                    { 2, "Таблетки" },
                    { 3, "Товари для тварин" },
                    { 4, "Медична техніка" }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "BrandId", "ManufacturerID", "SeriesId" },
                values: new object[] { 3, 3, 1 });

            migrationBuilder.InsertData(
                table: "ReservationStatuses",
                columns: new[] { "Id", "Status" },
                values: new object[,]
                {
                    { 1, "В очікуванні" },
                    { 2, "Підтверджено" },
                    { 3, "Скасовано" },
                    { 4, "Завершено" }
                });

            migrationBuilder.InsertData(
                table: "Series",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 1, "Some desc", "Some title" });

            migrationBuilder.InsertData(
                table: "Attributes",
                columns: new[] { "Id", "Index", "Name", "ProductAttributeGroupID" },
                values: new object[,]
                {
                    { 4, 4, "Матеріал виготовлення", 3 },
                    { 5, 5, "Додаткові функції", 3 },
                    { 6, 6, "Призначення", 3 },
                    { 7, 7, "Серія/Лінійка", 3 },
                    { 8, 8, "Об'єм", 3 },
                    { 9, 9, "Вік тварини", 3 },
                    { 10, 10, "Розмір", 3 },
                    { 11, 11, "Дозування (ветеринарія)", 3 },
                    { 12, 12, "Діюча речовина (ветеринарія)", 3 },
                    { 13, 13, "Вага тварини", 3 },
                    { 14, 14, "Клас корму", 3 },
                    { 15, 15, "Інгредієнти", 3 },
                    { 16, 16, "Розмір тварини", 3 },
                    { 17, 17, "Тип корму", 3 },
                    { 18, 18, "Довжина", 3 },
                    { 19, 19, "Ширина", 3 },
                    { 20, 20, "Особливість", 3 },
                    { 21, 21, "Колір", 3 },
                    { 22, 22, "Максимальне навантаження", 3 },
                    { 23, 23, "Тип", 3 },
                    { 24, 24, "Тип туалету", 3 },
                    { 25, 25, "Види риб", 3 },
                    { 26, 26, "Вид наповнювача за складом", 3 },
                    { 27, 27, "Види тварин", 3 },
                    { 28, 28, "Види птахів", 3 },
                    { 30, 1, "Гарантія виробника", 4 },
                    { 31, 2, "Тип", 4 },
                    { 32, 3, "Колір", 4 },
                    { 33, 4, "Ступінь втрати слуху", 4 },
                    { 34, 5, "Характеристики", 4 },
                    { 35, 6, "Тип вимірювання", 4 },
                    { 36, 7, "Різновид інгаляторів", 4 },
                    { 37, 8, "Тип вимірювання тиску", 4 },
                    { 38, 9, "Розмір манжети", 4 },
                    { 39, 10, "Властивості", 4 },
                    { 40, 11, "Зовнішній діаметр голки, мм", 4 },
                    { 41, 12, "Довжина голки", 4 },
                    { 42, 13, "Зовнішній діаметр голки, мм", 4 },
                    { 43, 14, "Концентрація інсуліна (U)", 4 },
                    { 44, 15, "Тип голки в комплекті", 4 },
                    { 45, 16, "Кількість елементів", 4 },
                    { 46, 17, "Термін використання", 4 },
                    { 47, 18, "Вимірювання показників", 4 },
                    { 49, 19, "Обсяг забору крові", 4 },
                    { 50, 20, "Калібрування", 4 }
                });

            migrationBuilder.InsertData(
                table: "Brands",
                columns: new[] { "Id", "CountryBrandID", "Description", "Name" },
                values: new object[,]
                {
                    { 1, 3, null, "Brand 1" },
                    { 2, 3, null, "Brand 2" },
                    { 3, 1, "Best brand", "Brand 3" }
                });

            migrationBuilder.InsertData(
                table: "Manufacturers",
                columns: new[] { "Id", "Address", "CountryManufactureID", "Name", "URLSite" },
                values: new object[,]
                {
                    { 1, "Some address 1", 3, "Manufacturer 1", "google.com" },
                    { 2, "Some address 2", 2, "Manufacturer 2", "google.com" },
                    { 3, "Some address 3", 1, "Manufacturer 3", "google.com" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ManufacturerID",
                table: "Products",
                column: "ManufacturerID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_SeriesId",
                table: "Products",
                column: "SeriesId");

            migrationBuilder.CreateIndex(
                name: "IX_Attributes_ProductAttributeGroupID",
                table: "Attributes",
                column: "ProductAttributeGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_Brands_CountryBrandID",
                table: "Brands",
                column: "CountryBrandID");

            migrationBuilder.CreateIndex(
                name: "IX_Manufacturers_CountryManufactureID",
                table: "Manufacturers",
                column: "CountryManufactureID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ConcreteProductID",
                table: "Reservations",
                column: "ConcreteProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_StatusId",
                table: "Reservations",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_UserID",
                table: "Reservations",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Attributes_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Attributes",
                column: "ProductAttributeGroupID",
                principalTable: "ProductAttributeGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Manufacturers_ManufacturerID",
                table: "Products",
                column: "ManufacturerID",
                principalTable: "Manufacturers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Series_SeriesId",
                table: "Products",
                column: "SeriesId",
                principalTable: "Series",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attributes_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Attributes");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Manufacturers_ManufacturerID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Series_SeriesId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Manufacturers");

            migrationBuilder.DropTable(
                name: "ProductAttributeGroups");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Series");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "ReservationStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Products_BrandId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ManufacturerID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_SeriesId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Attributes_ProductAttributeGroupID",
                table: "Attributes");

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ManufacturerID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SeriesId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductAttributeGroupID",
                table: "Attributes");

            migrationBuilder.UpdateData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "SpecialRow1");

            migrationBuilder.UpdateData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "SpecialRow2");

            migrationBuilder.UpdateData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "SpecialRow3");

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "AttributeId", "ProductId", "Value" },
                values: new object[,]
                {
                    { 1, 1, "Some data 1" },
                    { 2, 1, "Some data 2" },
                    { 3, 1, "Some data 3" }
                });
        }
    }
}
