using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly DataContext _context;

        public Seed(UserManager<AppUser> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        public void SeedData()
        {
            if (!_userManager.Users.Any())
            {
                var roles = new List<Role>
                {
                    new Role {Name = "Member"},
                    new Role {Name = "Admin"},
                    new Role {Name = "Moderator"}
                };

                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                var adminUser = new AppUser
                {
                    UserName = "Admin",
                    Email = "admin@corevents.com"
                };

                var result = _userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"}).Wait();
                }

                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "Bob",
                        Email = "bob@test.com",
                        PhotoUrl = "https://randomuser.me/api/portraits/men/33.jpg"
                    },
                    new AppUser
                    {
                        UserName = "Jane",
                        Email = "jane@test.com",
                        PhotoUrl = "https://randomuser.me/api/portraits/women/77.jpg"
                    },
                    new AppUser
                    {
                        UserName = "Dave",
                        Email = "dave@test.com",
                        PhotoUrl = "https://randomuser.me/api/portraits/men/44.jpg"
                    }
                };

                foreach (var user in users)
                {
                    _userManager.CreateAsync(user, "password").Wait();
                    _userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var events = new List<Event>
                {
                    new Event
                    {
                        Title = "Trip to Empire State building",
                        Date = DateTime.Now.AddDays(12),
                        Category = "Culture",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
                        City = "NY, USA",
                        Venue = "Empire State Building, 5th Avenue, New York, NY, USA",
                        Latitude = 40.7484405,
                        Longitude = -73.98566440000002,
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUserId = 2,
                                EventId = 1,
                                DateJoined = DateTime.Now.AddDays(12),
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUserId = 3,
                                EventId = 1,
                                DateJoined = DateTime.Now.AddDays(13),
                                IsHost = false
                            }
                        }
                    },
                    new Event
                    {
                        Title = "Trip to Punch and Judy Pub",
                        Date = DateTime.Now.AddDays(5),
                        Category = "Drinks",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
                        City = "London, UK",
                        Venue = "Punch & Judy, Henrietta Street, London, UK",
                        Latitude = 51.5118074,
                        Longitude = -0.12300089999996544,
                        Attendees = new List<EventAttendee>
                        {
                            new EventAttendee
                            {
                                AppUserId = 4,
                                EventId = 2,
                                DateJoined = DateTime.Now.AddDays(5),
                                IsHost = true
                            },
                            new EventAttendee
                            {
                                AppUserId = 3,
                                EventId = 2,
                                DateJoined = DateTime.Now.AddDays(6),
                                IsHost = false
                            }
                        }
                    }
                };

                _context.Events.AddRangeAsync(events).Wait();
                _context.SaveChangesAsync().Wait();
            }
        }
    }
}