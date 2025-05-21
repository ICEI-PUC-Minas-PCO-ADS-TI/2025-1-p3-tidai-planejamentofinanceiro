using YourProject.Models;
using MySql.Data.MySqlClient;

namespace YourProject.Services
{
    public class ConteudoService
    {
        private readonly string _connectionString;

        public ConteudoService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                              ?? throw new InvalidOperationException("Connection string not found.");
        }

        public List<Conteudo> GetAll()
        {
            var conteudos = new List<Conteudo>();

            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = "SELECT * FROM CONTEUDO";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                conteudos.Add(new Conteudo
                {
                    Id = reader.GetInt32("ID_CONTEUDO"),
                    Titulo = reader.GetString("TITULO_CONTEUDO"),
                    Descricao = reader.GetString("DESCRICAO_CONTEUDO"),
                    Tipo = reader.GetString("TIPO_CONTEUDO"),
                    Nivel = reader.GetString("NIVEL_CONTEUDO"),
                    DataPublicacao = reader.GetDateTime("DATA_PUBLICACAO"),
                    UsuarioFk = reader.GetInt32("USUARIOFK")
                });
            }

            return conteudos;
        }

        public Conteudo? GetById(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = "SELECT * FROM CONTEUDO WHERE ID_CONTEUDO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);

            using var reader = cmd.ExecuteReader();

            if (reader.Read())
            {
                return new Conteudo
                {
                    Id = reader.GetInt32("ID_CONTEUDO"),
                    Titulo = reader.GetString("TITULO_CONTEUDO"),
                    Descricao = reader.GetString("DESCRICAO_CONTEUDO"),
                    Tipo = reader.GetString("TIPO_CONTEUDO"),
                    Nivel = reader.GetString("NIVEL_CONTEUDO"),
                    DataPublicacao = reader.GetDateTime("DATA_PUBLICACAO"),
                    UsuarioFk = reader.GetInt32("USUARIOFK")
                };
            }

            return null;
        }

        public Conteudo Add(Conteudo conteudo)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = @"INSERT INTO CONTEUDO 
                        (TITULO_CONTEUDO, DESCRICAO_CONTEUDO, TIPO_CONTEUDO, NIVEL_CONTEUDO, USUARIOFK)
                        VALUES (@Titulo, @Descricao, @Tipo, @Nivel, @UsuarioFk)";
            using var cmd = new MySqlCommand(query, connection);

            cmd.Parameters.AddWithValue("@Titulo", conteudo.Titulo);
            cmd.Parameters.AddWithValue("@Descricao", conteudo.Descricao);
            cmd.Parameters.AddWithValue("@Tipo", conteudo.Tipo);
            cmd.Parameters.AddWithValue("@Nivel", conteudo.Nivel);
            cmd.Parameters.AddWithValue("@UsuarioFk", conteudo.UsuarioFk);

            cmd.ExecuteNonQuery();
            conteudo.Id = (int)cmd.LastInsertedId;
            return conteudo;
        }

        public void Update(int id, Conteudo conteudo)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = @"UPDATE CONTEUDO 
                          SET TITULO_CONTEUDO = @Titulo, 
                              DESCRICAO_CONTEUDO = @Descricao,
                              TIPO_CONTEUDO = @Tipo,
                              NIVEL_CONTEUDO = @Nivel
                          WHERE ID_CONTEUDO = @Id";
            using var cmd = new MySqlCommand(query, connection);

            cmd.Parameters.AddWithValue("@Titulo", conteudo.Titulo);
            cmd.Parameters.AddWithValue("@Descricao", conteudo.Descricao);
            cmd.Parameters.AddWithValue("@Tipo", conteudo.Tipo);
            cmd.Parameters.AddWithValue("@Nivel", conteudo.Nivel);
            cmd.Parameters.AddWithValue("@Id", id);

            cmd.ExecuteNonQuery();
        }

        public void Delete(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = "DELETE FROM CONTEUDO WHERE ID_CONTEUDO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);

            cmd.ExecuteNonQuery();
        }
    }
}
