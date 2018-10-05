using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<EventsEnvelope>
        {
        }

        public class QueryHandler : IRequestHandler<Query, EventsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public QueryHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<EventsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _context.Events
                    .Include(a => a.Attendees).ThenInclude(x => x.AppUser)
                    .OrderBy(e => e.Date)
                    .AsNoTracking()
                    .ToListAsync(cancellationToken);
               
                var eventsToReturn = _mapper.Map<List<EventToReturnDto>>(events);              

                return new EventsEnvelope
                {
                    Events = eventsToReturn,
                    EventsCount = events.Count
                };
            }
        }
    }
}