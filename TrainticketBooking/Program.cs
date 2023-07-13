using Microsoft.EntityFrameworkCore;
using TrainticketBooking.Configurations;
using TrainticketBooking.Contracts;
using TrainticketBooking.Data;
using TrainticketBooking.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");
builder.Services.AddDbContext<TrainticketBookingDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", o => o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

builder.Services.AddAutoMapper(typeof(MapperConfig));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IApiRepository, ApiRepository>();

//builder.Services.AddScoped<IHotelRepository, HotelRepository>();
//builder.Services.AddScoped<IRoomsRepository, RoomRepository>();
//builder.Services.AddScoped<IBookingRepository, BookingRepository>();
//builder.Services.AddScoped<IDatesRepository, DatesRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    //app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts();
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    string swaggerJsonBasPath = string.IsNullOrWhiteSpace(c.RoutePrefix) ? "." : "..";
    c.SwaggerEndpoint($"{swaggerJsonBasPath}/swagger/v1/swagger.json", "Hotel Booking API");
    //c.RoutePrefix = String.Empty;
    c.DefaultModelsExpandDepth(-1);
});

//using (var scope = app.Services.CreateScope())
//{
//    var serviceProvider = scope.ServiceProvider;
//    // Provide How Many Entities You Want To Seed
//    // When Running Application Whith Uncommented Seeder It Will Seed Data.

//    //DataSeeder.GenerateTrains(serviceProvider);
//    //DataSeeder.GenerateDepartures(serviceProvider);

//    DataSeeder.GenerateData(scope)
//}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowAll");

app.UseRouting();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();
