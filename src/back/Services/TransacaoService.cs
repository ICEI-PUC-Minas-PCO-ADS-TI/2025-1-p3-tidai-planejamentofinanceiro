using CashWiseAPI.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CashWiseAPI.Services
{
    public class TransacaoService
    {
        private readonly string _connectionString;

        public TransacaoService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Transacao> GetAll()
        {
            var list = new List<Transacao>();
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM TRANSACAO";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var item = new Transacao
                {
                    IdTransacao = reader.GetInt32("ID_TRANSACAO"),
                    DescricaoCont = reader.GetString("DESCRICAO_CONT"),
                    ValorTrans = reader.GetDouble("VALOR_TRANS"),
                    TipoTrans = reader.GetString("TIPO_TRANS"),
                    DataTrans = reader.GetDateTime("DATA_TRANS"),
                    UsuarioFK = reader.GetInt32("USUARIOFK")
                };
                list.Add(item);
            }
            return list;
        }

        public Transacao? Get(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM TRANSACAO WHERE ID_TRANSACAO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Transacao
                {
                    IdTransacao = reader.GetInt32("ID_TRANSACAO"),
                    DescricaoCont = reader.GetString("DESCRICAO_CONT"),
                    ValorTrans = reader.GetDouble("VALOR_TRANS"),
                    TipoTrans = reader.GetString("TIPO_TRANS"),
                    DataTrans = reader.GetDateTime("DATA_TRANS"),
                    UsuarioFK = reader.GetInt32("USUARIOFK")
                };
            }
            return null;
        }

        public void Update(int id, Transacao updated)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "UPDATE TRANSACAO SET DESCRICAO_CONT = @DESCRICAO_CONT, VALOR_TRANS = @VALOR_TRANS, TIPO_TRANS = @TIPO_TRANS, DATA_TRANS = @DATA_TRANS, USUARIOFK = @USUARIOFK WHERE ID_TRANSACAO = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@DESCRICAO_CONT", updated.DescricaoCont);
            cmd.Parameters.AddWithValue("@VALOR_TRANS", updated.ValorTrans);
            cmd.Parameters.AddWithValue("@TIPO_TRANS", updated.TipoTrans);
            cmd.Parameters.AddWithValue("@DATA_TRANS", updated.DataTrans);
            cmd.Parameters.AddWithValue("@USUARIOFK", updated.UsuarioFK);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }

        public Transacao Add(Transacao obj)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "INSERT INTO TRANSACAO (DESCRICAO_CONT, VALOR_TRANS, TIPO_TRANS, DATA_TRANS, USUARIOFK) VALUES (@DESCRICAO_CONT, @VALOR_TRANS, @TIPO_TRANS, @DATA_TRANS, @USUARIOFK)";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@DESCRICAO_CONT", obj.DescricaoCont);
            cmd.Parameters.AddWithValue("@VALOR_TRANS", obj.ValorTrans);
            cmd.Parameters.AddWithValue("@TIPO_TRANS", obj.TipoTrans);
            cmd.Parameters.AddWithValue("@DATA_TRANS", obj.DataTrans);
            cmd.Parameters.AddWithValue("@USUARIOFK", obj.UsuarioFK);
            cmd.ExecuteNonQuery();
            obj.IdTransacao = (int)cmd.LastInsertedId;
            return obj;
        }
    }
}