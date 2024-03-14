using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class pahrama_company_user : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PharmaCompanyId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_PharmaCompanyId",
                table: "AspNetUsers",
                column: "PharmaCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_PharmaCompanies_PharmaCompanyId",
                table: "AspNetUsers",
                column: "PharmaCompanyId",
                principalTable: "PharmaCompanies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_PharmaCompanies_PharmaCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_PharmaCompanyId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PharmaCompanyId",
                table: "AspNetUsers");
        }
    }
}
