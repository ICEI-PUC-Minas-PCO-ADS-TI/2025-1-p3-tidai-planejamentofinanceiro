namespace CashWiseAPI.Models
{
    public class Dashboard
    {
        public int IdDash { get; set; }
        public int UsuarioFK { get; set; }
        public double SaldoTotalDash { get; set; }
        public double GastosMensaisDash { get; set; }
        public double InvestimentoTotaisDash { get; set; }
    }
}