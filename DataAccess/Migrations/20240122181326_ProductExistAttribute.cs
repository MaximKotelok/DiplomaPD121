using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ProductExistAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductExistAttributes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupID = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionGetPath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductExistAttributes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductExistAttributes_ProductAttributeGroups_GroupID",
                        column: x => x.GroupID,
                        principalTable: "ProductAttributeGroups",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "ProductExistAttributes",
                columns: new[] { "Id", "ActionGetPath", "Description", "GroupID", "Name" },
                values: new object[] { 1, "ActiveSubstance", "Діюча речовина", 2, "activeSubstanceID" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductExistAttributes_GroupID",
                table: "ProductExistAttributes",
                column: "GroupID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductExistAttributes");
        }
    }
}
