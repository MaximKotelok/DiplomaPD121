using AutoMapper;
using DataAccess.Data;
using Domain.Mappings;
using Domain.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Repository.DbInitializer;
using Repository.Repository.Interfaces;
using Repository.Repository.Services;
using SendGrid.Extensions.DependencyInjection;
using Services.ActiveSubstanceService;
using Services.AttributeGroupService;
using Services.AttributeService;
using Services.BackgroundTaskService;
using Services.BrandService;
using Services.CategoryService;
using Services.CityService;
using Services.ConcreteProductService;
using Services.CountryService;
using Services.DefectiveSeriesService;
using Services.EmailService;
using Services.MailService;
using Services.ManufacturerService;
using Services.MedicineService;
using Services.PermissionTypeService;
using Services.PharmacyCompanyService;
using Services.PharmacyService;
using Services.ProductConfirmService;
using Services.ProductPriceHistoryService;
using Services.ProductStatusService;
using Services.PropertyService;
using Services.ReservationService;
using Services.SimilarProductGroupService;
using Services.SimilarProductItemService;
using Services.SMTPService;
using Services.UserService;
using System.Text;
using Utility.Models;
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
builder.Services.AddAuthentication();

/*var GoogleConfig = builder.Configuration.GetSection("GoogleConfig");
var FacebookConfig = builder.Configuration.GetSection("FacebookConfig");

builder.Services.AddAuthentication().AddGoogle(options =>
{
    options.ClientId = GoogleConfig["ClientId"];
    options.ClientSecret = GoogleConfig["ClientSecret"];
}).AddFacebook(options =>
{
    options.AppId = FacebookConfig["AppId"];
    options.AppSecret = FacebookConfig["AppSecret"];
}); 
    */

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
builder.Services.AddScoped<IPermissionTypeService, PermissionTypeService>();
builder.Services.AddScoped<IManufacturerService, ManufacturerService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<IProductConfirmService, ProductConfirmService>();
builder.Services.AddScoped<IProductStatusService, ProductStatusService>();
builder.Services.AddScoped<IAttributeService, AttributeService>();
builder.Services.AddScoped<IAttributeGroupService, AttributeGroupService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IPharmaCompanyService, PharmaCompanyService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISimilarProductGroupService, SimilarProductGroupService>();
builder.Services.AddScoped<ISimilarProductItemService, SimilarProductItemService>();
builder.Services.AddScoped<IPharmacyService, PharmacyService>();
builder.Services.AddScoped<IConcreteProductService, ConcreteProductService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IActiveSubstanceService, ActiveSubstanceService>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IDbInitializer, DbInitializer>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IReservationStatusService, ReservationStatusService>();
builder.Services.AddScoped<IMedicineService, MedicineService>();
builder.Services.AddScoped<IEmailSenderService, EmailSenderService>();
builder.Services.AddScoped<IReservationService, ReservationService>();
builder.Services.AddScoped<IProductPriceHistoryService, ProductPriceHistoryService>();
builder.Services.AddScoped<IDefectiveSeriesService, DefectiveSeriesService>();

builder.Services.AddHostedService<ProductPriceHistoryBackgroundService>();

builder.Services.AddSendGrid(options =>
{
    options.ApiKey = builder.Configuration.GetSection("SendGridSettings")
    .GetValue<string>("ApiKey");
});

builder.Services.Configure<SendGridSettings>(builder.Configuration.GetSection("SendGridSettings"));


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
app.UseStaticFiles();

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseStaticFiles();
app.UseRouting();

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