using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Persistence
{
    public class TemporaryDbContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseSqlite("Data Source=corevents.db", optionsBuilder =>
                optionsBuilder.MigrationsAssembly(typeof(DataContext).GetTypeInfo().Assembly.GetName().Name));
            return new DataContext(builder.Options);
        }
    }
}