using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrainticketBooking.Data
{
    public class Vagon
    {
        public int Id { get; set; }

        [ForeignKey(nameof(TrainId))]
        public int TrainId { get; set; }
        public int TrainNumber { get; set; }
        public string Name { get; set; }

        public virtual IList<Seat> Seats { get; set; }

    }
}
