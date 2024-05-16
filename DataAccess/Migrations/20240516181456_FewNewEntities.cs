using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class FewNewEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attributes_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Attributes");

            migrationBuilder.AlterColumn<int>(
                name: "ProductAttributeGroupID",
                table: "Attributes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CanHasProducts", "IsDisplayOnBottom", "IsRecomended", "ParentCategoryID", "PathToPhoto", "PathToRecomendedPhoto", "Title" },
                values: new object[,]
                {
                    { 921, false, null, null, 9, null, "/images/category/recomemnded/1.png", "Схуднення" },
                    { 922, false, null, null, 2, null, "/images/category/recomemnded/2.png", "Від застуди та грипу" },
                    { 923, false, null, null, 2, null, "/images/category/recomemnded/3.png", "Від стресу" }
                });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "<h1>Склад</h1><p>1</p><h1>Лікарська форма</h1><p>2</p><h1>Фармакотерапевтична група</h1><p>3</p><h1>Фармакологічні властивості</h1><p>4</p><h1>Показання</h1><p>5</p><h1>Протипоказання</h1><p>6</p><h1>Взаємодія з іншими лікарськими засобами та інші види взаємодії</h1><p>7</p><h1>Особливості щодо застосування</h1><p>8</p><h1>Спосіб застосування та дози</h1><p>9</p><h1>Передозування</h1><p>10</p><h1>Побічні ефекти</h1><p>11</p><h1>Термін придатності</h1><p>12</p><h1>Умови зберігання</h1><p>13</p><h1>Упаковка</h1><p>14</p><h1>Категорія відпуску</h1><p>15</p><h1>Виробник</h1><p>16</p><h1>Адреса</h1><p>17</p>");

            migrationBuilder.AddForeignKey(
                name: "FK_Attributes_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Attributes",
                column: "ProductAttributeGroupID",
                principalTable: "ProductAttributeGroups",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attributes_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Attributes");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 921);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 922);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 923);

            migrationBuilder.AlterColumn<int>(
                name: "ProductAttributeGroupID",
                table: "Attributes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "...");

            migrationBuilder.AddForeignKey(
                name: "FK_Attributes_ProductAttributeGroups_ProductAttributeGroupID",
                table: "Attributes",
                column: "ProductAttributeGroupID",
                principalTable: "ProductAttributeGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
