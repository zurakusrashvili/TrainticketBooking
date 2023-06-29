using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrainticketBooking.Contracts;
using TrainticketBooking.Data;
using TrainticketBooking.Models.Filters;
using TrainticketBooking.Repository;

namespace HotelBooking.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly IApiRepository _repository;
        private readonly IMapper _mapper;

        public ApiController(IApiRepository repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        //Trains
       [HttpGet]
       [Route("trains")]
        public async Task<ActionResult<IEnumerable<Train>>> GetAllTrains()
        {
            var rooms = await _repository.GetTrains();
            return Ok(rooms);
        }

        [HttpGet]
        [Route("trains/{id}")]
        public async Task<ActionResult<Vagon>> GetTrainById(int id)
        {
            var train = await _repository.GetTrainById(id);

            return Ok(train);
        }
        //Vagons
        [HttpGet]
        [Route("vagons")]
        public async Task<ActionResult<IEnumerable<Vagon>>> GetVagons()
        {
            var rooms = await _repository.GetVagons();
            return Ok(rooms);
        }

        [HttpGet]
        [Route("getvagon/{id}")]
        public async Task<ActionResult<Vagon>> GetVagonById(int id)
        {
            var vagon = await _repository.GetVagonById(id);
            return Ok(vagon);
        }


        //Departures
        [HttpGet]
        [Route("departures")]
        public async Task<ActionResult<IList<Departure>>> GetDepartures()
        {
            var departures = await _repository.GetDepartures();

            return Ok(departures);
        }

        [HttpGet]
        [Route("getdeparture")]
        public async Task<ActionResult<IList<Departure>>> GetDepartures([FromQuery] string from, [FromQuery] string to, [FromQuery]string date)
        {
            var departures = await _repository.GetDeparture(from, to,date);

            return Ok(departures);
        }

        //Tickets


        [HttpGet]
        [Route("tickets")]
        public async Task<ActionResult<IList<Ticket>>> GetTickets()
        {
            var departures = await _repository.GetAllTicketsAsync();

            return Ok(departures);
        }


        [HttpPost]
        [Route("tickets/register")]
        public async Task<ActionResult<Ticket>> RegisterTicket([FromBody]RegisterTicketConfig registerTicketConfig)
        {
            try
            {
                var ticket = await _repository.RegisterTicket(registerTicketConfig);

                if (ticket == null)
                {
                    return BadRequest("ასეთი ბილეთი არ მოიძებნა ან რომელიმე ადგილი უკვე დაჯავშნულია");
                }
                return Ok($"ბილეთი წარმატებით დაიჯავშნა. ბილეთის ნომერია:{ticket.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest($"ოპერაციის შესრულების დროს მოხდა შეცდომა. {ex.Message}");
            }
        }



        [HttpGet]
        [Route("tickets/checkstatus/{ticketId}")]
        public async Task<ActionResult<Ticket>> CheckTicketStatus(Guid ticketId)
        {
            var ticket = await _repository.CheckTicketStatusAsync(ticketId);

            if(ticket == null)
            {
                return BadRequest("ასეთი ბილეთი არ მოიძებნა");
            }

            return Ok(ticket);
        }

        [HttpGet]
        [Route("tickets/confirm/{ticketId}")]
        public async Task<ActionResult<Ticket>> ConfirmTicket(Guid ticketId)
        {
            var ticket = await _repository.ConfirmTicket(ticketId);

            if (ticket == null)
            {
                return BadRequest("ასეთი ბილეთი არ მოიძებნა");
            }

            return Ok(ticket);
        }

        [HttpDelete]
        [Route("tickets/cancel/{ticketId}")]
        public async Task<ActionResult<Ticket>> CancelTicket(string ticketId)
        {

            var ticket = await _repository.CancelTicket(new Guid(ticketId));

            if (ticket == null)
            {
                return BadRequest("ასეთი ბილეთი არ მოიძებნა");
            }

            return Ok($"ბილეთი წარმატებით გაუქმდა. ბილეთის ნომერი: {ticketId}");
        }


        [HttpGet]
        [Route("seat/{seatId}")]
        public async Task<ActionResult<Seat>> GetSeatById(string seatId)
        {

            var seat = await _repository.GetTicketById(new Guid(seatId));

            if (seat == null)
            {
                return BadRequest("ასეთი ადგილი არ მოიძებნა");
            }

            return Ok(seat);
        }

        [HttpDelete]
        [Route("tickets/cancelAll")]
        public async Task<ActionResult<Seat>> CancelAllTickets()
        {

            var seat = await _repository.DeleteAllTickets();

            return Ok();
        }

    }



}
