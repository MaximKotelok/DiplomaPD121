using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Eav : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SpecialRow",
                table: "Medicines");

            migrationBuilder.CreateTable(
                name: "Attributes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attributes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    AttributeId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => new { x.ProductId, x.AttributeId });
                    table.ForeignKey(
                        name: "FK_Properties_Attributes_AttributeId",
                        column: x => x.AttributeId,
                        principalTable: "Attributes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Properties_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Attributes",
                columns: new[] { "Id", "Index", "Name" },
                values: new object[,]
                {
                    { 1, 1, "SpecialRow1" },
                    { 2, 2, "SpecialRow2" },
                    { 3, 3, "SpecialRow3" }
                });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "AttributeId", "ProductId", "Value" },
                values: new object[,]
                {
                    { 1, 1, "Some data 1" },
                    { 2, 1, "Some data 2" },
                    { 3, 1, "Some data 3" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Properties_AttributeId",
                table: "Properties",
                column: "AttributeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "Attributes");

            migrationBuilder.AddColumn<string>(
                name: "SpecialRow",
                table: "Medicines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 1,
                column: "SpecialRow",
                value: "Special Temp Row");
        }
    }
}
