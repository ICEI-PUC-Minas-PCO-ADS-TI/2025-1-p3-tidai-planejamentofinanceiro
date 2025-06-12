using CashWiseAPI.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CashWiseAPI.Services
{
    public class MetaFinanceiraService
    {
        private readonly string _connectionString;

        public MetaFinanceiraService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<MetaFinanceira> GetAll()
        {
            var list = new List<MetaFinanceira>();
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM META_FINANCEIRA";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var item = new MetaFinanceira
                {
                    IdMeta = reader.GetInt32("ID_META"),
                    NomeMeta = reader.GetString("NOME_META"),
                    ValorMeta = reader.GetDouble("VALOR_META"),
                    PrazoMeta = reader.GetDateTime("PRAZO_META"),
                    StatusMeta = reader.GetString("STATUS_META"),
                    UsuarioFK = reader.GetInt32("USUARIOFK")
                };
                list.Add(item);
            }
            return list;
        }

        public MetaFinanceira? Get(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM META_FINANCEIRA WHERE ID_META = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new MetaFinanceira
                {
                    IdMeta = reader.GetInt32("ID_META"),
                    NomeMeta = reader.GetString("NOME_META"),
                    ValorMeta = reader.GetDouble("VALOR_META"),
                    PrazoMeta = reader.GetDateTime("PRAZO_META"),
                    StatusMeta = reader.GetString("STATUS_META"),
                    UsuarioFK = reader.GetInt32("USUARIOFK")
                };
            }
            return null;
        }

        public void Update(int id, MetaFinanceira updated)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "UPDATE META_FINANCEIRA SET NOME_META = @NOME_META, VALOR_META = @VALOR_META, PRAZO_META = @PRAZO_META, STATUS_META = @STATUS_META, USUARIOFK = @USUARIOFK WHERE ID_META = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@NOME_META", updated.NomeMeta);
            cmd.Parameters.AddWithValue("@VALOR_META", updated.ValorMeta);
            cmd.Parameters.AddWithValue("@PRAZO_META", updated.PrazoMeta);
            cmd.Parameters.AddWithValue("@STATUS_META", updated.StatusMeta);
            cmd.Parameters.AddWithValue("@USUARIOFK", updated.UsuarioFK);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }

        public MetaFinanceira Add(MetaFinanceira obj)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "INSERT INTO META_FINANCEIRA (NOME_META, VALOR_META, PRAZO_META, STATUS_META, USUARIOFK) VALUES (@NOME_META, @VALOR_META, @PRAZO_META, @STATUS_META, @USUARIOFK)";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@NOME_META", obj.NomeMeta);
            cmd.Parameters.AddWithValue("@VALOR_META", obj.ValorMeta);
            cmd.Parameters.AddWithValue("@PRAZO_META", obj.PrazoMeta);
            cmd.Parameters.AddWithValue("@STATUS_META", obj.StatusMeta);
            cmd.Parameters.AddWithValue("@USUARIOFK", obj.UsuarioFK);
            cmd.ExecuteNonQuery();
            obj.IdMeta = (int)cmd.LastInsertedId;
            return obj;
        }
    }
}