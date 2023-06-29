using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrainticketBooking.Data
{
    public class Train
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public string From { get; set; }
        public string To { get; set; }

        public string Departure { get; set; }
        public string Arrive { get; set; }
        public virtual IList<Vagon> Vagons { get; set; }

    }
}
