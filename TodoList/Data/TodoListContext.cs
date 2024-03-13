using Microsoft.EntityFrameworkCore;
using TodoList.Models;

namespace TodoList.Data
{
    public class TodoListContext(DbContextOptions<TodoListContext> options) : DbContext(options)
    {
        public DbSet<TodoItem> TodoItem { get; set; } = default!;
    }
}
