using System.Collections.Generic;
using System.Threading.Tasks;
using CashWiseAPI.Models;

namespace CashWiseAPI.Interfaces
{
    public interface IMetaFinanceiraService
    {
        Task<IEnumerable<MetaFinanceira>> GetAllAsync();
        Task<MetaFinanceira> GetByIdAsync(int id);
        Task<MetaFinanceira> CreateAsync(MetaFinanceira item);
        Task<MetaFinanceira> UpdateAsync(int id, MetaFinanceira item);
        Task<bool> DeleteAsync(int id);
    }
}