using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Infrastructure.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class EventData
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
            public DateTime Date { get; set; }
        }

        public class Command : IRequest<EventEnvelope>
        {
            public EventData Event { get; set; }
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, EventEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<EventEnvelope> Handle(Command request, CancellationToken cancellationToken)
            {
                var evt = await _context.Events.Where(x => x.Id == request.Id).FirstOrDefaultAsync(cancellationToken);
                
                if (evt == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Event = Constants.NOT_FOUND});

                evt.Title = request.Event.Title ?? evt.Title;
                evt.Description = request.Event.Description ?? evt.Description;
                evt.Category = request.Event.Category ?? evt.Category;
                evt.City = request.Event.City ?? evt.City;
                evt.Venue = request.Event.Venue ?? evt.Venue;
                evt.Date = request.Event.Date;

                if (_context.ChangeTracker.Entries().First(x => x.Entity == evt).State == EntityState.Modified)
                {
                    // event updated?
                }

                await _context.SaveChangesAsync(cancellationToken);

                var eventFromDb =
                    await _context.Events.Include(x => x.Attendees).Where(x => x.Id == evt.Id).FirstOrDefaultAsync(cancellationToken);

                var eventToReturn = _mapper.Map<Event, EventToReturnDto>(eventFromDb);
                
                return new EventEnvelope(eventToReturn);
            }
        }
    }
}