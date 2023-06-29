using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrainticketBooking.Data
{
    public class Ticket
    {
        public Guid Id { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Date { get; set; }
        public decimal TicketPrice { get; set; }
        [ForeignKey(nameof(TrainID))]
        public int TrainID { get; set; }
        public bool Confirmed { get; set; }
        public virtual Train Train { get; set; }
        public virtual IList<Person> Persons { get; set; }
    }
}
