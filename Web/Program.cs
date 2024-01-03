using AutoMapper;
using DataAccess.Data;
using Domain.Mappings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.DbInitializer;
using Repository.Repository.Interfaces;
using Repository.Repository.Services;
using Services.ActiveSubstanceService;
using Services.AttributeService;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.MedicineService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.PropertyService;
using Services.SimilarProductGroupService;
using System.Text;
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

var jwtConfig = builder.Configuration.GetSection("jwtConfig");
var secretKey = jwtConfig["secret"];
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtConfig["validIssuer"],
        ValidAudience = jwtConfig["validAudience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!))
    };
});

builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen(
    c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Title = "Capsula API",
            Version = "v1",
            Description = "Capsula API Services.",
            Contact = new OpenApiContact
            {
                Name = "STEP Team"
            },
        });
        c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header using the Bearer scheme."
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {}
                }
            });
    }
);


builder.Services.AddDbContext<ApplicationDbContext>(
        options =>
        {
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection"));
        }
        );

builder.Services.ConfigureIdentity();

var mapperConfig = new MapperConfiguration(map =>
{
    map.AddProfile<UserMappingProfile>();
});

builder.Services.AddSingleton(mapperConfig.CreateMapper());
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<ValidationFilterAttribute>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddTransient<IAttributeService, AttributeService>();
builder.Services.AddTransient<IPropertyService, PropertyService>();
builder.Services.AddTransient<IPharmaCompanyService, PharmaCompanyService>();
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<ISimilarProductGroupService, SimilarProductGroupService>();
builder.Services.AddTransient<IMedicineService, MedicineService>();
builder.Services.AddTransient<IPharmacyService, PharmacyService>();
builder.Services.AddTransient<IConcreteProductService, ConcreteProductService>();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IActiveSubstanceService, ActiveSubstanceService>();
builder.Services.AddTransient<ICityService, CityService>();
builder.Services.AddScoped<IDbInitializer, DbInitializer>();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles();
app.UseRouting();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

SeedDatabase();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();


void SeedDatabase()
{
    using (var scope = app.Services.CreateScope())
    {
        var dbInitializer = scope.ServiceProvider.GetRequiredService<IDbInitializer>();
        dbInitializer.Initialize();
    }

}