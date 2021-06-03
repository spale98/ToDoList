using System;

namespace Todo.Api.Models
{
    public class Task
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        public Task()
        {
            Id = new Guid();
        }
    }
}