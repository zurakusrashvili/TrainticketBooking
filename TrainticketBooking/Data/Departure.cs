namespace TrainticketBooking.Data
{
    public class Departure
    {
        public int Id { get; set; }
        //public int Ticket { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Date { get; set; }
        public virtual IList<Train> Trains { get; set; }
    }
}