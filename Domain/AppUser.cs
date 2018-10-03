using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<int>
    {
        public string PhotoUrl { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<EventAttendee> AttendingEvents { get; set; }
    }
}