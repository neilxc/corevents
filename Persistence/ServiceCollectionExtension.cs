using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
    public static class ServiceCollectionExtension
    {
        public static void AddDataAccessServices(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<DataContext>(opt => { opt.UseSqlite(connectionString); });
            services.AddTransient<Seed>();
        }
    }
}