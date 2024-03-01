using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addPharmacyToReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PharmacyID",
                table: "Reservations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_PharmacyID",
                table: "Reservations",
                column: "PharmacyID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Pharmacies_PharmacyID",
                table: "Reservations",
                column: "PharmacyID",
                principalTable: "Pharmacies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Pharmacies_PharmacyID",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_PharmacyID",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PharmacyID",
                table: "Reservations");
        }
    }
}
