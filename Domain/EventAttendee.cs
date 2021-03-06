using System;

namespace Domain
{
    public class EventAttendee
    {
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}