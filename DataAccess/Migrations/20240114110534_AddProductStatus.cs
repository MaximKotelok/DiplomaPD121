using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddProductStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductStatusID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductStatuses", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ProductStatuses",
                columns: new[] { "Id", "Status" },
                values: new object[,]
                {
                    { 1, "Підтверджено" },
                    { 2, "На розгляді" },
                    { 3, "Відхилено" }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ProductStatusID",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductStatusID",
                table: "Products",
                column: "ProductStatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductStatuses_ProductStatusID",
                table: "Products",
                column: "ProductStatusID",
                principalTable: "ProductStatuses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductStatuses_ProductStatusID",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ProductStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductStatusID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductStatusID",
                table: "Products");
        }
    }
}
