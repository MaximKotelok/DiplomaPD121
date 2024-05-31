using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class IsShowAllProductAttributeGroup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsDisableShow",
                table: "ProductAttributeGroups",
                newName: "IsShowAll");

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsShowAll",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsShowAll",
                table: "ProductAttributeGroups",
                newName: "IsDisableShow");

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsDisableShow",
                value: false);
        }
    }
}
