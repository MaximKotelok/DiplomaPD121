using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addPermissionTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdultsId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AllergiesId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChildrenId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DiabeticsId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DriversId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NursingMothersId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PregnantId",
                table: "Medicines",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PermissionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermissionTypes", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AdultsId", "AllergiesId", "ChildrenId", "DiabeticsId", "DriversId", "NursingMothersId", "PregnantId" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AdultsId", "AllergiesId", "ChildrenId", "DiabeticsId", "DriversId", "NursingMothersId", "PregnantId" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AdultsId", "AllergiesId", "ChildrenId", "DiabeticsId", "DriversId", "NursingMothersId", "PregnantId" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AdultsId", "AllergiesId", "ChildrenId", "DiabeticsId", "DriversId", "NursingMothersId", "PregnantId" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_AdultsId",
                table: "Medicines",
                column: "AdultsId");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_AllergiesId",
                table: "Medicines",
                column: "AllergiesId");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_ChildrenId",
                table: "Medicines",
                column: "ChildrenId");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_DiabeticsId",
                table: "Medicines",
                column: "DiabeticsId");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_DriversId",
                table: "Medicines",
                column: "DriversId");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_NursingMothersId",
                table: "Medicines",
                column: "NursingMothersId");

            migrationBuilder.CreateIndex(
                name: "IX_Medicines_PregnantId",
                table: "Medicines",
                column: "PregnantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_AdultsId",
                table: "Medicines",
                column: "AdultsId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_AllergiesId",
                table: "Medicines",
                column: "AllergiesId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_ChildrenId",
                table: "Medicines",
                column: "ChildrenId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_DiabeticsId",
                table: "Medicines",
                column: "DiabeticsId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_DriversId",
                table: "Medicines",
                column: "DriversId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_NursingMothersId",
                table: "Medicines",
                column: "NursingMothersId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_PregnantId",
                table: "Medicines",
                column: "PregnantId",
                principalTable: "PermissionTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_AdultsId",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_AllergiesId",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_ChildrenId",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_DiabeticsId",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_DriversId",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_NursingMothersId",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_PregnantId",
                table: "Medicines");

            migrationBuilder.DropTable(
                name: "PermissionTypes");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_AdultsId",
                table: "Medicines");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_AllergiesId",
                table: "Medicines");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_ChildrenId",
                table: "Medicines");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_DiabeticsId",
                table: "Medicines");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_DriversId",
                table: "Medicines");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_NursingMothersId",
                table: "Medicines");

            migrationBuilder.DropIndex(
                name: "IX_Medicines_PregnantId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "AdultsId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "AllergiesId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "ChildrenId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "DiabeticsId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "DriversId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "NursingMothersId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "PregnantId",
                table: "Medicines");
        }
    }
}
