using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class cascadeDeleteForProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductConfirms_ProductConfirmID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductConfirmID",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductConfirmID",
                table: "Products");

            migrationBuilder.CreateIndex(
                name: "IX_ProductConfirms_ProductID",
                table: "ProductConfirms",
                column: "ProductID",
                unique: true,
                filter: "[ProductID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductConfirms_Products_ProductID",
                table: "ProductConfirms",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductConfirms_Products_ProductID",
                table: "ProductConfirms");

            migrationBuilder.DropIndex(
                name: "IX_ProductConfirms_ProductID",
                table: "ProductConfirms");

            migrationBuilder.AddColumn<int>(
                name: "ProductConfirmID",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 9,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 11,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 12,
                column: "ProductConfirmID",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductConfirmID",
                table: "Products",
                column: "ProductConfirmID",
                unique: true,
                filter: "[ProductConfirmID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductConfirms_ProductConfirmID",
                table: "Products",
                column: "ProductConfirmID",
                principalTable: "ProductConfirms",
                principalColumn: "Id");
        }
    }
}
