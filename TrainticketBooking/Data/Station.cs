using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrainticketBooking.Data
{
    public class Station
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string StationNumber { get; set; }
    }
}
