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
    public class Details
    {
        public class Query : IRequest<EventEnvelope>
        {
            public Query(int id)
            {
                Id = id;
            }

            public int Id { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, EventEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public QueryHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<EventEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var evt = await _context.Events
                    .Include(e => e.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                
                if (evt == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Event = Constants.NOT_FOUND});

                var eventToReturn = _mapper.Map<Event, EventToReturnDto>(evt);
                
                return new EventEnvelope(eventToReturn);
            }
        }
    }
}