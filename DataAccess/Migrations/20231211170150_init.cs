using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ParentCategoryID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryID);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentCategoryID",
                        column: x => x.ParentCategoryID,
                        principalTable: "Categories",
                        principalColumn: "CategoryID");
                });

            migrationBuilder.CreateTable(
                name: "PharmaCompanies",
                columns: table => new
                {
                    PharmaCompanyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PharmaCompanies", x => x.PharmaCompanyID);
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK_Product_Categories_CategoryID",
                        column: x => x.CategoryID,
                        principalTable: "Categories",
                        principalColumn: "CategoryID");
                });

            migrationBuilder.CreateTable(
                name: "Pharmacies",
                columns: table => new
                {
                    PharmacyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Coord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PharmaCompanyID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pharmacies", x => x.PharmacyID);
                    table.ForeignKey(
                        name: "FK_Pharmacies_PharmaCompanies_PharmaCompanyID",
                        column: x => x.PharmaCompanyID,
                        principalTable: "PharmaCompanies",
                        principalColumn: "PharmaCompanyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConcreteProducts",
                columns: table => new
                {
                    ConcreteProductID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcreteProducts", x => x.ConcreteProductID);
                    table.ForeignKey(
                        name: "FK_ConcreteProducts_Product_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Medicines",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    SpecialRow = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicines", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK_Medicines_Product_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryID", "ParentCategoryID", "Title" },
                values: new object[] { 1, null, "Каталог Товарів" });

            migrationBuilder.InsertData(
                table: "PharmaCompanies",
                columns: new[] { "PharmaCompanyID", "Description", "Title" },
                values: new object[] { 1, "АНЦ.", "АНЦ" });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryID", "ParentCategoryID", "Title" },
                values: new object[] { 2, 1, "Ліки та профілактичні засоби" });

            migrationBuilder.InsertData(
                table: "Pharmacies",
                columns: new[] { "PharmacyID", "Address", "Coord", "PharmaCompanyID" },
                values: new object[] { 1, "Temp Address", "Temp Coord", 1 });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryID", "ParentCategoryID", "Title" },
                values: new object[,]
                {
                    { 3, 2, "Вітаміни" },
                    { 4, 3, "Вітамін С" },
                    { 5, 4, "Аскорбінка" },
                    { 6, 5, "Аскорбінка-КВ" }
                });

            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "ProductID", "CategoryID", "Description", "Title" },
                values: new object[] { 1, 6, "Аскорбінка.", "Аскорбінка" });

            migrationBuilder.InsertData(
                table: "ConcreteProducts",
                columns: new[] { "ConcreteProductID", "Price", "ProductID", "Quantity" },
                values: new object[] { 1, 100.0, 1, 2 });

            migrationBuilder.InsertData(
                table: "Medicines",
                columns: new[] { "ProductID", "SpecialRow" },
                values: new object[] { 1, "Special Temp Row" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentCategoryID",
                table: "Categories",
                column: "ParentCategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_ConcreteProducts_ProductID",
                table: "ConcreteProducts",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_Pharmacies_PharmaCompanyID",
                table: "Pharmacies",
                column: "PharmaCompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryID",
                table: "Product",
                column: "CategoryID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConcreteProducts");

            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.DropTable(
                name: "Pharmacies");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "PharmaCompanies");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
