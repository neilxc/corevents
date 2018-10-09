using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<IGenerateJwtToken, GenerateJwtToken>();
            services.AddScoped<ICurrentUserAccessor, CurrentUserAccessor>();
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsEventHost", policy =>
                    policy.Requirements.Add(new IsHostRequirement()));
            });
            services.AddTransient<IAuthorizationHandler, IsHostHandler>();
        }
    }
}