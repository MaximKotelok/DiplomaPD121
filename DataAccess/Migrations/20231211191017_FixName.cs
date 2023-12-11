using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class FixName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.CreateTable(
                name: "Medicine",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    SpecialRow = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicine", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK_Medicine_Product_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Medicine",
                columns: new[] { "ProductID", "SpecialRow" },
                values: new object[] { 1, "Special Temp Row" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medicine");

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
                table: "Medicines",
                columns: new[] { "ProductID", "SpecialRow" },
                values: new object[] { 1, "Special Temp Row" });
        }
    }
}
