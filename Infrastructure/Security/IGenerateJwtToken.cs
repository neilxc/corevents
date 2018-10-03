using System.Threading.Tasks;
using Domain;

namespace Infrastructure.Security
{
    public interface IGenerateJwtToken
    {
        Task<string> CreateToken(AppUser user);
    }
}