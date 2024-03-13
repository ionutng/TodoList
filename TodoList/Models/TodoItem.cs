using System.ComponentModel.DataAnnotations;

namespace TodoList.Models;

public class TodoItem
{
    public int Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string? Name { get; set; }

    [Required]
    public bool IsComplete { get; set; }
}
