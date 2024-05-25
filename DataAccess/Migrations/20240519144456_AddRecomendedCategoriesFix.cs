using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddRecomendedCategoriesFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 921,
                column: "PathToRecomendedPhoto",
                value: "/images/category/recomended/1.png");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 922,
                column: "PathToRecomendedPhoto",
                value: "/images/category/recomended/2.png");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 923,
                column: "PathToRecomendedPhoto",
                value: "/images/category/recomended/3.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 921,
                column: "PathToRecomendedPhoto",
                value: "/images/category/recomemnded/1.png");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 922,
                column: "PathToRecomendedPhoto",
                value: "/images/category/recomemnded/2.png");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 923,
                column: "PathToRecomendedPhoto",
                value: "/images/category/recomemnded/3.png");
        }
    }
}
