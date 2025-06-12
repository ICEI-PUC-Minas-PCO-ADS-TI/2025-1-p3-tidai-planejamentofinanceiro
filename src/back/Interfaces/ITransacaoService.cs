using System.Collections.Generic;
using System.Threading.Tasks;
using CashWiseAPI.Models;

namespace CashWiseAPI.Interfaces
{
    public interface ITransacaoService
    {
        Task<IEnumerable<Transacao>> GetAllAsync();
        Task<Transacao> GetByIdAsync(int id);
        Task<Transacao> CreateAsync(Transacao item);
        Task<Transacao> UpdateAsync(int id, Transacao item);
        Task<bool> DeleteAsync(int id);
    }
}