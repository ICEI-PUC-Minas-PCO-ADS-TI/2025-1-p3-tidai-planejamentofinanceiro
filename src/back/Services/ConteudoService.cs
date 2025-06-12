using CashWiseAPI.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CashWiseAPI.Services
{
    public class ConteudoService
    {
        private readonly string _connectionString;

        public ConteudoService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Conteudo> GetAll()
        {
            var list = new List<Conteudo>();
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM CONTEUDO";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var item = new Conteudo
                {
                    IdConteudo = reader.GetInt32("ID_CONTEUDO"),
                    TituloConteudo = reader.GetString("TITULO_CONTEUDO"),
                    DescricaoConteudo = reader.GetString("DESCRICAO_CONTEUDO"),
                    TipoConteudo = reader.GetString("TIPO_CONTEUDO"),
                    NivelConteudo = reader.GetString("NIVEL_CONTEUDO"),
                    DataPublicacao = reader.GetDateTime("DATA_PUBLICACAO"),
                    UsuarioFK = reader.GetInt32("USUARIOFK")
                };
                list.Add(item);
            }
            return list;
        }

        public Conteudo? Get(int id)
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
                    IdConteudo = reader.GetInt32("ID_CONTEUDO"),
                    TituloConteudo = reader.GetString("TITULO_CONTEUDO"),
                    DescricaoConteudo = reader.GetString("DESCRICAO_CONTEUDO"),
                    TipoConteudo = reader.GetString("TIPO_CONTEUDO"),
                    NivelConteudo = reader.GetString("NIVEL_CONTEUDO"),
                    DataPublicacao = reader.GetDateTime("DATA_PUBLICACAO"),
                    UsuarioFK = reader.GetInt32("USUARIOFK")
                };
            }
            return null;
        }

        public void Update(int id, Conteudo updated)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "UPDATE CONTEUDO SET TITULO_CONTEUDO = @TITULO_CONTEUDO, DESCRICAO_CONTEUDO = @DESCRICAO_CONTEUDO, TIPO_CONTEUDO = @TIPO_CONTEUDO, NIVEL_CONTEUDO = @NIVEL_CONTEUDO, DATA_PUBLICACAO = @DATA_PUBLICACAO, USUARIOFK = @USUARIOFK WHERE ID_CONTEUDO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@TITULO_CONTEUDO", updated.TituloConteudo);
            cmd.Parameters.AddWithValue("@DESCRICAO_CONTEUDO", updated.DescricaoConteudo);
            cmd.Parameters.AddWithValue("@TIPO_CONTEUDO", updated.TipoConteudo);
            cmd.Parameters.AddWithValue("@NIVEL_CONTEUDO", updated.NivelConteudo);
            cmd.Parameters.AddWithValue("@DATA_PUBLICACAO", updated.DataPublicacao);
            cmd.Parameters.AddWithValue("@USUARIOFK", updated.UsuarioFK);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }

        public Conteudo Add(Conteudo obj)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "INSERT INTO CONTEUDO (TITULO_CONTEUDO, DESCRICAO_CONTEUDO, TIPO_CONTEUDO, NIVEL_CONTEUDO, DATA_PUBLICACAO, USUARIOFK) VALUES (@TITULO_CONTEUDO, @DESCRICAO_CONTEUDO, @TIPO_CONTEUDO, @NIVEL_CONTEUDO, @DATA_PUBLICACAO, @USUARIOFK)";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@TITULO_CONTEUDO", obj.TituloConteudo);
            cmd.Parameters.AddWithValue("@DESCRICAO_CONTEUDO", obj.DescricaoConteudo);
            cmd.Parameters.AddWithValue("@TIPO_CONTEUDO", obj.TipoConteudo);
            cmd.Parameters.AddWithValue("@NIVEL_CONTEUDO", obj.NivelConteudo);
            cmd.Parameters.AddWithValue("@DATA_PUBLICACAO", obj.DataPublicacao);
            cmd.Parameters.AddWithValue("@USUARIOFK", obj.UsuarioFK);
            cmd.ExecuteNonQuery();
            obj.IdConteudo = (int)cmd.LastInsertedId;
            return obj;
        }
    }
}