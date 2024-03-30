using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class FillPermissionsInProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { 1, 2, 3, 4, 3, 1, 2 });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { 1, 2, 3, 2, 3, 1, 3 });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { 1, 2, 3, 4, 1, 4, 4 });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { 1, 2, 3, 4, 1, 1, 2 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { null, null, null, null, null, null, null });

            migrationBuilder.UpdateData(
                table: "Medicines",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "AdultsID", "AllergiesID", "ChildrenID", "DiabeticsID", "DriversID", "NursingMothersID", "PregnantID" },
                values: new object[] { null, null, null, null, null, null, null });
        }
    }
}
