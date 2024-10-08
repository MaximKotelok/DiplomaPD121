﻿// <auto-generated />
using System;
using DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DataAccess.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20231218121011_AddedCityAndPhoto")]
    partial class AddedCityAndPhoto
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain.Models.ActiveSubstance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ActiveSubstances");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Title = "аскорбінова кислота"
                        });
                });

            modelBuilder.Entity("Domain.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ParentCategoryID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ParentCategoryID");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Title = "Каталог Товарів"
                        },
                        new
                        {
                            Id = 2,
                            ParentCategoryID = 1,
                            Title = "Ліки та профілактичні засоби"
                        },
                        new
                        {
                            Id = 3,
                            ParentCategoryID = 2,
                            Title = "Вітаміни"
                        },
                        new
                        {
                            Id = 4,
                            ParentCategoryID = 3,
                            Title = "Вітамін С"
                        },
                        new
                        {
                            Id = 5,
                            ParentCategoryID = 4,
                            Title = "Аскорбінка"
                        },
                        new
                        {
                            Id = 6,
                            ParentCategoryID = 5,
                            Title = "Аскорбінка-КВ"
                        });
                });

            modelBuilder.Entity("Domain.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Latitude")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Longitude")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Citys");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Latitude = "213213",
                            Longitude = "214124124",
                            NameCity = "Львів"
                        });
                });

            modelBuilder.Entity("Domain.Models.ConcreteProduct", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("ProductID")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductID");

                    b.ToTable("ConcreteProducts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Price = 100.0,
                            ProductID = 1,
                            Quantity = 2
                        });
                });

            modelBuilder.Entity("Domain.Models.PharmaCompany", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PharmaCompanies");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "АНЦ.",
                            Title = "АНЦ"
                        });
                });

            modelBuilder.Entity("Domain.Models.Pharmacy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CityID")
                        .HasColumnType("int");

                    b.Property<string>("Coord")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PharmaCompanyID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CityID");

                    b.HasIndex("PharmaCompanyID");

                    b.ToTable("Pharmacies");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Temp Address",
                            CityID = 1,
                            Coord = "Temp Coord",
                            PharmaCompanyID = 1
                        });
                });

            modelBuilder.Entity("Domain.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CategoryID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PathToPhoto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PharmacyID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryID");

                    b.HasIndex("PharmacyID");

                    b.ToTable("Products");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Domain.Models.Medicine", b =>
                {
                    b.HasBaseType("Domain.Models.Product");

                    b.Property<int>("ActiveSubstanceID")
                        .HasColumnType("int");

                    b.Property<string>("SpecialRow")
                        .HasColumnType("nvarchar(max)");

                    b.HasIndex("ActiveSubstanceID");

                    b.ToTable("Medicines");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CategoryID = 6,
                            Description = "Аскорбінка.",
                            PharmacyID = 1,
                            Title = "Аскорбінка",
                            ActiveSubstanceID = 1,
                            SpecialRow = "Special Temp Row"
                        });
                });

            modelBuilder.Entity("Domain.Models.Category", b =>
                {
                    b.HasOne("Domain.Models.Category", "ParentCategory")
                        .WithMany("SubCategories")
                        .HasForeignKey("ParentCategoryID");

                    b.Navigation("ParentCategory");
                });

            modelBuilder.Entity("Domain.Models.ConcreteProduct", b =>
                {
                    b.HasOne("Domain.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Domain.Models.Pharmacy", b =>
                {
                    b.HasOne("Domain.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("CityID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.PharmaCompany", "PharmaCompany")
                        .WithMany()
                        .HasForeignKey("PharmaCompanyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");

                    b.Navigation("PharmaCompany");
                });

            modelBuilder.Entity("Domain.Models.Product", b =>
                {
                    b.HasOne("Domain.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryID");

                    b.HasOne("Domain.Models.Pharmacy", "Pharmacy")
                        .WithMany("Products")
                        .HasForeignKey("PharmacyID");

                    b.Navigation("Category");

                    b.Navigation("Pharmacy");
                });

            modelBuilder.Entity("Domain.Models.Medicine", b =>
                {
                    b.HasOne("Domain.Models.ActiveSubstance", "ActiveSubstance")
                        .WithMany("Medicines")
                        .HasForeignKey("ActiveSubstanceID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Models.Product", null)
                        .WithOne()
                        .HasForeignKey("Domain.Models.Medicine", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ActiveSubstance");
                });

            modelBuilder.Entity("Domain.Models.ActiveSubstance", b =>
                {
                    b.Navigation("Medicines");
                });

            modelBuilder.Entity("Domain.Models.Category", b =>
                {
                    b.Navigation("Products");

                    b.Navigation("SubCategories");
                });

            modelBuilder.Entity("Domain.Models.Pharmacy", b =>
                {
                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
