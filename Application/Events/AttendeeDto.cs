using System;

namespace Application.Events
{
    public class AttendeeDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public bool IsHost { get; set; }
        public DateTime DateJoined { get; set; }
    }
}