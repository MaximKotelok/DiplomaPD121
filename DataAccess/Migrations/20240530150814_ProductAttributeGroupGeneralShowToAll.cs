using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ProductAttributeGroupGeneralShowToAll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsDisableShow",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsDisableShow",
                value: true);
        }
    }
}
