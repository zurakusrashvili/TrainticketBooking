using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using TrainticketBooking.Data;

namespace TrainticketBooking.Models.Filters
{
    public class PersonDto
    {
        [ForeignKey(nameof(SeatId))]
        public Guid SeatId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Status { get; set; }
        public bool PayoutCompleted { get; set; }
    }
}
