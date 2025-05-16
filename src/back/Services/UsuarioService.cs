using CashWiseAPI.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CashWiseAPI.Services
{
    public class UsuarioService
    {
        private readonly string _connectionString;

        public UsuarioService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Usuario> GetAll()
        {
            var list = new List<Usuario>();
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM USUARIO";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var item = new Usuario
                {
                    IdUsuario = reader.GetInt32("ID_USUARIO"),
                    NomeUsuario = reader.GetString("NOME_USUARIO"),
                    EmailUsuario = reader.GetString("EMAIL_USUARIO"),
                    SenhaUsuario = reader.GetString("SENHA_USUARIO"),
                    Endividado = reader.GetBoolean("ENDIVIDADO"),
                    DataCriacao = reader.GetDateTime("DATA_CRIACAO")
                };
                list.Add(item);
            }
            return list;
        }

        public Usuario? Get(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM USUARIO WHERE ID_USUARIO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Usuario
                {
                    IdUsuario = reader.GetInt32("ID_USUARIO"),
                    NomeUsuario = reader.GetString("NOME_USUARIO"),
                    EmailUsuario = reader.GetString("EMAIL_USUARIO"),
                    SenhaUsuario = reader.GetString("SENHA_USUARIO"),
                    Endividado = reader.GetBoolean("ENDIVIDADO"),
                    DataCriacao = reader.GetDateTime("DATA_CRIACAO")
                };
            }
            return null;
        }

        public void Update(int id, Usuario updated)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "UPDATE USUARIO SET NOME_USUARIO = @NOME_USUARIO, EMAIL_USUARIO = @EMAIL_USUARIO, SENHA_USUARIO = @SENHA_USUARIO, ENDIVIDADO = @ENDIVIDADO, DATA_CRIACAO = @DATA_CRIACAO WHERE ID_USUARIO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@NOME_USUARIO", updated.NomeUsuario);
            cmd.Parameters.AddWithValue("@EMAIL_USUARIO", updated.EmailUsuario);
            cmd.Parameters.AddWithValue("@SENHA_USUARIO", updated.SenhaUsuario);
            cmd.Parameters.AddWithValue("@ENDIVIDADO", updated.Endividado);
            cmd.Parameters.AddWithValue("@DATA_CRIACAO", updated.DataCriacao);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }

        public Usuario Add(Usuario obj)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "INSERT INTO USUARIO (NOME_USUARIO, EMAIL_USUARIO, SENHA_USUARIO, ENDIVIDADO, DATA_CRIACAO) VALUES (@NOME_USUARIO, @EMAIL_USUARIO, @SENHA_USUARIO, @ENDIVIDADO, @DATA_CRIACAO)";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@NOME_USUARIO", obj.NomeUsuario);
            cmd.Parameters.AddWithValue("@EMAIL_USUARIO", obj.EmailUsuario);
            cmd.Parameters.AddWithValue("@SENHA_USUARIO", obj.SenhaUsuario);
            cmd.Parameters.AddWithValue("@ENDIVIDADO", obj.Endividado);
            cmd.Parameters.AddWithValue("@DATA_CRIACAO", obj.DataCriacao);
            cmd.ExecuteNonQuery();
            obj.IdUsuario = (int)cmd.LastInsertedId;
            return obj;
        }
    }
}