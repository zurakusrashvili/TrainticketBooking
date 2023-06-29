using Microsoft.AspNetCore.Mvc;
using TrainticketBooking.Data;

namespace TrainticketBooking.Models.Filters
{
    public class RegisterTicketConfig
    {

            public int TrainId { get; set; }
            public DateTime Date { get; set; }
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
            public List<PersonDto> People { get; set; }
    }
}
