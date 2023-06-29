using System;

namespace TrainticketBooking.Data
{
    public class DepartureResponse
    {
        public int Id { get; set; }
        public string RequestId { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Date { get; set; }
        public string Destination { get; set; }
        public string DiscountedPaidAmount { get; set; }
        public string Email { get; set; }
        public string Enter { get; set; }
        public int HasBlocked { get; set; }
        public int HasLeft { get; set; }
        public string Info { get; set; }
        public string Mobile { get; set; }
        public string Name { get; set; }
        public string PaidAmount { get; set; }
        public string PayoutFee { get; set; }
        public string PayoutableAmount { get; set; }
        public virtual IList<Person> Persons { get; set; }
    }
}