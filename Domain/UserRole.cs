using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class UserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        public Role Role { get; set; }
    }
}