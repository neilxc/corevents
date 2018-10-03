using System.Threading.Tasks;
using Application.Users;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<UserEnvelope> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPost("login")]
        public async Task<UserEnvelope> Login(Login.Command command)
        {
            return await _mediator.Send(command);
        }
    }
}