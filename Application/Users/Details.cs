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
    public class Details
    {
        public class Query : IRequest<UserEnvelope>
        {
            public string UserName { get; set; }
        }

        public class QueryHandler : IRequestHandler<Query, UserEnvelope>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IMapper _mapper;
            private readonly IGenerateJwtToken _jwt;

            public QueryHandler(UserManager<AppUser> userManager, IMapper mapper, IGenerateJwtToken jwt)
            {
                _userManager = userManager;
                _mapper = mapper;
                _jwt = jwt;
            }

            public async Task<UserEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUser = await _userManager.FindByNameAsync(request.UserName);
                if (appUser == null)
                    throw new RestException(HttpStatusCode.NotFound, new {User = Constants.NOT_FOUND});

                var user = _mapper.Map<AppUser, User>(appUser);
                user.Token = await _jwt.CreateToken(appUser);
                return new UserEnvelope(user);
            }
        }
    }
}