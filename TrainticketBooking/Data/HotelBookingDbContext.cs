using Bogus.DataSets;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection.Emit;

namespace TrainticketBooking.Data
{
    public class TrainticketBookingDbContext : DbContext
    {

        private static List<Seat> SeatSeeder(decimal price, int vagonId)
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




        public static List<Departure> GenerateDepartures()
        {
            var dates = new List<string>()
    {
        "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"
    };

            var departures = new List<(string from, string to)>
    {
        ("თბილისი", "ბათუმი"),
        ("ბათუმი", "თბილისი"),
        ("თბილისი", "ფოთი"),
        ("ფოთი", "თბილისი"),
    };
            var id = 1;
            var data = new List<Departure>();
            foreach (var dep in departures)
            {
                foreach (var date in dates)
                {
                    var depa = new Departure()
                    {
                        Id = id++,                        
                        Date = date,
                        Destination = dep.to,
                        Source = dep.from
                    };
                    data.Add(depa);
                }
            }

            return data;
        }


        public static List<Vagon> GenerateVagons(List<Train> trains)
        {
            var data = new List<Vagon>();
            var vagonId = 1;
            foreach(var tra in trains)
            {
                var vagon1 = new Vagon()
                {
                    Id = vagonId++,
                    TrainNumber = tra.Number,
                    Name = "II კლასი",
                    TrainId = tra.Id
                };
                var vagon2 = new Vagon()
                {
                    Id = vagonId++,
                    TrainNumber = tra.Number,
                    Name = "I კლასი",
                    TrainId = tra.Id
                };
                var vagon3 = new Vagon()
                {
                    Id = vagonId++,
                    TrainNumber = tra.Number,
                    Name = "ბიზნესი",
                    TrainId = tra.Id
                };
                data.Add(vagon1);
                data.Add(vagon2);
                data.Add(vagon3);
            }

            return data;
        }

        public static List<Seat> GenerateSeats(List<Vagon> vagons)
        {
            var seats = new List<Seat>();
            foreach(var vagon in vagons)
            {
               if(vagon.Id % 3 == 1)
                {

                    seats.AddRange(SeatSeeder(75.00m, vagon.Id));
                }
               else if(vagon.Id % 3 == 2)
                {

                    seats.AddRange(SeatSeeder(35.00m, vagon.Id));
                }
               else if(vagon.Id %3 == 0)
                {

                    seats.AddRange(SeatSeeder(125.00m, vagon.Id));
                }
            }

            return seats;
        }


        // Method to generate trains
        public static List<Train> GenerateTrains()
        {
            var dates = new List<string>()
    {
        "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"
    };

            var departures = new List<(string from, string to)>
    {
        ("თბილისი", "ბათუმი"),
        ("ბათუმი", "თბილისი"),
        ("თბილისი", "ფოთი"),
        ("ფოთი", "თბილისი"),
    };

            var trains = new List<Train>();
            int departureId = 1;
            int trainId = 1;
            foreach (var departure in departures)
            {
                foreach (var date in dates)
                {
                    var train1 = new Train()
                    {
                        Id = trainId++,
                        DepartureId = departureId,
                        Name = $"{departure.from}-{departure.to}",
                        Date = date,
                        Departure = "00:35",
                        Arrive = "05:47",
                        From = departure.from,
                        To = departure.to,
                        Number = 812
                    };

                    var train2 = new Train()
                    {
                        Id = trainId++,
                        DepartureId = departureId,
                        Name = $"{departure.from}-{departure.to}",
                        Date = date,
                        Departure = "10:25",
                        Arrive = "15:38",
                        From = departure.from,
                        To = departure.to,
                        Number = 808
                    };
                    var train3 = new Train()
                    {
                        Id = trainId++,
                        DepartureId = departureId,
                        Name = $"{departure.from}-{departure.to}",
                        Date = date,
                        Departure = "17:05",
                        Arrive = "22:17",
                        From = departure.from,
                        To = departure.to,
                        Number = 804
                    };

                    trains.Add(train1);
                    trains.Add(train2);
                    trains.Add(train3);
                    departureId++;
                }
            }

            return trains;
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


            //modelBuilder.Entity<Departure>()
            //    .HasMany(d => d.Trains)
            //    .WithOne()
            //    .HasForeignKey(t => t.From)
            //    .HasPrincipalKey(d => d.Source);





            //modelBuilder.Entity<Vagon>().HasData(

            //    new Vagon()
            //    {
            //        Id = 1,
            //        TrainNumber = 812,
            //        Name = "II კლასი",
            //        TrainId = 1
            //    },
            //    new Vagon()
            //    {
            //        Id = 2,
            //        TrainNumber = 812,
            //        Name = "I კლასი",
            //        TrainId = 1
            //    },
            //    new Vagon()
            //    {
            //        Id = 3,
            //        TrainNumber = 812,
            //        Name = "ბიზნესი",
            //        TrainId = 1
            //    },
            //    new Vagon()
            //    {
            //        Id = 4,
            //        TrainNumber = 808,
            //        Name = "II კლასი",
            //        TrainId = 2
            //    },
            //    new Vagon()
            //    {
            //        Id = 5,
            //        TrainNumber = 804,
            //        Name = "I კლასი",
            //        TrainId = 2
            //    }

            //);

            ////ადგილები


            //var seats = GenerateSeats(35.00m, 1);
            //seats.AddRange(GenerateSeats(75.00m, 2));
            //seats.AddRange(GenerateSeats(125.00m, 3));
            //seats.AddRange(GenerateSeats(35.00m, 4));
            //seats.AddRange(GenerateSeats(35.00m, 5));



            //modelBuilder.Entity<Seat>().HasData(seats);
            var trains = GenerateTrains();
            var departures = GenerateDepartures();
            var vagons = GenerateVagons(trains);
            var seats = GenerateSeats(vagons);

            modelBuilder.Entity<Train>().HasData(trains);
            modelBuilder.Entity<Departure>().HasData(departures);
            modelBuilder.Entity<Vagon>().HasData(vagons);
            modelBuilder.Entity<Seat>().HasData(seats);

            modelBuilder.Entity<Station>().HasData(
                new Station()
                {
                    Id = Guid.NewGuid(),
                    Name = "თბილისი",
                    StationNumber = "1"
                },
                new Station()
                {
                    Id = Guid.NewGuid(),
                    Name = "ბათუმი",
                    StationNumber = "2"
                },
                new Station()
                {
                    Id = Guid.NewGuid(),
                    Name = "ფოთი",
                    StationNumber = "3"
                }
            );
        }

    }
}
