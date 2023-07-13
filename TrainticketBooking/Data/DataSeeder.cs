using Bogus;
using Bogus.DataSets;
using Microsoft.Extensions.DependencyInjection;

namespace TrainticketBooking.Data
{
    public class DataSeeder
    {
        public static void GenerateData(IServiceProvider serviceProvider)
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

            using (var scope = serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<TrainticketBookingDbContext>();

                // Generate Departures and save them
                var data = new List<Departure>();
                var id = 1;
                foreach (var dep in departures)
                {
                    foreach (var date in dates)
                    {
                        var depa = new Departure()
                        {
                            Date = date,
                            Destination = dep.to,
                            Source = dep.from
                        };
                        data.Add(depa);
                    }
                }

                // Generate Trains and save them
                var trains = new List<Train>();
                foreach (var departure in departures)
                {
                    foreach (var date in dates)
                    {
                        var train1 = new Train()
                        {
                            DepartureId = id,
                            Date = date,
                            Departure = "00:35",
                            Arrive = "05:47",
                            From = departure.from,
                            To = departure.to,
                            Number = 812
                        };

                        var train2 = new Train()
                        {
                            DepartureId = id,
                            Date = date,
                            Departure = "10:25",
                            Arrive = "15:38",
                            From = departure.from,
                            To = departure.to,
                            Number = 808
                        };
                        var train3 = new Train()
                        {
                            DepartureId = id,
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
                        id++;
                    }
                }


                //dbContext.Trains.AddRange(trains);
                //dbContext.Departures.AddRange(data);

                //// Save changes for both Departures and Trains
                //dbContext.SaveChanges();
            }
        }

    }
}
