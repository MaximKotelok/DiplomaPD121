using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ProductAttributeGroupAddDescriptionAndDescriptionName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProductAttributeGroups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionName",
                table: "ProductAttributeGroups",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "DescriptionName" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "DescriptionName" },
                values: new object[] { "<h1>Склад</h1><h1><br></h1><h1>Лікарська форма</h1><h1><br></h1><h1>Фармакотерапевтична група</h1><h1><br></h1><h1>Фармакологічні властивості</h1><h1><br></h1><h1>Показання</h1><h1><br></h1><h1>Протипоказання</h1><h1><br></h1><h1>Взаємодія з іншими лікарськими засобами та інші види взаємодії</h1><h1><br></h1><h1>Особливості щодо застосування</h1><h1><br></h1><h1>Спосіб застосування та дози</h1><h1><br></h1><h1>Передозування</h1><h1><br></h1><h1>Побічні ефекти</h1><h1><br></h1><h1>Термін придатності</h1><p><br></p><h1>Умови зберігання</h1><h1><br></h1><h1>Упаковка</h1><p><br></p><h1>Категорія відпуску</h1><p><br></p><h1>Виробник</h1><p><br></p><h1>Адреса</h1>", "Інструкція" });

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "DescriptionName" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "ProductAttributeGroups",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "DescriptionName" },
                values: new object[] { null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProductAttributeGroups");

            migrationBuilder.DropColumn(
                name: "DescriptionName",
                table: "ProductAttributeGroups");
        }
    }
}
