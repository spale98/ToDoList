using Microsoft.EntityFrameworkCore;
using Todo.Api.Models;

namespace Todo.Api.Data
{
    public class TodoDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }

        public TodoDbContext(DbContextOptions options) : base(options) 
        {
        }
    }
}