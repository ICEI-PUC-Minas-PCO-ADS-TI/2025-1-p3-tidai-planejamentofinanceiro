using System;

namespace CashWiseAPI.Models
{
    public class Conteudo
    {
        public int IdConteudo { get; set; }
        public string TituloConteudo { get; set; }
        public string DescricaoConteudo { get; set; }
        public string TipoConteudo { get; set; }
        public string NivelConteudo { get; set; }
        public DateTime DataPublicacao { get; set; }
        public int UsuarioFK { get; set; }
    }
}