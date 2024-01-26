using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedNewActiveSubstances : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ActiveSubstances",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { 2, "парацетамол" },
                    { 3, "кофеїн" },
                    { 4, "ацетилсаліцилова кислота" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ActiveSubstances",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "ActiveSubstances",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "ActiveSubstances",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
