using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CashWiseAPI.Models
{
    [Table("AUTH")]
    public class Auth
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID_USUARIO")]
        public int IdUsuario { get; set; }

        [Required]
        [Column("NOME_USUARIO")]
        public string NomeUsuario { get; set; } = string.Empty;

        [Required]
        [Column("EMAIL_USUARIO")]
        public string EmailUsuario { get; set; } = string.Empty;

        [Required]
        [Column("SENHA_USUARIO")]
        public string SenhaUsuario { get; set; } = string.Empty;
    }
}
