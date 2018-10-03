using System.Net;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Infrastructure.Errors;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class Login
    {
        public class UserData
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class Command : IRequest<UserEnvelope>
        {
            public UserData User { get; set; }
        }

        public class Handler : IRequestHandler<Command, UserEnvelope>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IGenerateJwtToken _jwt;
            private readonly IMapper _mapper;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IGenerateJwtToken jwt, IMapper mapper)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _jwt = jwt;
                _mapper = mapper;
            }

            public async Task<UserEnvelope> Handle(Command request, CancellationToken cancellationToken)
            {
                var appUser = await _userManager.FindByEmailAsync(request.User.Email);
                if (appUser == null)
                    throw new RestException(HttpStatusCode.Unauthorized, new {Error = "Invalid Email / Password"});

                var result = await _signInManager.CheckPasswordSignInAsync(appUser, request.User.Password, false);

                if (result.Succeeded)
                {
                    var user = _mapper.Map<AppUser, User>(appUser);
                    user.Token = await _jwt.CreateToken(appUser);
                    return new UserEnvelope(user);
                } 
                
                throw new RestException(HttpStatusCode.Unauthorized, new {Error = "Invalid Email / Password"});
            }
        }
    }
}