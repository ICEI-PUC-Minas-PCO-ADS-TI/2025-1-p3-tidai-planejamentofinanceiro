using CashWiseAPI.Models;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CashWiseAPI.Services
{
    public class DashboardService
    {
        private readonly string _connectionString;

        public DashboardService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Dashboard> GetAll()
        {
            var list = new List<Dashboard>();
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM DASHBOARD";
            using var cmd = new MySqlCommand(query, connection);
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var item = new Dashboard
                {
                    IdDash = reader.GetInt32("ID_DASH"),
                    UsuarioFK = reader.GetInt32("USUARIOFK"),
                    SaldoTotalDash = reader.GetDouble("SALDOTOTAL_DASH"),
                    GastosMensaisDash = reader.GetDouble("GASTOSMENSAIS_DASH"),
                    InvestimentoTotaisDash = reader.GetDouble("INVESTIMENTOTOTAIS_DASH")
                };
                list.Add(item);
            }
            return list;
        }

        public Dashboard? Get(int id)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "SELECT * FROM DASHBOARD WHERE ID_DASH = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@Id", id);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Dashboard
                {
                    IdDash = reader.GetInt32("ID_DASH"),
                    UsuarioFK = reader.GetInt32("USUARIOFK"),
                    SaldoTotalDash = reader.GetDouble("SALDOTOTAL_DASH"),
                    GastosMensaisDash = reader.GetDouble("GASTOSMENSAIS_DASH"),
                    InvestimentoTotaisDash = reader.GetDouble("INVESTIMENTOTOTAIS_DASH")
                };
            }
            return null;
        }

        public void Update(int id, Dashboard updated)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "UPDATE DASHBOARD SET USUARIOFK = @USUARIOFK, SALDOTOTAL_DASH = @SALDOTOTAL_DASH, GASTOSMENSAIS_DASH = @GASTOSMENSAIS_DASH, INVESTIMENTOTOTAIS_DASH = @INVESTIMENTOTOTAIS_DASH WHERE ID_DASH = @Id";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@USUARIOFK", updated.UsuarioFK);
            cmd.Parameters.AddWithValue("@SALDOTOTAL_DASH", updated.SaldoTotalDash);
            cmd.Parameters.AddWithValue("@GASTOSMENSAIS_DASH", updated.GastosMensaisDash);
            cmd.Parameters.AddWithValue("@INVESTIMENTOTOTAIS_DASH", updated.InvestimentoTotaisDash);
            cmd.Parameters.AddWithValue("@Id", id);
            cmd.ExecuteNonQuery();
        }

        public Dashboard Add(Dashboard obj)
        {
            using var connection = new MySqlConnection(_connectionString);
            connection.Open();
            var query = "INSERT INTO DASHBOARD (USUARIOFK, SALDOTOTAL_DASH, GASTOSMENSAIS_DASH, INVESTIMENTOTOTAIS_DASH) VALUES (@USUARIOFK, @SALDOTOTAL_DASH, @GASTOSMENSAIS_DASH, @INVESTIMENTOTOTAIS_DASH)";
            using var cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@USUARIOFK", obj.UsuarioFK);
            cmd.Parameters.AddWithValue("@SALDOTOTAL_DASH", obj.SaldoTotalDash);
            cmd.Parameters.AddWithValue("@GASTOSMENSAIS_DASH", obj.GastosMensaisDash);
            cmd.Parameters.AddWithValue("@INVESTIMENTOTOTAIS_DASH", obj.InvestimentoTotaisDash);
            cmd.ExecuteNonQuery();
            obj.IdDash = (int)cmd.LastInsertedId;
            return obj;
        }
    }
}