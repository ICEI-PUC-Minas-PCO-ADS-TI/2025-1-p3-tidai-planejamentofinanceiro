using System.Collections.Generic;
using System.Threading.Tasks;
using CashWiseAPI.Models;

namespace CashWiseAPI.Interfaces
{
    public interface IConteudoService
    {
        Task<IEnumerable<Conteudo>> GetAllAsync();
        Task<Conteudo> GetByIdAsync(int id);
        Task<Conteudo> CreateAsync(Conteudo item);
        Task<Conteudo> UpdateAsync(int id, Conteudo item);
        Task<bool> DeleteAsync(int id);
    }
}