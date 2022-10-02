using System.ComponentModel.DataAnnotations;

namespace Boardgames.Data.Dtos.Questions
{
    public record UpdateQuestionDto([Required] string Author, [Required] string Body);

}
