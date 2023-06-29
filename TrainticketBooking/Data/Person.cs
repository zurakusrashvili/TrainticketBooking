using System.ComponentModel.DataAnnotations.Schema;

namespace TrainticketBooking.Data
{
    public class Person
    {
        public int Id { get; set; }

        [ForeignKey(nameof(TicketId))]
        public Guid TicketId { get; set; }
        public Seat Seat { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string IdNumber { get; set; }
        public string Status { get; set; }
        public bool PayoutCompleted { get; set; }
    }
}