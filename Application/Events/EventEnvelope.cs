using Domain;

namespace Application.Events
{
    public class EventEnvelope
    {
        public EventEnvelope(EventToReturnDto evt)
        {
            Event = evt;
        }
        
        public EventToReturnDto Event { get; set; }
    }
}