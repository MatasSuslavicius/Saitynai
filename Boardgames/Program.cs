using Boardgames.Data;
using Boardgames.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<BoardgameContext>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddTransient<IGameRepository, GameRepository>();
builder.Services.AddTransient<IAdsRepository, AdsRepository>();
builder.Services.AddTransient<IQuestionsRepository, QuestionsRepository>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
