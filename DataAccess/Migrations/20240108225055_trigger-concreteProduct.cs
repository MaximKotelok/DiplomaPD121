using Microsoft.EntityFrameworkCore.Migrations;
using System.Data.Entity.Migrations;

namespace DataAccess.Migrations
{

    public partial class triggerconcreteProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            CREATE TRIGGER PreventDuplicateConcreteProducts
            ON ConcreteProducts
            INSTEAD OF INSERT
            AS
            BEGIN
                IF EXISTS (
                    SELECT 1
                    FROM inserted i
                    JOIN ConcreteProducts c ON i.PharmacyID = c.PharmacyID AND i.ProductID = c.ProductID
                )
                BEGIN
                    THROW 50000, 'Duplicate ConcreteProduct entry with the same PharmacyID and ProductID is not allowed', 1;
                END
                ELSE
                BEGIN
                    INSERT INTO ConcreteProducts (Price, Quantity, ProductID, PharmacyID)
                    SELECT Price, Quantity, ProductID, PharmacyID
                    FROM inserted;
                END
            END;
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DROP TRIGGER IF EXISTS PreventDuplicateConcreteProducts;
            ");
        }
    }
}