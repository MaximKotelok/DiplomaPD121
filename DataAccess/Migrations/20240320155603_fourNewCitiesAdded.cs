using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fourNewCitiesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Citys",
                columns: new[] { "Id", "Latitude", "Longitude", "NameCity" },
                values: new object[,]
                {
                    { 2, "48.621025", "22.288229", "Ужгород" },
                    { 3, "49.2333", "28.4833", "Вінниця" },
                    { 4, "50.4500", "30.5233", "Київ" },
                    { 5, "49.5667", "25.6000", "Тернопіль" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Citys",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Citys",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Citys",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Citys",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
