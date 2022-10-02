namespace Boardgames.Data.Entities
{
    public class Ad
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Phone { get; set; }
        public DateTime CreationDateUtc { get; set; }
        public int GameId { get; set; }
        public Game Game { get; set; }
    }
}
