using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ProductAttributeGroupUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDisableShow",
                table: "ProductAttributeGroups",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PathToPhoto",
                table: "ProductAttributeGroups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "IsDisableShow", "PathToPhoto" },
                values: new object[] { true, null });

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "IsDisableShow", "PathToPhoto" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "IsDisableShow", "PathToPhoto" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "IsDisableShow", "PathToPhoto" },
                values: new object[] { null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDisableShow",
                table: "ProductAttributeGroups");

            migrationBuilder.DropColumn(
                name: "PathToPhoto",
                table: "ProductAttributeGroups");
        }
    }
}
