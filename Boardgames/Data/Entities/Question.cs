namespace Boardgames.Data.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Body { get; set; }
        public DateTime CreationDateUtc { get; set; }
        public int AdId { get; set; }
        public Ad Ad { get; set; }
    }
}
