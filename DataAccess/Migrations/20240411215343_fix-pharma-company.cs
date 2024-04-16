using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fixpharmacompany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "PharmaCompanies",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "PharmaCompanies",
                keyColumn: "Id",
                keyValue: 1,
                column: "UserID",
                value: null);

            migrationBuilder.UpdateData(
                table: "PharmaCompanies",
                keyColumn: "Id",
                keyValue: 2,
                column: "UserID",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_PharmaCompanies_UserID",
                table: "PharmaCompanies",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_PharmaCompanies_AspNetUsers_UserID",
                table: "PharmaCompanies",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PharmaCompanies_AspNetUsers_UserID",
                table: "PharmaCompanies");

            migrationBuilder.DropIndex(
                name: "IX_PharmaCompanies_UserID",
                table: "PharmaCompanies");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "PharmaCompanies");

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
    }
}
