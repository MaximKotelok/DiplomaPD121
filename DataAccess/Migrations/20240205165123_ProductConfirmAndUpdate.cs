using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ProductConfirmAndUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropForeignKey(
                name: "FK_Pharmacies_AspNetUsers_UserId",
                table: "Pharmacies");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductStatuses_ProductStatusID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Series_SeriesId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Attributes_AttributeId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationStatuses_StatusId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_SimilarProductItems_SimilarProductGroups_SimilarProductGroupId",
                table: "SimilarProductItems");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductStatusID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Pharmacies_UserId",
                table: "Pharmacies");

            migrationBuilder.RenameColumn(
                name: "SimilarProductGroupId",
                table: "SimilarProductItems",
                newName: "SimilarProductGroupID");

            migrationBuilder.RenameIndex(
                name: "IX_SimilarProductItems_SimilarProductGroupId",
                table: "SimilarProductItems",
                newName: "IX_SimilarProductItems_SimilarProductGroupID");

            migrationBuilder.RenameColumn(
                name: "StatusId",
                table: "Reservations",
                newName: "StatusID");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_StatusId",
                table: "Reservations",
                newName: "IX_Reservations_StatusID");

            migrationBuilder.RenameColumn(
                name: "AttributeId",
                table: "Properties",
                newName: "AttributeID");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Properties",
                newName: "ProductID");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_AttributeId",
                table: "Properties",
                newName: "IX_Properties_AttributeID");

            migrationBuilder.RenameColumn(
                name: "SeriesId",
                table: "Products",
                newName: "SeriesID");

            migrationBuilder.RenameColumn(
                name: "BrandId",
                table: "Products",
                newName: "BrandID");

            migrationBuilder.RenameColumn(
                name: "ProductStatusID",
                table: "Products",
                newName: "ProductConfirmID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_SeriesId",
                table: "Products",
                newName: "IX_Products_SeriesID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                newName: "IX_Products_BrandID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Pharmacies",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "PregnantId",
                table: "Medicines",
                newName: "PregnantID");

            migrationBuilder.RenameColumn(
                name: "NursingMothersId",
                table: "Medicines",
                newName: "NursingMothersID");

            migrationBuilder.RenameColumn(
                name: "DriversId",
                table: "Medicines",
                newName: "DriversID");

            migrationBuilder.RenameColumn(
                name: "DiabeticsId",
                table: "Medicines",
                newName: "DiabeticsID");

            migrationBuilder.RenameColumn(
                name: "ChildrenId",
                table: "Medicines",
                newName: "ChildrenID");

            migrationBuilder.RenameColumn(
                name: "AllergiesId",
                table: "Medicines",
                newName: "AllergiesID");

            migrationBuilder.RenameColumn(
                name: "AdultsId",
                table: "Medicines",
                newName: "AdultsID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_PregnantId",
                table: "Medicines",
                newName: "IX_Medicines_PregnantID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_NursingMothersId",
                table: "Medicines",
                newName: "IX_Medicines_NursingMothersID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_DriversId",
                table: "Medicines",
                newName: "IX_Medicines_DriversID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_DiabeticsId",
                table: "Medicines",
                newName: "IX_Medicines_DiabeticsID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_ChildrenId",
                table: "Medicines",
                newName: "IX_Medicines_ChildrenID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_AllergiesId",
                table: "Medicines",
                newName: "IX_Medicines_AllergiesID");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_AdultsId",
                table: "Medicines",
                newName: "IX_Medicines_AdultsID");

            migrationBuilder.CreateTable(
                name: "ProductConfirms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PharmacompanyID = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    ProductStatusID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductConfirms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductConfirms_PharmaCompanies_PharmacompanyID",
                        column: x => x.PharmacompanyID,
                        principalTable: "PharmaCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductConfirms_ProductStatuses_ProductStatusID",
                        column: x => x.ProductStatusID,
                        principalTable: "ProductStatuses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductConfirmID",
                table: "Products",
                column: "ProductConfirmID",
                unique: true,
                filter: "[ProductConfirmID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Pharmacies_UserID",
                table: "Pharmacies",
                column: "UserID",
                unique: true,
                filter: "[UserID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ProductConfirms_PharmacompanyID",
                table: "ProductConfirms",
                column: "PharmacompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_ProductConfirms_ProductStatusID",
                table: "ProductConfirms",
                column: "ProductStatusID");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_AdultsID",
                table: "Medicines",
                column: "AdultsID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_AllergiesID",
                table: "Medicines",
                column: "AllergiesID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_ChildrenID",
                table: "Medicines",
                column: "ChildrenID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_DiabeticsID",
                table: "Medicines",
                column: "DiabeticsID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_DriversID",
                table: "Medicines",
                column: "DriversID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_NursingMothersID",
                table: "Medicines",
                column: "NursingMothersID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medicines_PermissionTypes_PregnantID",
                table: "Medicines",
                column: "PregnantID",
                principalTable: "PermissionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pharmacies_AspNetUsers_UserID",
                table: "Pharmacies",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Brands_BrandID",
                table: "Products",
                column: "BrandID",
                principalTable: "Brands",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductConfirms_ProductConfirmID",
                table: "Products",
                column: "ProductConfirmID",
                principalTable: "ProductConfirms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Series_SeriesID",
                table: "Products",
                column: "SeriesID",
                principalTable: "Series",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Attributes_AttributeID",
                table: "Properties",
                column: "AttributeID",
                principalTable: "Attributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Products_ProductID",
                table: "Properties",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationStatuses_StatusID",
                table: "Reservations",
                column: "StatusID",
                principalTable: "ReservationStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SimilarProductItems_SimilarProductGroups_SimilarProductGroupID",
                table: "SimilarProductItems",
                column: "SimilarProductGroupID",
                principalTable: "SimilarProductGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_AdultsID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_AllergiesID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_ChildrenID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_DiabeticsID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_DriversID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_NursingMothersID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Medicines_PermissionTypes_PregnantID",
                table: "Medicines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pharmacies_AspNetUsers_UserID",
                table: "Pharmacies");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Brands_BrandID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductConfirms_ProductConfirmID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Series_SeriesID",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Attributes_AttributeID",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Properties_Products_ProductID",
                table: "Properties");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_ReservationStatuses_StatusID",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_SimilarProductItems_SimilarProductGroups_SimilarProductGroupID",
                table: "SimilarProductItems");

            migrationBuilder.DropTable(
                name: "ProductConfirms");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductConfirmID",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Pharmacies_UserID",
                table: "Pharmacies");

            migrationBuilder.RenameColumn(
                name: "SimilarProductGroupID",
                table: "SimilarProductItems",
                newName: "SimilarProductGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_SimilarProductItems_SimilarProductGroupID",
                table: "SimilarProductItems",
                newName: "IX_SimilarProductItems_SimilarProductGroupId");

            migrationBuilder.RenameColumn(
                name: "StatusID",
                table: "Reservations",
                newName: "StatusId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_StatusID",
                table: "Reservations",
                newName: "IX_Reservations_StatusId");

            migrationBuilder.RenameColumn(
                name: "AttributeID",
                table: "Properties",
                newName: "AttributeId");

            migrationBuilder.RenameColumn(
                name: "ProductID",
                table: "Properties",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Properties_AttributeID",
                table: "Properties",
                newName: "IX_Properties_AttributeId");

            migrationBuilder.RenameColumn(
                name: "SeriesID",
                table: "Products",
                newName: "SeriesId");

            migrationBuilder.RenameColumn(
                name: "BrandID",
                table: "Products",
                newName: "BrandId");

            migrationBuilder.RenameColumn(
                name: "ProductConfirmID",
                table: "Products",
                newName: "ProductStatusID");

            migrationBuilder.RenameIndex(
                name: "IX_Products_SeriesID",
                table: "Products",
                newName: "IX_Products_SeriesId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_BrandID",
                table: "Products",
                newName: "IX_Products_BrandId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Pharmacies",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "PregnantID",
                table: "Medicines",
                newName: "PregnantId");

            migrationBuilder.RenameColumn(
                name: "NursingMothersID",
                table: "Medicines",
                newName: "NursingMothersId");

            migrationBuilder.RenameColumn(
                name: "DriversID",
                table: "Medicines",
                newName: "DriversId");

            migrationBuilder.RenameColumn(
                name: "DiabeticsID",
                table: "Medicines",
                newName: "DiabeticsId");

            migrationBuilder.RenameColumn(
                name: "ChildrenID",
                table: "Medicines",
                newName: "ChildrenId");

            migrationBuilder.RenameColumn(
                name: "AllergiesID",
                table: "Medicines",
                newName: "AllergiesId");

            migrationBuilder.RenameColumn(
                name: "AdultsID",
                table: "Medicines",
                newName: "AdultsId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_PregnantID",
                table: "Medicines",
                newName: "IX_Medicines_PregnantId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_NursingMothersID",
                table: "Medicines",
                newName: "IX_Medicines_NursingMothersId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_DriversID",
                table: "Medicines",
                newName: "IX_Medicines_DriversId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_DiabeticsID",
                table: "Medicines",
                newName: "IX_Medicines_DiabeticsId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_ChildrenID",
                table: "Medicines",
                newName: "IX_Medicines_ChildrenId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_AllergiesID",
                table: "Medicines",
                newName: "IX_Medicines_AllergiesId");

            migrationBuilder.RenameIndex(
                name: "IX_Medicines_AdultsID",
                table: "Medicines",
                newName: "IX_Medicines_AdultsId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductStatusID",
                table: "Products",
                column: "ProductStatusID");

            migrationBuilder.CreateIndex(
                name: "IX_Pharmacies_UserId",
                table: "Pharmacies",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Pharmacies_AspNetUsers_UserId",
                table: "Pharmacies",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductStatuses_ProductStatusID",
                table: "Products",
                column: "ProductStatusID",
                principalTable: "ProductStatuses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Series_SeriesId",
                table: "Products",
                column: "SeriesId",
                principalTable: "Series",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Attributes_AttributeId",
                table: "Properties",
                column: "AttributeId",
                principalTable: "Attributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Properties_Products_ProductId",
                table: "Properties",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_ReservationStatuses_StatusId",
                table: "Reservations",
                column: "StatusId",
                principalTable: "ReservationStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SimilarProductItems_SimilarProductGroups_SimilarProductGroupId",
                table: "SimilarProductItems",
                column: "SimilarProductGroupId",
                principalTable: "SimilarProductGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
