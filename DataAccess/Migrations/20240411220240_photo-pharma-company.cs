using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class photopharmacompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PathToPhoto",
                table: "PharmaCompanies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PharmaCompanies",
                keyColumn: "Id",
                keyValue: 1,
                column: "PathToPhoto",
                value: null);

            migrationBuilder.UpdateData(
                table: "PharmaCompanies",
                keyColumn: "Id",
                keyValue: 2,
                column: "PathToPhoto",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PathToPhoto",
                table: "PharmaCompanies");
        }
    }
}
