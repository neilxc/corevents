using Infrastructure.Security;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static void AddInfrastructureServices(this IServiceCollection services)
        {
            services.AddScoped<IGenerateJwtToken, GenerateJwtToken>();
            services.AddScoped<ICurrentUserAccessor, CurrentUserAccessor>();
        }
    }
}