using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using Infrastructure.Errors;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Create
    {
        public class UserData
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class UserDataValidator : AbstractValidator<UserData>
        {
            public UserDataValidator()
            {
                RuleFor(x => x.FirstName).NotNull().NotEmpty();
                RuleFor(x => x.LastName).NotNull().NotEmpty();
                RuleFor(x => x.Email).NotNull().NotEmpty();
                RuleFor(x => x.Password).NotNull().NotEmpty();
            }
        }

        public class Command : IRequest<UserEnvelope>
        {
            public UserData User { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.User).NotNull().SetValidator(new UserDataValidator());
            }
        }

        public class Handler : IRequestHandler<Command, UserEnvelope>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IGenerateJwtToken _jwt;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IMapper _mapper;

            public Handler(DataContext context, UserManager<AppUser> userManager, IGenerateJwtToken jwt,
                SignInManager<AppUser> signInManager, IMapper mapper)
            {
                _context = context;
                _userManager = userManager;
                _jwt = jwt;
                _signInManager = signInManager;
                _mapper = mapper;
            }

            public async Task<UserEnvelope> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.UserName == request.User.Email).AnyAsync(cancellationToken))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {Email = Constants.IN_USE});
                }
                
                var appUser = new AppUser
                {
                    FirstName = request.User.FirstName,
                    LastName = request.User.LastName,
                    Email = request.User.Email,
                    UserName = request.User.Email
                };

                var result = await _userManager.CreateAsync(appUser, request.User.Password);

                if (result.Succeeded)
                {
                    var userFromDb = await _userManager.FindByEmailAsync(request.User.Email);
//                    await _userManager.AddToRoleAsync(userFromDb, "Member");
                    var userToReturn = _mapper.Map<AppUser, User>(userFromDb);
                    userToReturn.Token = await _jwt.CreateToken(userFromDb);
                    return new UserEnvelope(userToReturn);
                }
                
                throw new Exception("Oops - something went wrong");
            }
        }
    }
}