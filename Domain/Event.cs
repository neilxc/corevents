using System;
using System.Collections.Generic;

namespace Domain
{
    public class Event
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
        public AppUser Host { get; set; }
        public ICollection<EventAttendee> Attendees { get; set; }
    }
}