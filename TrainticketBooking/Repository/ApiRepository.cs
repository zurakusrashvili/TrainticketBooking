using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using TrainticketBooking.Contracts;
using TrainticketBooking.Data;
using TrainticketBooking.Models.Filters;

namespace TrainticketBooking.Repository
{
    public class ApiRepository : GenericRepository<Train>, IApiRepository
    {
        private readonly TrainticketBookingDbContext _context;
        public ApiRepository(TrainticketBookingDbContext context) : base(context)
        {
            this._context = context;
        }
        

        public async Task<List<Train>> GetTrains()
        {
            var trains = await _context.Trains
                .Include(r => r.Vagons)
                .ToListAsync();
            return trains;
        }

        public async Task<Seat> GetTicketById(Guid seatId)
        {
            var seat = await _context.Seats
                        .FirstOrDefaultAsync(s => s.SeatId == seatId);

            return seat;
        }
        public async Task<Train> GetTrainById(int id)
        {
            var train = await _context.Trains
                .Include(r => r.Vagons)
                .FirstOrDefaultAsync(r => r.Id == id);

            return train;
        }

        public async Task<List<Vagon>> GetVagons()
        {
            var vagons = await _context.Vagons
                .Include(r => r.Seats)
                .ToListAsync();
            return vagons;
        }
        public async Task<List<Vagon>> GetVagonById(int id)
        {
            var vagons = await _context.Vagons
                .Where(v => v.Id == id)
                .Include(r => r.Seats)
                .ToListAsync();

            return vagons;
        }
        public async Task<List<Departure>> GetDepartures()
        {
            var departures = await _context.Departures
                .Include(d => d.Trains)
                .ToListAsync(); 
            return departures;
        }

        public async Task<List<Departure>> GetDeparture(string from, string to, string dateString)
        {
            DateTime date = DateTime.Parse(dateString);
            string weekday = date.ToString("dddd", new CultureInfo("ka-GE"));

            // Validate input parameters
            if (string.IsNullOrEmpty(from) || string.IsNullOrEmpty(to) || string.IsNullOrEmpty(weekday))
            {
                // Throw an exception or handle the validation error accordingly
                throw new ArgumentException("Invalid input parameters. All fields are required.");
            }

            var departures = await _context.Departures
                .Where(d => d.Source == from && d.Destination == to && d.Date == weekday)
                .Include(d => d.Trains)
                    .ThenInclude(t => t.Vagons)
                        .ThenInclude(v => v.Seats)
                .ToListAsync();

            // Delete trains with all seats occupied
            departures.ForEach(d =>
            {
                var trainsList = d.Trains.ToList(); // Convert ICollection to List
                trainsList.RemoveAll(t => t.Vagons.All(v => v.Seats.All(s => s.IsOccupied)));
                d.Trains = trainsList; // Assign the updated list back to the ICollection
            });

            // Remove departures with no remaining trains
            departures.RemoveAll(d => d.Trains.Count == 0);

            return departures;
        }

        public async Task<Ticket> RegisterTicket(RegisterTicketConfig rtConfig)
        {
            if (rtConfig == null)
            {
                throw new ArgumentNullException(nameof(rtConfig), "Ticket configuration is null.");
            }

            // Validate rtConfig properties here, e.g., TrainId, Date, Email, PhoneNumber

            var train = await GetTrainById(rtConfig.TrainId);
            if (train == null)
            {
                throw new ArgumentException("Invalid TrainId. Train does not exist.");
            }

            var totalPrice = 0.00m;

            var bookedSeats = new List<Seat>();
            var peopleList = new List<Person>();

            var ticketId = Guid.NewGuid();

            if (rtConfig.People == null || rtConfig.People.Count == 0)
            {
                throw new ArgumentException("Invalid People list. At least one person is required.");
            }

            foreach (var people in rtConfig.People)
            {
                var seat = _context.Seats.FirstOrDefault(s => s.SeatId == people.SeatId);
                if (seat == null)
                {
                    throw new ArgumentException($"Invalid SeatId {people.SeatId}. Seat does not exist.");
                }

                if (seat.IsOccupied)
                {
                    throw new InvalidOperationException($"Seat {people.SeatId} is already occupied.");
                }

                var person = new Person()
                {
                    IdNumber = people.IdNumber,
                    Name = people.Name,
                    PayoutCompleted = people.PayoutCompleted,
                    Seat = seat,
                    Status = people.Status,
                    Surname = people.Surname,
                    TicketId = ticketId,
                };

                peopleList.Add(person);
                bookedSeats.Add(seat);
            }

            foreach (var item in bookedSeats)
            {
                totalPrice += item.Price;
                item.IsOccupied = true;
                _context.Update(item);
            }
            CultureInfo georgianCulture = new CultureInfo("ka-GE");

            var ticket = new Ticket()
            {
                Id = ticketId,
                Date = rtConfig.Date.ToString("dddd d MMMM", georgianCulture),
                Email = rtConfig.Email,
                Phone = rtConfig.PhoneNumber,
                TicketPrice = totalPrice,
                Train = train
            };

            await _context.Tickets.AddAsync(ticket);
            await _context.Persons.AddRangeAsync(peopleList);

            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<List<Ticket>> GetAllTicketsAsync()
        {
            return await _context.Tickets
                 .Include(r => r.Train)
                 .Include(r => r.Persons)
                    .ThenInclude(p => p.Seat)
                 .ToListAsync();
        }

        public async Task<int> DeleteAllTickets()
        {
            // Retrieve all tickets from the database
            var tickets = await _context.Tickets.ToListAsync();

            // Retrieve all related people and seats
            var peopleList = await _context.Persons.Include(p => p.Seat).ToListAsync();
            var seatIds = peopleList.Select(p => p.Seat?.SeatId).Where(id => id != null).Distinct().ToList();
            var seats = await _context.Seats.Where(s => seatIds.Contains(s.SeatId)).ToListAsync();

            // Reset seat occupancy status
            foreach (var seat in seats)
            {
                seat.IsOccupied = false;
                _context.Update(seat);
            }

            // Remove all tickets and related people from the database
            _context.Tickets.RemoveRange(tickets);
            _context.Persons.RemoveRange(peopleList);

            return await _context.SaveChangesAsync();
        }

        public async Task<Ticket> CheckTicketStatusAsync(Guid id)
        {
            return await _context.Tickets
                .Include(r => r.Train)
                .Include(t => t.Persons)
                .ThenInclude(p => p.Seat)
                .FirstOrDefaultAsync(r => r.Id == id);

        }

        public async Task<Ticket> ConfirmTicket(Guid id)
        {
            var ticket = await _context.Tickets
                    .Include(t => t.Persons)
                    .FirstAsync(r => r.Id == id);

            ticket.Confirmed = true;

            await _context.SaveChangesAsync();


            return ticket; ;
        }
        public async Task<Ticket> CancelTicket(Guid id)
        {
            var tickets = await GetAllTicketsAsync();
            var ticket = tickets.First(t => t.Id == id); ;


            if (ticket == null)
            {
                return null;
            }

            foreach (var s in ticket.Persons)
            {
                var seat = await _context.Seats
                    .FirstOrDefaultAsync(r => r.SeatId == s.Seat.SeatId);

                seat.IsOccupied = false;
                _context.Update(seat);
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return ticket;
        }
    }
}
