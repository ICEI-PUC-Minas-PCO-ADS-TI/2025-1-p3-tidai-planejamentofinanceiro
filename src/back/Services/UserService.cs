using YourProject.Models;
using MySql.Data.MySqlClient;

namespace YourProject.Services
{
    public class UserService
    {
        private readonly string _connectionString;

        public UserService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                              ?? throw new InvalidOperationException("Connection string not found.");
        }

        public List<User> GetAll()
        {
            var users = new List<User>();
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = "SELECT * FROM Users";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                users.Add(new User
                {
                    Id = reader.GetInt32("id"),
                    Nome = reader.GetString("nome"),
                    Email = reader.GetString("email"),
                    Senha = reader.GetString("senha"),
                    Endividado = reader.GetBoolean("endividado")
                });
            }

            return users;
        }

        public User Get(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = "SELECT * FROM Users WHERE id = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);

            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    Id = reader.GetInt32("id"),
                    Nome = reader.GetString("nome"),
                    Email = reader.GetString("email"),
                    Senha = reader.GetString("senha"),
                    Endividado = reader.GetBoolean("endividado")
                };
            }
            return null;
        }

        public User Add(User user)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = @"INSERT INTO Users (nome, email, senha, endividado) 
                         VALUES (@Nome, @Email, @Senha, @Endividado)";
            using var cmd = new MySqlCommand(query, connection);

            cmd.Parameters.AddWithValue("@Nome", user.Nome);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Senha", user.Senha);
            cmd.Parameters.AddWithValue("@Endividado", user.Endividado);

            cmd.ExecuteNonQuery();
            user.Id = (int)cmd.LastInsertedId;
            return user;
        }

        public void Update(int id, User user)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = @"UPDATE Users 
                         SET nome = @Nome, 
                             email = @Email, 
                             senha = @Senha, 
                             endividado = @Endividado 
                         WHERE id = @Id";
            using var cmd = new MySqlCommand(query, connection);

            cmd.Parameters.AddWithValue("@Nome", user.Nome);
            cmd.Parameters.AddWithValue("@Email", user.Email);
            cmd.Parameters.AddWithValue("@Senha", user.Senha);
            cmd.Parameters.AddWithValue("@Endividado", user.Endividado);
            cmd.Parameters.AddWithValue("@Id", id);

            cmd.ExecuteNonQuery();
        }

        public bool Delete(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();

            var query = "DELETE FROM Users WHERE id = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);

            return cmd.ExecuteNonQuery() > 0;
        }
    }
}