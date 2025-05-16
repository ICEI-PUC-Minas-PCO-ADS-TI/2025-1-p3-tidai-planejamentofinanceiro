using System;

namespace CashWiseAPI.Models
{
    public class MetaFinanceira
    {
        public int IdMeta { get; set; }
        public string NomeMeta { get; set; }
        public double ValorMeta { get; set; }
        public DateTime PrazoMeta { get; set; }
        public string StatusMeta { get; set; }
        public int UsuarioFK { get; set; }
    }
}