using System.Collections.Generic;
using System.Threading.Tasks;
using CashWiseAPI.Models;

namespace CashWiseAPI.Interfaces
{
    public interface IDashboardService
    {
        Task<IEnumerable<Dashboard>> GetAllAsync();
        Task<Dashboard> GetByIdAsync(int id);
        Task<Dashboard> CreateAsync(Dashboard item);
        Task<Dashboard> UpdateAsync(int id, Dashboard item);
        Task<bool> DeleteAsync(int id);
    }
}