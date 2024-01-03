using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class SimilarProductGroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SimilarProductGroupId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SimilarProductGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SimilarBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SimilarProductGroups", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "SimilarProductGroupId",
                value: null);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_SimilarProductGroups_SimilarProductGroupId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "SimilarProductGroups");

            migrationBuilder.DropIndex(
                name: "IX_Products_SimilarProductGroupId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SimilarProductGroupId",
                table: "Products");
        }
    }
}
