using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrainticketBooking.Data
{
    public class Seat
    {
        public Guid SeatId { get; set; }
        public string Number { get; set; }
        public decimal Price { get; set; }
        public bool IsOccupied { get; set; }

        [ForeignKey(nameof(VagonId))]
        public int VagonId { get; set; }
    }
}