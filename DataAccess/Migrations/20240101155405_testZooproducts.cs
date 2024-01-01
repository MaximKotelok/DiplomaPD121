using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class testZooproducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductProperty_ProductAttribute_AttributeId",
                table: "ProductProperty");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductProperty_Products_ProductId",
                table: "ProductProperty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductProperty",
                table: "ProductProperty");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductAttribute",
                table: "ProductAttribute");

            migrationBuilder.RenameTable(
                name: "ProductProperty",
                newName: "Properties");

            migrationBuilder.RenameTable(
                name: "ProductAttribute",
                newName: "Attributes");

            migrationBuilder.RenameIndex(
                name: "IX_ProductProperty_AttributeId",
                table: "Properties",
                newName: "IX_Properties_AttributeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Properties",
                table: "Properties",
                columns: new[] { "ProductId", "AttributeId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Attributes",
                table: "Attributes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Zooproducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    ForTest = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zooproducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zooproducts_Products_Id",
                        column: x => x.Id,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Attributes",
                columns: new[] { "Id", "Index", "Name" },
                values: new object[] { 4, 1, "Zoorow" });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CategoryID", "Description", "PathToPhoto", "Title" },
                values: new object[] { 10, 6, "1", "1", "Zooproduct" });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "AttributeId", "ProductId", "Value" },
                values: new object[] { 4, 10, "Some data 4" });

            migrationBuilder.InsertData(
                table: "Zooproducts",
                columns: new[] { "Id", "ForTest" },
                values: new object[] { 10, "Test" });

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Attributes_AttributeId",
                table: "Properties",
                column: "AttributeId",
                principalTable: "Attributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Attributes_AttributeId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties");

            migrationBuilder.DropTable(
                name: "Zooproducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Properties",
                table: "Properties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Attributes",
                table: "Attributes");

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumns: new[] { "AttributeId", "ProductId" },
                keyValues: new object[] { 4, 10 });

            migrationBuilder.DeleteData(
                table: "Attributes",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.RenameTable(
                name: "Properties",
                newName: "ProductProperty");

            migrationBuilder.RenameTable(
                name: "Attributes",
                newName: "ProductAttribute");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_AttributeId",
                table: "ProductProperty",
                newName: "IX_ProductProperty_AttributeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductProperty",
                table: "ProductProperty",
                columns: new[] { "ProductId", "AttributeId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductAttribute",
                table: "ProductAttribute",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProperty_ProductAttribute_AttributeId",
                table: "ProductProperty",
                column: "AttributeId",
                principalTable: "ProductAttribute",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductProperty_Products_ProductId",
                table: "ProductProperty",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
