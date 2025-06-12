using System;

namespace CashWiseAPI.Models
{
    public class Transacao
    {
        public int IdTransacao { get; set; }
        public string DescricaoCont { get; set; }
        public double ValorTrans { get; set; }
        public string TipoTrans { get; set; }
        public DateTime DataTrans { get; set; }
        public int UsuarioFK { get; set; }
    }
}