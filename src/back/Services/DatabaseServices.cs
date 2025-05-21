using Microsoft.EntityFrameworkCore;
using YourProject.Data;
using YourProject.Models;

namespace YourProject.Services
{
    public class DatabaseService
    {
        private readonly ApplicationDbContext _context;

        public DatabaseService(ApplicationDbContext context)
        {
            _context = context;
        }

        // User Services
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.Include(u => u.Transacoes).ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.Include(u => u.Transacoes).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // Transação Services
        public async Task<List<Transacao>> GetAllTransacoesAsync()
        {
            return await _context.Transacoes.Include(t => t.Usuario).ToListAsync();
        }

        public async Task<Transacao?> GetTransacaoByIdAsync(int id)
        {
            return await _context.Transacoes.Include(t => t.Usuario).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Transacao> CreateTransacaoAsync(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            return transacao;
        }

        // Meta Financeira Services
        public async Task<List<MetaFinanceira>> GetAllMetasFinanceirasAsync()
        {
            return await _context.MetasFinanceiras.Include(m => m.Usuario).ToListAsync();
        }

        public async Task<MetaFinanceira?> GetMetaFinanceiraByIdAsync(int id)
        {
            return await _context.MetasFinanceiras.Include(m => m.Usuario).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<MetaFinanceira> CreateMetaFinanceiraAsync(MetaFinanceira meta)
        {
            _context.MetasFinanceiras.Add(meta);
            await _context.SaveChangesAsync();
            return meta;
        }

        // Dashboard Services
        public async Task<Dashboard?> GetDashboardByUserIdAsync(int userId)
        {
            return await _context.Dashboards
                .Include(d => d.Usuario)
                .FirstOrDefaultAsync(d => d.Usuario.Id == userId);
        }

        public async Task<Dashboard> CreateDashboardAsync(Dashboard dashboard)
        {
            _context.Dashboards.Add(dashboard);
            await _context.SaveChangesAsync();
            return dashboard;
        }

        public async Task UpdateDashboardAsync(Dashboard dashboard)
        {
            _context.Entry(dashboard).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}