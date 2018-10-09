using System.Threading.Tasks;
using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EventsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<EventsEnvelope> GetEvents()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<EventEnvelope> GetEvent(int id)
        {
            return await _mediator.Send(new Details.Query(id));
        }

        [HttpPost]
        public async Task<EventEnvelope> CreateEvent([FromBody]Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsEventHost")]
        public async Task<EventEnvelope> EditEvent(int id, [FromBody] Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }
    }
}