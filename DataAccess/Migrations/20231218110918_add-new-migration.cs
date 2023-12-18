using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Repository.Migrations
{
    /// <inheritdoc />
    public partial class addnewmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActiveSubstances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActiveSubstances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentCategoryID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentCategoryID",
                        column: x => x.ParentCategoryID,
                        principalTable: "Categories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Citys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NameCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Longitude = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Citys", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PharmaCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmaCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pharmacies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Coord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PharmaCompanyID = table.Column<int>(type: "int", nullable: false),
                    CityID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pharmacies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pharmacies_Citys_CityID",
                        column: x => x.CityID,
                        principalTable: "Citys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pharmacies_PharmaCompanies_PharmaCompanyID",
                        column: x => x.PharmaCompanyID,
                        principalTable: "PharmaCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryID = table.Column<int>(type: "int", nullable: true),
                    PharmacyID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Products_Pharmacies_PharmacyID",
                        column: x => x.PharmacyID,
                        principalTable: "Pharmacies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ConcreteProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcreteProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConcreteProducts_Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medicines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ActiveSubstanceID = table.Column<int>(type: "int", nullable: false),
                    SpecialRow = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                table: "ActiveSubstances",
                columns: new[] { "Id", "Title" },
                values: new object[] { 1, "аскорбінова кислота" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ParentCategoryID", "Title" },
                values: new object[] { 1, null, "Каталог Товарів" });

            migrationBuilder.InsertData(
                table: "Citys",
                columns: new[] { "Id", "Latitude", "Longitude", "NameCity" },
                values: new object[] { 1, "213213", "214124124", "Львів" });

            migrationBuilder.InsertData(
                table: "PharmaCompanies",
                columns: new[] { "Id", "Description", "Title" },
                values: new object[] { 1, "АНЦ.", "АНЦ" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ParentCategoryID", "Title" },
                values: new object[] { 2, 1, "Ліки та профілактичні засоби" });

            migrationBuilder.InsertData(
                table: "Pharmacies",
                columns: new[] { "Id", "Address", "CityID", "Coord", "PharmaCompanyID" },
                values: new object[] { 1, "Temp Address", 1, "Temp Coord", 1 });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ParentCategoryID", "Title" },
                values: new object[,]
                {
                    { 3, 2, "Вітаміни" },
                    { 4, 3, "Вітамін С" },
                    { 5, 4, "Аскорбінка" },
                    { 6, 5, "Аскорбінка-КВ" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryID", "Description", "PharmacyID", "Title" },
                values: new object[] { 1, 6, "Аскорбінка.", 1, "Аскорбінка" });

            migrationBuilder.InsertData(
                table: "ConcreteProducts",
                columns: new[] { "Id", "Price", "ProductID", "Quantity" },
                values: new object[] { 1, 100.0, 1, 2 });

            migrationBuilder.InsertData(
                table: "Medicines",
                columns: new[] { "Id", "ActiveSubstanceID", "SpecialRow" },
                values: new object[] { 1, 1, "Special Temp Row" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentCategoryID",
                table: "Categories",
                column: "ParentCategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_ConcreteProducts_ProductID",
                table: "ConcreteProducts",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_ActiveSubstanceID",
                table: "Medicines",
                column: "ActiveSubstanceID");

            migrationBuilder.CreateIndex(
                name: "IX_Pharmacies_CityID",
                table: "Pharmacies",
                column: "CityID");

            migrationBuilder.CreateIndex(
                name: "IX_Pharmacies_PharmaCompanyID",
                table: "Pharmacies",
                column: "PharmaCompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryID",
                table: "Products",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_PharmacyID",
                table: "Products",
                column: "PharmacyID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConcreteProducts");

            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.DropTable(
                name: "ActiveSubstances");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Pharmacies");

            migrationBuilder.DropTable(
                name: "Citys");

            migrationBuilder.DropTable(
                name: "PharmaCompanies");
        }
    }
}
