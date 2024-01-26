using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddProductGroupTypeToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductAttributeGroupID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ProductAttributeGroupID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ProductAttributeGroupID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "ProductAttributeGroupID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "ProductAttributeGroupID",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "ProductAttributeGroupID",
                value: 4);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "ProductAttributeGroupID",
                value: 4);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductAttributeGroupID",
                table: "Products",
                column: "ProductAttributeGroupID");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Products",
                column: "ProductAttributeGroupID",
                principalTable: "ProductAttributeGroups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductAttributeGroupID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductAttributeGroupID",
                table: "Products");
        }
    }
}
