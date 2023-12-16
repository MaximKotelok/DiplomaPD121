using AutoMapper;
using DataAccess.Data;
using Domain.Mappings;
using Microsoft.EntityFrameworkCore;
using Repository.Repository.Interfaces;
using Repository.Repository.Services;
using Services.CategoryService;
using Services.ConcreteProductService;
using Services.MedicineService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Web.Extension;
using Web.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin",
        options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(
        options =>
        {
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection"));
        }
        );

var mapperConfig = new MapperConfiguration(map =>
{
    map.AddProfile<UserMappingProfile>();
});

builder.Services.AddSingleton(mapperConfig.CreateMapper());
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<ValidationFilterAttribute>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddTransient<IPharmaCompanyService, PharmaCompanyService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<IMedicineService, MedicineService>();
builder.Services.AddTransient<IPharmacyService, PharmacyService>();
builder.Services.AddTransient<IConcreteProductService, ConcreteProductService>();


builder.Services.AddAuthentication();
builder.Services.ConfigureIdentity();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
//Test