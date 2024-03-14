using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ChangeReservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConcreteProductReservation");

            migrationBuilder.CreateTable(
                name: "ReservationItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConcreteProductID = table.Column<int>(type: "int", nullable: false),
                    ReservationID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservationItems_ConcreteProducts_ConcreteProductID",
                        column: x => x.ConcreteProductID,
                        principalTable: "ConcreteProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationItems_Reservations_ReservationID",
                        column: x => x.ReservationID,
                        principalTable: "Reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationItems_ConcreteProductID",
                table: "ReservationItems",
                column: "ConcreteProductID");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationItems_ReservationID",
                table: "ReservationItems",
                column: "ReservationID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationItems");

            migrationBuilder.CreateTable(
                name: "ConcreteProductReservation",
                columns: table => new
                {
                    ConcreteProductsId = table.Column<int>(type: "int", nullable: false),
                    ReservationsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcreteProductReservation", x => new { x.ConcreteProductsId, x.ReservationsId });
                    table.ForeignKey(
                        name: "FK_ConcreteProductReservation_ConcreteProducts_ConcreteProductsId",
                        column: x => x.ConcreteProductsId,
                        principalTable: "ConcreteProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConcreteProductReservation_Reservations_ReservationsId",
                        column: x => x.ReservationsId,
                        principalTable: "Reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConcreteProductReservation_ReservationsId",
                table: "ConcreteProductReservation",
                column: "ReservationsId");
        }
    }
}
