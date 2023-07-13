using TrainticketBooking.Data;
using TrainticketBooking.Models.Filters;

namespace TrainticketBooking.Contracts
{
    public interface IApiRepository : IGenericRepository<Train>
    {
        Task<List<Train>> GetTrains();
        Task<List<Vagon>> GetVagons();
        Task<List<Vagon>> GetVagonById(int id);
        Task<Train> GetTrainById(int id);
        Task<List<Departure>> GetDepartures();
        Task<List<Departure>> GetDeparture(string from, string to, string date);
        Task<Ticket> RegisterTicket(RegisterTicketConfig registerTicketConfig);
        Task<List<Ticket>> GetAllTicketsAsync();
        Task<Ticket> CheckTicketStatusAsync(Guid id);
        Task<Ticket> ConfirmTicket(Guid id);
        Task<Ticket> CancelTicket(Guid id);

        Task<Seat> GetTicketById(Guid seatId);
        Task<int> DeleteAllTickets();
        Task<List<Station>> GetStations();

    }
}
