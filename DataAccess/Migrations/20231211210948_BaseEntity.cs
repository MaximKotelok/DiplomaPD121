using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class BaseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medicine_Product_ProductID",
                table: "Medicine");

            migrationBuilder.RenameColumn(
                name: "ProductID",
                table: "Product",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "PharmaCompanyID",
                table: "PharmaCompanies",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "PharmacyID",
                table: "Pharmacies",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ProductID",
                table: "Medicine",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ConcreteProductID",
                table: "ConcreteProducts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "CategoryID",
                table: "Categories",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicine_Product_Id",
                table: "Medicine",
                column: "Id",
                principalTable: "Product",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medicine_Product_Id",
                table: "Medicine");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Product",
                newName: "ProductID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "PharmaCompanies",
                newName: "PharmaCompanyID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Pharmacies",
                newName: "PharmacyID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Medicine",
                newName: "ProductID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ConcreteProducts",
                newName: "ConcreteProductID");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Categories",
                newName: "CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicine_Product_ProductID",
                table: "Medicine",
                column: "ProductID",
                principalTable: "Product",
                principalColumn: "ProductID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
