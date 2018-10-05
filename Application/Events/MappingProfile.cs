using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Events
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EventAttendee, AttendeeDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.AppUserId))
                .ForMember(d => d.PhotoUrl, o => o.MapFrom(s => s.AppUser.PhotoUrl))
                .ForMember(d => d.IsHost, o => o.MapFrom(s => s.IsHost))
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DateJoined, o => o.MapFrom(s => s.DateJoined));
            CreateMap<Event, EventToReturnDto>();
        }    
    }
}