using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Dtos.Questions
{
    public record CreateQuestionDto([Required] string Author,  [Required] string Body);
}
