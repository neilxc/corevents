using System.Collections.Generic;
using Domain;

namespace Application.Events
{
    public class EventsEnvelope
    {
        public List<EventToReturnDto> Events { get; set; }
        public int EventsCount { get; set; }
    }
}