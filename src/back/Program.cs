using CashWiseAPI.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurações de Kestrel via appsettings.json
builder.WebHost.ConfigureKestrel((context, options) =>
{
    options.Configure(context.Configuration.GetSection("Kestrel"));
});

// Serviços básicos
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "CashWise API",
        Version = "v1"
    });
});

// Injeção de dependência dos serviços (sem interface)
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<ConteudoService>();
builder.Services.AddScoped<MetaFinanceiraService>();
builder.Services.AddScoped<TransacaoService>();
builder.Services.AddScoped<DashboardService>();

// CORS (opcional)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Adiciona a porta manualmente (caso queira fixar em código)
app.Urls.Add("http://0.0.0.0:5284");

// Middleware
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CashWise API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
