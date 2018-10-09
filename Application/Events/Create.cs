using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class EventData
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
            public string Image { get; set; }
            public double Longitude { get; set; }
            public double Latitude { get; set; }
            public ICollection<EventAttendee> Attendees { get; set; }
        }

        public class Command : IRequest<EventEnvelope>
        {
            public EventData Event { get; set; }
        }

        public class Handler : IRequestHandler<Command, EventEnvelope>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;
            private readonly ICurrentUserAccessor _currentUserAccessor;

            public Handler(DataContext context, UserManager<AppUser> userManager, IMapper mapper, ICurrentUserAccessor currentUserAccessor)
            {
                _context = context;
                _userManager = userManager;
                _mapper = mapper;
                _currentUserAccessor = currentUserAccessor;
            }

            public async Task<EventEnvelope> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser =
                    await _context.Users.FirstAsync(x => x.UserName == _currentUserAccessor.GetCurrentUsername(),
                        cancellationToken);
                var evt = new Event
                {
                    Title = request.Event.Title,
                    Category = request.Event.Category,
                    Description = request.Event.Description,
                    Date = request.Event.Date,
                    City = request.Event.City,
                    Venue = request.Event.Venue,
                    Image = request.Event.Image,
                    Latitude = request.Event.Latitude,
                    Longitude = request.Event.Longitude,
                };
                
                // save event so that can get event id to add attendees to
                await _context.Events.AddAsync(evt, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                var attendee = new EventAttendee
                {
                    AppUser = currentUser,
                    Event = evt,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                await _context.EventAttendees.AddAsync(attendee, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                var eventToReturn = _mapper.Map<Event, EventToReturnDto>(evt);
                
                return new EventEnvelope(eventToReturn);
            }
        }
    }
}