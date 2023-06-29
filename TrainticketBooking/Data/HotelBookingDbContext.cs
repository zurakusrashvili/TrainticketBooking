using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection.Emit;

namespace TrainticketBooking.Data
{
    public class TrainticketBookingDbContext : DbContext
    {

        private List<Seat> GenerateSeats(decimal price, int vagonId)
        {
            var seats = new List<Seat>();

            for (int i = 1; i <= 10; i++)
            {
                seats.Add(new Seat()
                { 
                    SeatId = Guid.NewGuid(),
                    IsOccupied = false,
                    Number = $"{i}A",
                    Price = price,
                    VagonId = vagonId
                });
                seats.Add(new Seat()
                {
                    SeatId = Guid.NewGuid(),
                    IsOccupied = false,
                    Number = $"{i}B",
                    Price = price,
                    VagonId = vagonId
                });

                seats.Add(new Seat()
                {
                    SeatId = Guid.NewGuid(),
                    IsOccupied = false,
                    Number = $"{i}C",
                    Price = price,
                    VagonId = vagonId
                });

                seats.Add(new Seat()
                {
                    SeatId = Guid.NewGuid(),
                    IsOccupied = false,
                    Number = $"{i}D",
                    Price = price,
                    VagonId = vagonId
                });
            }

            return seats;
        }

        public TrainticketBookingDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Train> Trains { get; set; }
        public DbSet<Vagon> Vagons { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Person> Persons{ get; set; }
        public DbSet<Ticket> Tickets{ get; set; }
        public DbSet<Departure> Departures{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Departure>()
                .HasMany(d => d.Trains)
                .WithOne()
                .HasForeignKey(t => t.From)
                .HasPrincipalKey(d => d.Source);





            modelBuilder.Entity<Departure>().HasData(
                new Departure()
                {
                    Id = 1,
                    Date = "ორშაბათი",
                    Destination = "ბათუმი",
                    Source = "თბილისი"
                }    
            );

            modelBuilder.Entity<Station>().HasData(

new Station()
{
    Id = Guid.NewGuid(),
    Name = "თბილისი",
    StationNumber = "56014"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ბათუმი",
    StationNumber = "57151"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ზუგდიდი",
    StationNumber = "57290"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ფოთი",
    StationNumber = "57210"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ქობულეთი",
    StationNumber = "57120"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ურეკი",
    StationNumber = "57070"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "აბაშა",
    StationNumber = "57170"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ქუთაისი I",
    StationNumber = "57530"
},
new Station()
{
    Id = Guid.NewGuid(),
    Name = "ბორჯომი",
    StationNumber = "57760"
});


            modelBuilder.Entity<Train>().HasData(
                new Train()
                {
                    Id = 1,
                    Date = "ორშაბათი",
                    Departure = "00:35",
                    Arrive = "05:47",
                    From = "თბილისი",
                    To = "ბათუმი",
                    Number = 812
                },
                 new Train()
                 {
                     Id = 2,
                     Date = "ორშაბათი",
                     Departure = "10:25",
                     Arrive = "15:38",
                     From = "თბილისი",
                     To = "ბათუმი",
                     Number = 808
                 },
                 new Train()
                 {
                     Id = 3,
                     Date = "ორშაბათი",
                     Departure = "17:05",
                     Arrive = "22:17",
                     From = "თბილისი",
                     To = "ბათუმი",
                     Number = 804
                 }
            );

            modelBuilder.Entity<Vagon>().HasData(

                new Vagon() {
                    Id = 1,
                    TrainNumber = 812,
                    Name = "II კლასი",
                    TrainId = 1
                },
                new Vagon()
                {
                    Id = 2,
                    TrainNumber = 812,
                    Name = "I კლასი",
                    TrainId = 1
                },
                new Vagon()
                {
                    Id = 3,
                    TrainNumber = 812,
                    Name = "ბიზნესი",
                    TrainId = 1
                },
                new Vagon()
                {
                    Id = 4,
                    TrainNumber = 808,
                    Name = "II კლასი",
                    TrainId = 2
                },
                new Vagon()
                {
                    Id = 5,
                    TrainNumber = 804,
                    Name = "II კლასი",
                    TrainId = 2
                }

            );

            //ადგილები


            var seats = GenerateSeats(35.00m, 1);
            seats.AddRange(GenerateSeats(75.00m, 2));
            seats.AddRange(GenerateSeats(125.00m, 3));
            seats.AddRange(GenerateSeats(35.00m, 4));
            seats.AddRange(GenerateSeats(35.00m, 5));



            modelBuilder.Entity<Seat>().HasData(seats);


        }

    }
}
